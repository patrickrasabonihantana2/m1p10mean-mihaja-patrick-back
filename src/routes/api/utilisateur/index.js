var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

const UtilisateurService = require('../../../services/utilisateur-service');

router.get('/:id', async function(req, res) {
  try {
    let id = new ObjectId(req.params.id);
    let utilisateur = await UtilisateurService.findById(id);
    let data = {
      utilisateurs: [utilisateur]
    };
    res.jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {};
    if(err instanceof BSONTypeError) {
      if(err.code == 'ERR_HTTP_HEADERS_SENT') {
        data.message = 'utilisateur inexistant';
      }
    } else {
      data.message = err.message;
    }
    res.status(400).jsend.fail(data);
  }
});

module.exports = router;
