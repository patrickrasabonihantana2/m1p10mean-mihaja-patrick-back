var express = require('express');
const Env = require('../../util/env');
const MongoConnect = require('../../dao/MongoConnect');
var router = express.Router();

router.get('/', async function(req, res, next) {
  const mongoConnect = new MongoConnect();
  let mongoClient = undefined;
  try {
    mongoClient = await mongoConnect.getConnection();
    let db = mongoClient.db('garage_test');

    let usersCollection = db.collection('users');
    let users = await usersCollection.find({}).toArray();

    let result = {
      users: users
    };
    res.json(result);
  } catch(err) {
    throw err;
  } finally {
    if(mongoClient) {
      mongoClient.close();
    }
  }
  console.log('MONGO_URL', Env.MONGO_URL);
});

module.exports = router;
