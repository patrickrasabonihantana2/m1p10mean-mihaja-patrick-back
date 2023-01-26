var express = require('express');
const Env = require('../../util/env');
const MongoConnect = require('../../dao/MongoConnect');
const { createCollections } = require('../../dao/create-collection');
var router = express.Router();

const voitureRouter = require('./voiture');
const reparationRouter = require('./reparation');
const depenseRouter = require('./depense');
const statistiqueRouter = require('./statistique');

router.use('/voiture', voitureRouter);
router.use('/reparation', reparationRouter);
router.use('/depense', depenseRouter);
router.use('/statistique', statistiqueRouter);

module.exports = router;
