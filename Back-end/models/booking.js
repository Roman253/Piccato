let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create schema
let bookingSchema = new Schema({
    artworkID: String,
    userUID: String,
    selectedDate: Object
});

// A model based on the schema
let Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;