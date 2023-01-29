const {ObjectId} = require('mongodb');
const MongoConnect = require('../dao/MongoConnect');
const Env = require('../util/env');
const {SessionReparation} = require('../models/reparations');
const {EtatSessionReparation} = require('../constantes');

class ReparationService {
  /**
   * recupere les voitures selon les criteres
   * @param {SessionReparation} sessionReparations criteres
   * @return sessions de reparations
   */
  static async findSession(sessionReparations) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let query = {};
      for (const [key, value] of Object.entries(sessionReparations)) {
        if(value != undefined && value !== []) {
          query[key] = value;
        }
      }
      console.log(query);

      let sessionsReparations = await collection.find(query).toArray();
      return sessionsReparations;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * recupere une session reparations
   * @param {ObjectId} id
   * @return session de reparations
   */
  static async findSessionById(id) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let query = {
        _id: id
      };

      let sessionsReparations = await collection.find(query).toArray();
      return sessionsReparations[0];
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * ajoute une nouvelle session de reparations
   * @param {SessionReparation} sessionReparations nouvelle session reparation
   * @return session de reparations
   */
  static async addSession(sessionReparations) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let query = {
        "voiture_id": sessionReparations.voiture_id,
        "etat": {
          $lt: EtatSessionReparation.SORTIE
        }
      }
      let existSession = await collection.find(query).toArray();

      if(existSession.length > 0) {
        throw new Error('cette voiture est actuellement dans le garage');
      }

      let result = await collection.insertOne(sessionReparations);
      sessionReparations._id = result.insertedId;
      return sessionReparations;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * met a jour une session de reparations
   * @param {Voiture} sessionReparations voiture avec nouveaux info
   * @return session de reparations
   */
  static async updateSession(sessionReparations) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let filter = {
        _id: sessionReparations._id
      };
      let querySet = {};
      for (const [key, value] of Object.entries(sessionReparations)) {
        if(key != '_id' && value != undefined && value != []) {
          querySet[key] = value;
        }
      }
      let query = {
        $set: querySet
      };

      await collection.updateOne(filter, query);
      sessionReparations = await collection.find({_id: sessionReparations._id}).toArray();
      return sessionReparations[0];
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * recupere les reparations selon les criteres
   * @param {ObjectId} session_reparation_id
   * @param {Reparation} reparation criteres
   * @return reparations
   */
  static async find(session_reparation_id, reparation) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let queryTemp = {};
      for (const [key, value] of Object.entries(sessionReparations)) {
        if(value != undefined && value !== []) {
          queryTemp[key] = value;
        }
      }
      let query = {
        _id: session_reparation_id,
        reparations: {
          $elemMatch: queryTemp
        }
      }
      console.log(query);

      let sessionsReparations = await collection.find(query).toArray();
      return sessionsReparations;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * recupere une reparation par l'ID
   * @param {ObjectId} id
   * @return reparation
   */
  static async findById(id) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let query = {
        reparations: {
          $elemMatch: {
            _id: id
          }
        }
      };

      let reparations = await collection.find(query).toArray();
      return reparations[0];
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * ajoute une nouvelle reparation
   * @param {ObjectId} session_reparation_id
   * @param {Reparation} reparation nouvellereparation
   * @return reparation
   */
  static async add(session_reparation_id, reparation) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let filter = {
        _id: session_reparation_id
      };
      let query = {
        $push: {
          reparations: reparation
        }
      };
      // console.log(query);

      await collection.updateOne(filter, query);
      return reparation;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * met a jour une reparation
   * @param {Reparation} reparation reparation avec nouveaux info
   * @return reparation
   */
  static async update(reparation) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('session_reparations');

      let options = {
        projection: {
          reparations: 0
        }
      };
      let filter = {
        reparations: {
          $elemMatch: {
            _id: reparation._id
          }
        }
      };
      let querySet = {};
      for (const [key, value] of Object.entries(reparation)) {
        if(key != '_id' && key != 'evolutions' && value != undefined && value != []) {
          querySet[`reparations.$[element].${key}`] = value;
        }
      }
      // let queryPush = {
      //   evolutions: reparation[0]
      // };
      let query = {
        $set: querySet,
        arrayFilters: [
          {
            element: {_id: reparation._id}
          }
        ]
      };
      console.log(query);
      // return query;
      await collection.updateOne(filter, query);

      let eparations = await collection.find(filter, options).toArray();
      return eparations[0];
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }
}

module.exports = ReparationService;
