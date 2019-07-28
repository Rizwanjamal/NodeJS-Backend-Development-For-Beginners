const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

const User = db.User;

const login = async(req, res, next) => {
    const payload = req.body;   
    const user = await User.findOne({ email: payload.email });
    if (!user) return next(`No User Exist`);
    if (!bcrypt.compareSync(payload.password, user.hash)) return next(`Email or Password is wrong !`);
    const { hash, ...userWithoutHash } = user.toObject();
    console.log('hash :', hash);
    console.log('userWithoutHash :', userWithoutHash);
    const token = jwt.sign({ sub: user.id }, config.secret);
    res.json({
        ...userWithoutHash,
        token
    });
}

const getUsers = async (req, res, next) => {
    const users = await User.find().select('-hash');
    res.json(users)
}

const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-hash');
    if (!user) return next('No User Found !')
    res.json(user) 
}

const createUser = async (req, res, next) => {
    let payload = req.body;
    let userData;
    if (payload.password !== payload.confirmPassword) {
        return next('confirm Password dont match');
    }
    userData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        hash: bcrypt.hashSync(payload.password, 10)
    }
    return User.create(userData, (err, data) => {
        if (err) return next(err);
        res.json(data)
    })
}

module.exports = {
    login,
    getUsers,
    getUser,
    createUser
};