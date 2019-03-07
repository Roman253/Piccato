/* Models */ 
let Ticket = require('../models/ticket');

/* Verify the ticket #code */
module.exports.get = async(req, res) => {
    try {
        // Verify code
        let resp = await Ticket.find({
            code: req.params.code
        })
        if (resp.length == 1 && !resp[0].used) {
            // Ticket is Valid
            res.status(200).send({ msg: 'Ticket is Valid, sir!', verified: true })
            await Ticket.findOneAndUpdate({ code: req.params.code }, {
                used: true
            })
        } else {
            // Ticket is NOT Valid
            res.status(200).send({ msg: 'Ticket aint Valid, bro!', verified: false })
        }
    } catch (err) {
        res.status(500).send(err);
    }
};