let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* How our DB should collect data and also needed in our vue/admin site so we send the correct data */
let artworkSchema = new Schema({
    title: String,
    artist: String, 
    description: String,
    price: Number,
    when: {
        date: String,
        start: String,
        end: String,
    },
    where: {
        location: String,
        adress: String,
    },
    spot: String,
});

let Artwork = mongoose.model('artwork', artworkSchema);

module.exports = Artwork;