/* Tickets route for where is's @ app */

//Models
let Ticket = require('../models/ticket');
let Event = require('../models/event');

module.exports.post = async(req, res) => {
    console.log(req.body);

    try {
        // Get event
        let event = await Event.findById(req.body.event);
        let tickets = [];

        // Loops through the amount customer wants.   
        for (i = 0; i < req.body.amount; i++) {
            let ticket = {
                event: event,
                code: uid(6),
                used: false
            }
            tickets.push(ticket);
        }

        // Posts it into the MongoDB
        let resp = await Ticket.create(tickets);
        res.status(200).send(resp);
    } catch (err) {
        res.status(500).send(err.stack);
    }
};

//GET
module.exports.get = async(req, res) => {

    try {
        let tickets = await Ticket.find({});
        res.status(200).send(tickets);

    } catch (err) {
        res.status(500).send(err);
    }
};

// Unique Ticket ID generator
function uid(len) {
    let chars = "ABCDEFGHIJKLMNOPQRSTVWXYZ0123456789";
    let code = [];

    for (let i = 0; i < len; i++) {
        let rand = Math.floor(Math.random() * chars.length);
        code.push(chars[rand]);
    }
    return code.join("");
};