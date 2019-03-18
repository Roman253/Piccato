let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create schema
let bookingSchema = new Schema({
    artwork: Object,
    userID: String,
    selectedDate: {
        start: String,
        end: String
    }
});

// A model based on the schema
let Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;