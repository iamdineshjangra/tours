const db = require("../models/index");

exports.getTours = async () => {
    return await db.Tour.findAll();
}

exports.getTour = async (tourId) => {
    return await db.Tour.findByPk(tourId);
}

exports.createTour = async(tourData) => {
    return await db.Tour.create(tourData);
}