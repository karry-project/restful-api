const express = require('express');
const router = express.Router();
const auth = require('./../middlewares/auth');

router.use('*', auth, (req, res, next) => next());

// CUSTOM
router.get('/me/trips', (req, res) => findTrips(req, res));
router.post('/:id/search', (req, res) => saveSearch(req, res));

// CRUD
const findAll = require('./../controllers/users/findAll');
const findMe = require('./../controllers/users/findMe');
const findOne = require('./../controllers/users/findOne');
const findTrips = require('./../controllers/users/findTrips');
const updateOne = require('./../controllers/users/updateOne');
const removeOne = require('./../controllers/users/removeOne');
const saveSearch = require('./../controllers/users/saveSearch');

router.get('/', (req, res) => findAll(req, res));
router.get('/:id', (req, res) => findOne(req, res));
router.get('/me', (req, res) => findMe(req, res));
router.patch('/:id', (req, res) => updateOne(req, res));
router.delete('/:id', (req, res) => removeOne(req, res));


module.exports = router;
