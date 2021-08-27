const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const shiftsControllers = require('../controllers/shifts-controllers');
const checkAuth = require('../middleware/check-auth');

router.get('/', shiftsControllers.getAllShifts);
router.get('/:sid', shiftsControllers.getShiftById);
router.get('/:uid', shiftsControllers.getShiftsByUserId);

router.use(checkAuth);

router.post('/',
    [
        check('date')
            .not()
            .isEmpty(),
        check('job').isLength({min: 5}),
        check('time')
            .not()
            .isEmpty(),
        check('done')
            .not()
            .isEmpty(),
        check('worker')
            .not()
            .isEmpty()
    ],
    shiftsControllers.createShift
);

router.patch('/:sid',
    [
        check('date')
            .not()
            .isEmpty(),
        check('job').isLength({min: 5}),
        check('time')
            .not()
            .isEmpty()
    ],
    shiftsControllers.updateShiftById
);

router.delete('/:sid', shiftsControllers.deleteShiftById);

module.exports = router;