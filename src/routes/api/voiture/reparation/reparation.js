var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

const {Reparation} = require('../../../../models/reparations');
const ReparationService = require('../../../../services/reparation-service');

module.exports = router;
