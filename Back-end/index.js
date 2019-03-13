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
let auth = require('./routes/auth');

app.route('/bookings')
    .post(booking.post);

app.route('/artworks')
    .post(artwork.post)
    .get(artwork.get);

app.route('/auth')
    .post(auth.post)

app.use('/users', users);

app.use((req, res, next) => {
    
    console.log(req.headers);

    if(auth.verifyToken(req.headers.authorization)){
        next()
    } else {
        res.status(403).send('Access denied')
    }
})

