// const {v4 : uuidv4} = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Shift = require('../models/Shift');
const User = require('../models/user');

let DUMMY_SHIFTS = [
    {
        id: 's1',
        date: '15-08-2021',
        job: 'front-desk',
        time: {
            start_time: '08:30',
            end_time: '15:00'
        },
        done: true,
        worker: 'u1'
    }
];

const getAllShifts = (req, res, next) => {
    res.json({ users: DUMMY_SHIFTS });
};

const getShiftById = async (req, res, next) => {
    const shiftId = req.params.sid;

    let shift;
    try {
        shift = await shift.findById(shiftId);
    } catch (err) {
        const error = new HttpError('Shift not found, fetching failed!', 500);
      return next(error);
    }

    if (!shift) {
        throw new HttpError('Shift not found!', 404);
    }
    res.json({ shift: shift.toObject({ getters: true }) }); // => { shift } => { shift: shift }
};

const getShiftsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithShifts;
    try {
        userWithShifts = await User.findById(userId).populate('shifts');
    } catch (err) {
        const error = new HttpError('Shift(s) not found, fetching failed!', 500);
      return next(error);
    }

    if (!userWithShifts || userWithShifts.shifts.length === 0) {
        return next(new HttpError('Shift(s) not found!', 404));
    }
    res.json({
        shifts: userWithShifts.shifts.map(shift =>
          shift.toObject({ getters: true })
        )
    });
};

const createShift = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return next(
            new HttpError('Invalid inputs, please check again!', 422)
      );
    }

    const { date, job, time, done, worker } = req.body;

    // const title = req.body.title;
    const newShift = new Shift({
        // id: uuidv4(),
        date,
        job,
        time,
        done,
        worker
    });

    let user;
    try {
        user = await User.findById(worker);
    } catch (err) {
        const error = new HttpError('Creating shift failed, please try again', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newShift.save({ session: sess });
        user.shifts.push(newShift);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        console.log(err);
        const error = new HttpError('Creating shift failed!', 500);
        return next(error);
    }

    res.status(201).json({shift: newShift});
};

const updateShiftById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs, please check again!', 422)
        );
    }
    const shiftId = req.params.sid;
    const { date, job, time, done, worker } = req.body;

    let shift;
    try {
        shift = await shift.findById(shiftId);
    } catch (err) {
        const error = new HttpError('Could not update shift!', 500);
      return next(error);
    }

    shift.date = date;
    shift.job = job;
    shift.time = time;
    shift.done = done;
    shift.worker = worker;

    try {
        await shift.save();
    } catch (err) {
        const error = new HttpError('Could not update shift!', 500);
        return next(error);
    }

    res.status(200).json({ shift: shift.toObject({ getters: true }) });
};

const deleteShiftById = async (req, res, next) => {
    const shiftId = req.params.sid;

    let shift;
    try {
        shift = await shift.findById(shiftId).populate('worker');
    } catch (err) {
        const error = new HttpError('Could not delete shift!', 500);
      return next(error);
    }
  
    if (!shift) {
        const error = new HttpError('Shift not found!', 404);
        return next(error);
    }
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await shift.remove({ session: sess });
        shift.worker.shifts.pull(shift);
        await shift.worker.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Could not delete shift!', 500);
        return next(error);
    }

    res.status(200).json({message: 'Shift deleted!'});
};

exports.getAllShifts = getAllShifts;
exports.getShiftById = getShiftById;
exports.getShiftsByUserId = getShiftsByUserId;
exports.createShift = createShift;
exports.updateShiftById = updateShiftById;
exports.deleteShiftById = deleteShiftById;
