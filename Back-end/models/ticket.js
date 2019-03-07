let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create schema
let ticketSchema = new Schema({
    event: Object,
    code: String,
    used: { type: Boolean, default: false }
});

// A model based on the schema
let Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;