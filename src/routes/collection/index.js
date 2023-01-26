var express = require('express');
var router = express.Router();

const Env = require('../../util/env');
const MongoConnect = require('../../dao/MongoConnect');
const { createCollections } = require('../../dao/create-collection');

router.get('/create', async function(req, res, next) {
  const mongoConnect = new MongoConnect();
  let mongoClient = undefined;
  try {
    mongoClient = await mongoConnect.getConnection();
    let db = mongoClient.db(Env.MONGO_DB);

    let collections = await createCollections(db);

    let data = {
      message: 'Collections cree',
      collections: collections
    }
    res.status(201).jsend.success(data);
  } catch(err) {
    console.log(err);
    let data = {
      message: err.message
    }
    res.status(400).jsend.fail(data);
  } finally {
    if(mongoClient) {
      mongoClient.close();
    }
  }
});

module.exports = router;
