// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

// Connect to our DB process.env.
mongoose.connect(`mongodb+srv://Admin1:${process.env.PASSWORD}@cluster0-y175r.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })
    .then(() => {
        console.info('Connected.')
    })
    .catch(err => {
        console.error(err)
    });

// Routes
let tickets = require('./routes/tickets');
let artwork = require('./routes/artworks');
let verify = require('./routes/verify');

app.route('/tickets')
    .post(tickets.post);

app.route('/artworks')
    .post(artwork.post)
    .get(artwork.get);

app.route('/verify/:code')
    .get(verify.get)

app.listen(3000, () => {
    console.info('Server is running: 3000.')
});