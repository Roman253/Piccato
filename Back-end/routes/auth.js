const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// GET REQUEST

module.exports.post = async(req, res) => {

    let user = await User.findOne({
        email: req.body.email
    });
    console.log(user);

    if (!user) {

        res.status(402).send("The user does not exist");
        console.log("The user does not exist");

    }
    if (user) {

        var match = await bcrypt.compare(req.body.password, user.password);

        if (match) {

            const token = jwt.sign({
                uid: user.uid
            }, process.env.SECRET);
            res.status(200).send({
                email: user.email,
                role: user.role,
                authToken: token,
                name: user.name,
                uid: user.uid
            });

        } else {

            res.status(402).send("Password is not valid");
            console.log("Password is not valid");
        }
    }
}

module.exports.isAdmin = async(authtoken) => {

    let token = await jwt.verify(authtoken.substring(7), process.env.SECRET);

    let user = await User.findOne({
        uid: token.uid
    });

    if (user.role === 'admin') {

        res.status(200).send({ email: user.email, role: user.role });
        res.status(200).send({
            email: user.email,
            role: user.role
        });

        return true;

    } else {

        res.status(402).send('You dont have admin privileges');

        return false;
    }
}

module.exports.verifyToken = async(token) => {

    try {

        let resp = await jwt.verify(token.substring(7), process.env.SECRET);
        console.log(resp)
        return true;

    } catch (err) {

        console.error(err);
        return false;
    }
}