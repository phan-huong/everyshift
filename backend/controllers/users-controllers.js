// const {v4 : uuidv4} = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

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

// Get all employees
const getAllEmployees = async (req, res, next) => {
    // Find manager by ID
    let manager_id = req.headers.manager_id;
    // console.log(manager_id)
    let manager;
    if (manager_id && manager_id !== '') {
        try {
            manager = await User.findOne({ _id: manager_id, role: 'manager' });
        } catch (err) {
            const error = new HttpError('Could not find manager!', 500);
            return next(error);
        }

        let employees;
        if (manager) {
            try {
                employees = await User.find({ role: 'employee'}, '-password');
            } catch (err) {
                const error = new HttpError('Fetching users failed!', 500);
                return next(error);
            }
            res.json({ users: employees.map(user => user.toObject({ getters: true })) });
        } else {
            res.json({ users: [] })
        }
    } else {
        res.json({ users: [] })
    }
    
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

// Update user by ID
const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs, please check again!', 422)
        );
    }
    const user_id = req.params.id;
    const { firstName, lastName, email, password, role, dateOfBirth, gender, phone, streetHouseNr, city, postalCode, state, country, salary, entryDate } = req.body;
    console.log(req.body);

    // Find user by ID
    let edited_user;
    try {
        edited_user = await User.findById(user_id);
    } catch (err) {
        const error = new HttpError('Could not update user!', 500);
      return next(error);
    }

    // Check if email is unique
    if (email && email !== '' && email !== edited_user.email) {
        let existingUserByEmail;
        try {
            existingUserByEmail = await User.findOne({ email: email })
        } catch (err) {
            const error = new HttpError('Could not find email!', 500);
            return next(error);
        }
        
        if (existingUserByEmail) {
            const error = new HttpError('Email already exists!', 422);
            return next(error);
        }

        edited_user.email = email;
    }

    // Convert to hashed password
    if (password && password !== '') {
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
            const error = new HttpError('Could not update password!', 500);
            return next(error);
        }
        edited_user.password = hashedPassword;
    }

    edited_user.firstName = firstName;
    edited_user.lastName = lastName;
    edited_user.role = role ? role : edited_user.role;
    edited_user.dateOfBirth = dateOfBirth;
    edited_user.gender = gender;
    edited_user.phone = phone;
    edited_user.streetHouseNr = streetHouseNr;
    edited_user.city = city;
    edited_user.postalCode = postalCode;
    edited_user.state = state;
    edited_user.country = country;
    edited_user.salary = salary;
    edited_user.entryDate = entryDate;

    try {
        await edited_user.save();
    } catch (err) {
        const error = new HttpError('Could not update user!', 500);
        return next(error);
    }

    res.status(200).json({ edited_user: edited_user.toObject({ getters: true }) });
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
        const error = new HttpError('Username/Email not found, login failed!', 401);
        return next(error);
    }
    
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Cannot verify password, login failed!', 500);
        return next(error);
    }
    
    if (!isValidPassword) {
        const error = new HttpError('Password is wrong, login failed!', 403);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        'supersecret_dont_share',
        { expiresIn: '90d' }
    );
    } catch (err) {
        const error = new HttpError('Logging in failed!', 500);
        return next(error);
    }

    res.json({   
        message: 'Logged in!',
        token: token,
        userData: existingUser
    });
};

exports.getAllUsers = getAllUsers;
exports.getAllEmployees = getAllEmployees;
exports.getUserByID = getUserByID;
exports.updateUser = updateUser;
exports.signup = signup;
exports.login = login;