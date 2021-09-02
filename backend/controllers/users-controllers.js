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

// Get all users
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed!', 500);
      return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
};

// Get user by ID
const getUserByID = async (req, res, next) => {
    let user_id = req.params.id;

    let user;
    try {
        user = await User.findById(user_id);
    } catch (err) {
        console.log(err);
        const error = new HttpError('Fetching user failed!', 500);
        return next(error);
    }

    if (!user) {
        console.log('No user found!');
        throw new HttpError('User not found!', 404);
    }

    res.json({user_data: user.toObject({ getters: true })});
};

// Create a user
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs, please check again!', 422)
        );
    }

    const { firstName, lastName, email, password, role, dateOfBirth, gender, phone, streetHouseNr, postalCode, city, state, country, salary, entryDate} = req.body;

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
        firstName, 
        lastName, 
        email,
        role, 
        dateOfBirth, 
        gender, 
        phone, 
        streetHouseNr, postalCode, city, state, country, 
        salary, 
        entryDate,
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

// User login
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

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.signup = signup;
exports.login = login;