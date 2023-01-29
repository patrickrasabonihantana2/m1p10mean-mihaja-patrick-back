var express = require('express');
var router = express.Router();
const {Utilisateur} = require('../../models/utilisateurs');
const UtilisateurService = require('../../services/utilisateur-service');

/* GET users listing. */
router.post('/inscription', async function(req, res) {
  body = req.body;
  try {
    let utilisateur = new Utilisateur(body.nom, body.prenom, body.role, body.login);
    utilisateur = await UtilisateurService.inscription(utilisateur);
    let data = {
      utilisateur: utilisateur
    };
    res.jsend.success(data);
  } catch(err) {
    let data = {
      message: err.message
    };
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
