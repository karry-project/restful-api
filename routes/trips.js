const express = require('express');

const router = express.Router();
const auth = require('./../middlewares/auth');

router.use('*', auth, (req, res, next) => next());

// CUSTOM
const findSearch = require('./../controllers/trips/findSearch');
const joinOne = require('./../controllers/trips/joinOne');

router.get('/search', (req, res) => findSearch(req, res));
router.post('/:id/join', (req, res) => joinOne(req, res));

// CRUD
const findAll = require('./../controllers/trips/findAll');
const findOne = require('./../controllers/trips/findOne');
const createOne = require('./../controllers/trips/createOne');
const updateOne = require('./../controllers/trips/updateOne');
const removeOne = require('./../controllers/trips/removeOne');

router.get('/', (req, res) => findAll(req, res));
router.get('/:id', (req, res) => findOne(req, res));
router.post('/', (req, res) => createOne(req, res));
router.post('/:id/join', (req, res) => joinOne(req, res));
router.patch('/:id', (req, res) => updateOne(req, res));
router.delete('/:id', (req, res) => removeOne(req, res));



module.exports = router;
