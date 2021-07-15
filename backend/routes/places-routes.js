const express = require('express');
const router = express.Router();

const placesControllers = require('../controllers/places-controllers');

router.get('/:pid', placesControllers.getPlaceById);
router.get('/user/:ptt', placesControllers.getPlaceByTitle);
router.post('/', placesControllers.createPlace);

module.exports = router;