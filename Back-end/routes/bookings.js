/* Booking route */

//Models
let Booking = require('../models/booking');
let Artwork = require('../models/artwork');

module.exports.post = async(req, res) => {

    console.log(req.body);

    try {
        // Posts it into the MongoDB
        let resp = await Booking.create({
            artworkID: req.body.artworkID,
            userUID: req.body.userUID,
            selectedDate: req.body.selectedDate
        });

        res.status(200).send(resp);

    } catch (err) {

        console.error(err);
        res.status(500).send(err.stack);
    }
};

//GET
module.exports.get = async(req, res) => {

    try {
        let bookings = await Booking.find({});
        res.status(200).send(bookings);
        console.log(bookings);
        }
     catch (err) {
        res.status(500).send(err);
    }
};