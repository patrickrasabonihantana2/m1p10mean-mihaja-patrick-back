const {ObjectId, MongoError} = require('mongodb');
const MongoConnect = require('../dao/MongoConnect');
const Env = require('../util/env');
const {Voiture} = require('../models/voitures');

class Voitureervice {
  /**
   * recupere tous les voitures
   * @return voitures
   */
  static async findAll() {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('voitures');

      let voitures = await collection.find({}).toArray();
      return voitures;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * recupere les voitures selon les criteres
   * @param {Voiture} voiture criteres
   * @return voitures
   */
  static async find(voiture) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('voitures');

      let query = {};
      for (const [key, value] of Object.entries(voiture)) {
        if(value != undefined) {
          query[key] = value;
        }
      }

      let voitures = await collection.find(query).toArray();
      return voitures;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * recupere une voiture par l'ID
   * @param {ObjectId} id
   * @return voiture
   */
  static async findById(id) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('voitures');

      let query = {
        _id: id
      };

      let voitures = await collection.find(query).toArray();
      return voitures[0];
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * ajoute une nouvelle voiture
   * @param {Voiture} voiture nouvelle voiture
   * @return voiture
   */
  static async add(voiture) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('voitures');

      console.log(voiture);
      let voitures = await collection.insertOne(voiture);
      return voitures;
    } catch(err) {
      if(err instanceof MongoError) {
        if(err.code == 11000) {
          throw new Error('voiture existante');
        }
      }
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * met a jour une voiture
   * @param {Voiture} voiture voiture avec nouveaux info
   * @return voiture
   */
  static async update(voiture) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('voitures');

      let filter = {
        _id: voiture._id
      };
      let querySet = {};
      for (const [key, value] of Object.entries(voiture)) {
        if(key != '_id' && value != undefined) {
          querySet[key] = value;
        }
      }
      let query = {
        $set: querySet
      };

      let voitures = await collection.updateOne(filter, query);
      return voitures;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }
}

module.exports = Voitureervice;
