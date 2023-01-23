var express = require('express');
var router = express.Router();
const {UtilisateurLogin} = require('../../models/utilisateurs');
const UtilisateurService = require('../../services/utilisateur-service');

router.post('/login', async function(req, res, next) {
  body = req.body;
  try {
    let utilsateurLogin = new UtilisateurLogin(body.email, body.mdp);
    let data = await UtilisateurService.login(utilsateurLogin);
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
