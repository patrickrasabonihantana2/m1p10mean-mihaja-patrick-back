var express = require('express');
var router = express.Router();

const voitureRouter = require('./voiture');
const depenseRouter = require('./depense');
const statistiqueRouter = require('./statistique');
const utilisateurRouter = require('./utilisateur');

router.use('/utilisateur', utilisateurRouter);
router.use('/voiture', voitureRouter);
router.use('/depense', depenseRouter);
router.use('/statistique', statistiqueRouter);

module.exports = router;
