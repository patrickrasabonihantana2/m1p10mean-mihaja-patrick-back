var express = require('express');
var router = express.Router({mergeParams: true});

const SessionReparationRouter = require('./session-reparation');
const ReparationRouter = require('./reparation');

router.use('/session', SessionReparationRouter);
router.use('/reparation', ReparationRouter);

module.exports = router;
