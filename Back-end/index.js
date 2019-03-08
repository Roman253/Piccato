// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());


// Connect to our DB 
mongoose.connect(`mongodb+srv://Admin1:${process.env.PASSWORD}@cluster0-y175r.mongodb.net/konstlagret?retryWrites=true`, { useNewUrlParser: true })
    .then(() => {
        console.info('Connected to database.')
    })
    .catch(err => {
        console.error(err.stack)
    });


app.listen(3000, () => {
    console.info('Server is running: 3000.')
});

//Routes 
let users = require('./routes/users');
app.use('/users', users);
