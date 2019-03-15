/* Booking route */

//Models
let Booking = require('../models/booking');
let Artwork = require('../models/artwork');

module.exports.post = async (req, res) => {
    console.log(req.body);

    try {
        // Get artework
        let artwork = await Artwork.findById(req.body.artwork);
        let booking = [];

        let bookings = {
            artwork: artwork

        }
        booking.push(booking);

        // Posts it into the MongoDB
        let resp = await Booking.create(bookings);
        res.status(200).send(resp);
    } catch (err) {
        res.status(500).send(err.stack);
    }
};

//GET
module.exports.get = async (req, res) => {

    try {
        let bookings = await Booking.find({});
        res.status(200).send(bookings);

    } catch (err) {
        res.status(500).send(err);
    }
};