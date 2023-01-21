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
    res.json(utilisateur);
  } catch(err) {
    console.error(err);
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
