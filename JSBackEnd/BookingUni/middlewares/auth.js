const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS, TOKEN_SECRET, COOKIE_NAME } = require('../config');
const { createUser, getUserByUsername, getUserByEmail } = require('../services/userService');

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register(username,email, password) {
                const token = await register(username,email, password);
                res.cookie(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(COOKIE_NAME, token);
            },
            logout() {
                res.clearCookie(COOKIE_NAME);
            }
        }
        next();
    }
}

async function register(username,email, password) {
    const existingUsername = await getUserByUsername(username);
    const existingEmail = await getUserByEmail(email);

    if (existingUsername) {
        throw new Error('Username has already been used!');
    }
    if (existingEmail) {
        throw new Error('Email has already been used!');
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser(username,email, hashedPassword);
    return generateToken(user);
}

async function login(username, password) {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error('No such user!');
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Invalid password!');
    }
    return generateToken(user);
}


function generateToken(user) {
    return jwt.sign({
        _id: user._id,
        username: user.username,
        email:user.email,
    }, TOKEN_SECRET);
}

function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if(token){
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user=userData;
        } catch (error) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }
    }
    return true;
}
