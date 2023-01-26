var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

const {Voiture} = require('../../../models/voitures');
const VoitureService = require('../../../services/voiture-service');

router.get('/', async function(req, res) {
  let params = req.query;
  let utilisateur = req.app.get('utilisateur');

  let user_id = (utilisateur.role == 'Client') ? new ObjectId(utilisateur._id) : params.user_id || undefined;
  let matricule = params.matricule || undefined;
  let marque = params.marque || undefined;
  let modele = params.modele || undefined;
  let etat = params.etat || undefined;

  try {
    let voiture = Voiture.newBlank(user_id, matricule, marque, modele, etat);
    console.log(voiture);

    let voitures = await VoitureService.find(voiture);
    let data = {
      voitures: voitures
    };
    res.jsend.success(data);
  } catch(err) {
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

router.get('/:id', async function(req, res) {
  let id = new ObjectId(req.params.id);
  try {
    let voiture = await VoitureService.findById(new ObjectId(id));
    let data = {
      voitures: [voiture]
    };
    res.jsend.success(data);
  } catch(err) {
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

router.post('/', async function(req, res) {
  let body = req.body;
  let utilisateur = req.app.get('utilisateur');

  let user_id = new ObjectId(body.user_id) || new ObjectId(utilisateur._id);
  try {
    let voiture = Voiture.newCreate(user_id, body.matricule, body.marque, body.modele);
    voiture = await VoitureService.add(voiture);
    let data = {
      voitures: [voiture]
    };
    res.jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

router.put('/:id', async function(req, res) {
  let id = undefined;
  try {
    id = new ObjectId(req.params.id);
  } catch(err) {
    let data = {
      message: 'voiture inexistance'
    };
    res.status(400).jsend.fail(data);
  }
  let body = req.body;

  let user_id = body.user_id || undefined;
  let matricule = body.matricule || undefined;
  let marque = body.marque || undefined;
  let modele = body.modele || undefined;
  let etat = body.etat || undefined;

  try {
    let voiture = Voiture.newBlank(user_id, matricule, marque, modele, etat);
    voiture._id = id;
    voiture = await VoitureService.update(voiture);
    let data = {
      voitures: [voiture]
    };
    res.jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
