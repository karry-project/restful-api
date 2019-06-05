const express = require('express');

const router = express.Router();
const auth = require('./../middlewares/auth');

router.use('*', auth, (req, res, next) => next());

// CRUD
const findAll = require('./../controllers/reviews/findAll');
const findOne = require('./../controllers/reviews/findOne');
const createOne = require('./../controllers/reviews/createOne');
const updateOne = require('./../controllers/reviews/updateOne');
const removeOne = require('./../controllers/reviews/removeOne');

router.get('/', (req, res) => findAll(req, res));
router.get('/:id', (req, res) => findOne(req, res));
router.post('/', (req, res) => createOne(req, res));
router.patch('/:id', (req, res) => updateOne(req, res));
router.delete('/:id', (req, res) => removeOne(req, res));

module.exports = router;
