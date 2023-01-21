var express = require('express');
var router = express.Router();
const loginRoute = require('./login');
const InscriptionRoute = require('./inscription');

router.use(loginRoute);
router.use(InscriptionRoute);

module.exports = router;
