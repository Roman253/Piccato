//All used dependencies are here
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const { body } = require('express-validator/check');


//Get our User Model 
let User = require('../models/user');


router.post("/register", 

    [
    body('name')
        .not().isEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('lastname')
        .not().isEmpty().withMessage('Last name is required')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
    body('email')
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('This is not a valid Email'),
    body('password')
        .not().isEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
    body('confirm_password')
        .not().isEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
    ], 

    async (req, res) => {

        // return validation errors
        var errors = req.validationErrors();

        if(errors){

            console.log(errors);
            res.status(400).send(errors);
    
          } else {
            
            var resp =  await User.create({
                uid: uuid(),
                role: req.body.role,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            })
    
            res.status(200).json(({ resp }));
            console.log(resp);

        }
    });
  

module.exports = router;