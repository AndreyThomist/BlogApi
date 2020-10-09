const User = require('../models/user')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const validate = (res,req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}

const register = async (req, res) => {
    validate(res,req);
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({
            email: email
        });
    } catch (err) {
        res.status(404).json({
            message: "error 404"
        });
    }
    if (!existingUser) {
        bcrypt.hash(password, 10).then(hashedPassword => {
            let user = new User();
            user.email = email;
            user.password = hashedPassword;
            user.save();
            res.status(201).json({
                message: "user created",
                success: true
            })
        }).catch(err => {
            res.status(500).json({
                message: "error hashing the password"
            })
        })
    } else {
        res.status(203).json({
            message: "user already exists"
        })
    }
}
const login = async (req, res) => {
    validate(res,req)
    const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({
            email: email
        });
    } catch (err) {
        res.status(404).json({
            message: "error 404"
        });
    }
    if(existingUser){
        bcrypt.compare(password, existingUser.password).then(result => {
            if(result){
                const token = jwt.sign({ userId:existingUser._id }, 'dummy',{ expiresIn: 60 * 60 })
                res.status(200).json({
                    token:token,
                })
            }else{
                res.status(500).json({
                    message:"credentials invalid",
                    success:false
                })
            }
        }).catch(err => {
            res.status(500);
        });
    }else{
        res.status(404).json({
            message:"user does not exist"
        })
    }
}
exports.register = register;
exports.login = login;