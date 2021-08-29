const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { COOKIE_NAME, TOKEN_SECRET, SALT_ROUNDS } = require('../config/common');
const userService = require('../services/user');

module.exports = () => (req, res, next) => {
    req.auth = {
        register,
        login
    };

    if(readToken(req)){
        next();
    }

    async function register({ username, password, repeatPassword }) {
        if (username == '' || password == '' || repeatPassword == '') {
            throw new Error('All fields are required!');
        }
        if (password != repeatPassword) {
            throw new Error('Passwords do not match!');
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await userService.createUser(username, hashedPassword);
        req.user = createToken(user);
    }

    async function login({ username, password }) {
        const user = await userService.getUserByUsername(username);
        if (!user) {
            throw new Error('Wrong username or password!');
        }
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
            throw new Error('Wrong username or password!');
        }
        req.user = createToken(user);
    }

    function createToken(user) {
        const userViewModel = { _id: user._id, username: user.username };
        const token = jwt.sign(userViewModel, TOKEN_SECRET);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return userViewModel;
    }

    function readToken(req) {
        const token = req.cookies[COOKIE_NAME];
        if (token) {
            try {
                const userData = jwt.verify(token, TOKEN_SECRET);
                req.user=userData;
                return true;
            } catch (error) {
                res.clearCookie(COOKIE_NAME);
                res.redirect('/auth/login');
                return false;
            }
        }
        return true;
    }
}

