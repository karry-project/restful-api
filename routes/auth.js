const express = require('express');

const router = express.Router();

// Controllers
const login = require('./../controllers/auth/login');
const loginGoogle = require('./../controllers/auth/loginGoogle');
const loginFacebook = require('./../controllers/auth/loginFacebook');
const logout = require('./../controllers/auth/logout');
const register = require('./../controllers/auth/register');

// Routes
router.post('/login', (req, res) => login(req, res));
router.post('/google', (req, res) => loginGoogle(req, res));
router.post('/facebook', (req, res) => loginFacebook(req, res));
router.post('/logout', (req, res) => logout(req, res));
router.post('/register', (req, res) => register(req, res));

module.exports = router;
