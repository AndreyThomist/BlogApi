const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth-controller')
const { body } = require('express-validator');

router.post('/login',[
    body('email').normalizeEmail().isEmail().withMessage('must be an email'),
    body('password').isLength({min:6}).withMessage('must be an password')
],authController.login);
router.post('/register',
[
    body('email').normalizeEmail().isEmail().withMessage('must be an email'),
    body('password').isLength({min:6}).withMessage('must be an password')
],authController.register);

module.exports = router;