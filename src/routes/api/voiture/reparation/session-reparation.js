var express = require('express');
var router = express.Router({mergeParams: true});
const {ObjectId} = require('mongodb');
const {BSONTypeError} = require('bson');

const {SessionReparation} = require('../../../../models/reparations');
const ReparationService = require('../../../../services/reparation-service');

router.get('/', async function(req, res) {

});

router.post('/', async function(req, res) {
  let body = req.body;

  try {
    let voiture_id = new ObjectId(req.params.voiture_id);
    let entree = (body.entree) ? new Date(body.entree) : undefined;
    let sortie = (body.sortie) ? new Date(body.sortie) : undefined;

    let sessionReparations = new SessionReparation(voiture_id, entree, sortie);
    sessionReparations = await ReparationService.addSession(sessionReparations);

    let data = {
      sessionsReparations: [sessionReparations]
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
    res.status(400).jsend.fail(data);
  }
});

router.put('/:id', async function(req, res) {
  let body = req.body;

  try {
    let id = new ObjectId(req.params.id);
    let entree = (body.entree) ? new Date(body.entree) : undefined;
    let sortie = (body.sortie) ? new Date(body.sortie) : undefined;

    let sessionReparations = new SessionReparation(undefined, entree, sortie);
    sessionReparations._id = id;
    sessionReparations = await ReparationService.updateSession(sessionReparations);

    let data = {
      sessionsReparations: [sessionReparations]
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
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
