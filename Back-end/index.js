// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expressValidator = require('express-validator');
const jsonwebtoken = require('jsonwebtoken');


// Connect to our DB 
mongoose.connect(`mongodb+srv://Admin1:${process.env.PASSWORD}@cluster0-y175r.mongodb.net/konstlagret?retryWrites=true`, { useNewUrlParser: true })
    .then(() => {
        console.info('Connected to database.')
    })
    .catch(err => {
        console.error(err.stack)
    });


//Initialize App dependencies
let app = express();
app.use(express.json());
app.use(cors());
app.use(expressValidator());

app.listen(3000, () => {
    console.info('Server is running: using port 3000.')
});


// Routes
let booking = require('./routes/bookings');
let artwork = require('./routes/artworks');
let users = require('./routes/users');

app.route('/bookings')
    .post(booking.post);

app.route('/artworks')
    .post(artwork.post)
    .get(artwork.get);

app.use('/users', users);

