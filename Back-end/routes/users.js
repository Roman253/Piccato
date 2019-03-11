const express = require('express');
const { check, validationResult } = require('express-validator/check');

//Get our User Model 
let User = require('../models/user');

module.exports.post = async (req, res) => {

    try {

        check('name', 'Name is required').isEmpty();
        check('email', 'Email is required').isEmpty();
        check('email', 'Email is not valid').isEmail();
        check('lastname', 'Last Name is required').isEmpty();
        check('password', 'Password is required').isEmpty();

        let resp = await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        res.status(200).send(resp);

    } catch (errors) {
        console.log(errors.message);
        res.status(400).send(errors.message);
    }

};