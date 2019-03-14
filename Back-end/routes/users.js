//All used dependencies are here
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const {
    body
} = require('express-validator/check');
const Auth = require('./auth');


//Get our User Model 
let User = require('../models/user');


router.post("/register",

    // Before we post to our database some validatations need be done
    // This block of code checks if the user has filled all the required 
    // forms and that they are filled properly (like email is an a real email, or password contains min 5 characters. etc)
    // then it also checks if the email being created is already in our database so that an account 
    // with the same email as another one CANNOT be created

    [
        body('name')
        .not().isEmpty().withMessage('Name is required')
        .isLength({
            min: 2
        }).withMessage('Name must be at least 2 characters'),
        body('lastname')
        .not().isEmpty().withMessage('Last name is required')
        .isLength({
            min: 2
        }).withMessage('Last name must be at least 2 characters'),
        body('email')
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('This is not a valid Email')
        .custom(value => {
            return User.findOne({
                email: value
            }).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        }),
        body('password')
        .not().isEmpty().withMessage('Password is required')
        .isLength({
            min: 5
        }).withMessage('Password must be at least 5 characters')
        .custom((value, {
            req
        }) => {
            if (value !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
        body('confirm_password')
        .not().isEmpty().withMessage('Password is required')
        .isLength({
            min: 5
        }).withMessage('Password must be at least 5 characters')
        .custom((value, {
            req
        }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
    ],

    async (req, res) => {

        // Here the code will post to our databse IF there arent any errors in the validation check
        // If there any errors they will be sent to the console and even as a status code but nothing will be sent to the Database
        // Otherwise if there arent any errors the new user will be createdn and POSTED to the database, the password will be encrypted before posting
        // to our database. The result is also shown in our console and sent as a status 200 to our server

        // return validation errors
        var errors = req.validationErrors();

        if (errors) {

            console.log(errors);
            res.status(400).send(errors);

        } else {

            let user = await User.create({
                uid: uuid(),
                role: req.body.role,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            })

            res.status(200).send(user);
            console.log(user);

        }
    });


module.exports = router;