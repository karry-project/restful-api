const express = require('express');

const router = express.Router();
const auth = require('./../middlewares/auth');

router.use('*', auth, (req, res, next) => next());

const findAll = require('./../controllers/requests/findAll');
const findOne = require('./../controllers/requests/findOne');
const createOne = require('./../controllers/requests/createOne');
const updateOne = require('./../controllers/requests/updateOne');
const removeOne = require('./../controllers/requests/removeOne');

router.get('/', (req, res) => findAll(req, res));
router.get('/:id', (req, res) => findOne(req, res));
router.post('/', (req, res) => createOne(req, res));
router.patch('/:id', (req, res) => updateOne(req, res));
router.delete('/:id', (req, res) => removeOne(req, res));

module.exports = router;
