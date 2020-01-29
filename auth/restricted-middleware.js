const bycrpt = require('bcryptjs');

const Users = require('../users/usersModel');

module.exports = (req, res, next) => {
    console.log(req.session)
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.status(401).json({you: "cannot log in"})
    }
} 