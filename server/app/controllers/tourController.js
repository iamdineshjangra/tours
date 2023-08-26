const db = require('../models')
exports.createTour = async (req, res) => {
   const tour = req.body;
   const newTour = await db.tours.create(tour);
   res.status(201).json({
    status:'success',
    tour : newTour
   })
}