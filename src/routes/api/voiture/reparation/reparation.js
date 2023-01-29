var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');
const {BSONTypeError} = require('bson');

const {Reparation} = require('../../../../models/reparations');
const ReparationService = require('../../../../services/reparation-service');

router.get('/', async function(req, res) {

});

router.get('/:id', async function(req, res) {
  try {
    let id = new ObjectId(req.params.id);
    let reparation = await ReparationService.findById(id);
    let data = {
      reparations: [reparation]
    };
    res.jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {};
    if(err instanceof BSONTypeError) {
      if(err.code == 'ERR_HTTP_HEADERS_SENT') {
        data.message = 'voiture inexistance';
      }
    }
    data.message = err.message;
    res.status(400).jsend.fail(data);
  }
});

router.post('/', async function(req, res) {
  let body = req.body;

  try {
    let session_reparation_id = body.session_reparation_id ? new ObjectId(body.session_reparation_id) : undefined;
    let description = body.description || undefined;
    let montant = body.montant || undefined;

    let reparation = Reparation.newCreate(description, montant);
    console.log(reparation);
    reparation = await ReparationService.add(session_reparation_id, reparation);

    let data = {
      reparations: [reparation]
    }
    res.jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {};
    if(err instanceof BSONTypeError) {
      if(err.code == 'ERR_HTTP_HEADERS_SENT') {
        data.message = 'voiture inexistance';
      }
    }
    data.message = err.message;
    data.info = err.errInfo;
    res.status(400).jsend.fail(data);
  }
});

router.put('/:id', async function(req, res) {
  let body = req.body;

  try {
    let id = new ObjectId(req.params.id) || undefined;
    let description = body.description || undefined;
    let montant = body.montant || undefined;
    let etat = body.etat || undefined;

    let reparation = Reparation.newBlank(description, montant, etat, id);
    console.log(reparation);
    reparation = await ReparationService.update(reparation);

    let data = {
      reparations: [reparation]
    }
    res.jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {};
    if(err instanceof BSONTypeError) {
      if(err.code == 'ERR_HTTP_HEADERS_SENT') {
        data.message = 'voiture inexistance';
      }
    }
    data.message = err.message;
    data.info = err.errInfo;
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
