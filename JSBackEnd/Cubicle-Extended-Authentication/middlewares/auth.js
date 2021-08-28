const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = require('../services/user');

module.exports = () => (req, res, next) => {
    req.auth = {
        register: userService.createUser,
        login
    }
    next();

    async function login({ username, password }) {
        const user = await userService.getUserByUsername(username);
        if (!user) {
            throw new Error('Wrong username or password!');
        }
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
            throw new Error('Wrong username or password!');
        }
        const userViewModel = { _id: user._id, username: user.username };
        const token = jwt.sign(userViewModel,'secret message');
        res.cookie('SESSION_DATA', token, { httpOnly: true });
        req.user = userViewModel;
    }
}

