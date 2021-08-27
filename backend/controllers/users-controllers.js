// const {v4 : uuidv4} = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
    {
    id: 'u1',
    name: 'Chicki Boom Boom',
    email: 'eggsi@gmail.com',
    password: 'iceicebaby'
    }
];

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed!', 500);
      return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs, please check again!', 422)
        );
    }

    const { name, email, password } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Signing up failed!', 500);
      return next(error);
    }
    
    if (existingUser) {
        const error = new HttpError('User already exists, please login!', 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user!', 500);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://image.flaticon.com/icons/png/512/860/860784.png',
        password: hashedPassword,
        shifts: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed!', 500);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError('Signing up failed!', 500);
        return next(error);
    }

    res
        .status(201)
        .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError( 'Login failed!', 500);
        return next(error);
    }
  
    if (!existingUser) {
        const error = new HttpError('Invalid credentials, login failed!', 401);
        return next(error);
    }
    
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Invalid credentials, login failed!', 500);
        return next(error);
    }
    
    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials, login failed!', 403);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        'supersecret_dont_share',
        { expiresIn: '1h' }
    );
    } catch (err) {
        const error = new HttpError('Logging in failed!', 500);
        return next(error);
    }

    res.json({
        message: 'Logged in!',
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;