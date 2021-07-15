const {v4 : uuidv4} = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Hanoi',
        country: 'Vietnam',
        description: 'the capital',
        specialties: {
            food: 'pho',
            drinks: 'tra da'
        },
        year: '1010'
    }
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    if (!place) {
        throw new HttpError('Place not found!', 404);
    }
    res.json({place});
};

const getPlaceByTitle = (req, res, next) => {
    const placeTitle = req.params.ptt;
    const place = DUMMY_PLACES.find(p => {
        return p.title === placeTitle;
    });
    if (!place) {
        return next(new HttpError('Place not found!', 404));
    }
    res.json({place});
};

const createPlace = (req, res, next) => {
    const { title, country, description, specialties, year }= req.body;
    // const title = req.body.title;
    const newPlace = {
        id: uuidv4(),
        title,
        country,
        description,
        dishes: specialties,
        year
    };
    DUMMY_PLACES.push(newPlace); 

    res.status(201).json({place: newPlace});
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByTitle = getPlaceByTitle;
exports.createPlace = createPlace;