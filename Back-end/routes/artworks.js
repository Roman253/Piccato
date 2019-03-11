let Artwork = require('../models/artwork');

module.exports.get = async(req, res) => {
    try {
        let artwork = await Artwork.find({});
        res.status(200).send(artwork);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.post = async(req, res) => {
    try {
        //Handle post
        let artwork = req.body;

        //Create an instant of models 
        let resp = await Artwork.create(artwork);

        //Send it if everything went OK
        res.status(200).send(resp);
    } catch {
        console.error(err);
        resp.status(400).send(err);
    }
};