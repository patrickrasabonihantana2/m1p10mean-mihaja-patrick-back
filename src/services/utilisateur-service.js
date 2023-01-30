const jwt = require('jsonwebtoken');
const MongoConnect = require('../dao/MongoConnect');
const Env = require('../util/env');
const {UtilisateurLogin} = require('../models/utilisateurs');

class UtilisateurService {
  /**
   * cree un nouvel utilisateur
   * @param {UtilisateurLogin} utilsateurLogin login
   * @return {object} utilisateur et token
   */
  static async login(utilsateurLogin) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);

      let utilisateur = await utilsateurLogin.getUtilisateur(db);
      console.log(utilisateur);

      if(utilisateur == null) {
        throw new Error('login ou mot de passe incorrect');
      }

      let data = {
        utilisateur: {
          _id: utilisateur._id,
          role: utilisateur.role
        }
      };
      let token = jwt.sign(data, Env.SECURITY_JWT_SECRET);

      let result = {
        token: token,
        utilisateur: utilisateur
      }
      return result;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * cree un nouvel utilisateur
   * @param {Utilisateur}
   * @return {Utilisateur}
   */
  static async inscription(utilisateur) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      utilisateur = await utilisateur.save(db);
      return utilisateur;
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }

  /**
   * recupere un utilisateur par l'ID
   * @param {ObjectId} id
   * @return voiture
   */
  static async findById(id) {
    const mongoConnect = new MongoConnect();
    let mongoClient = undefined;
    try {
      mongoClient = await mongoConnect.getConnection();
      let db = mongoClient.db(Env.MONGO_DB);
      let collection = db.collection('utilisateurs');

      let query = {
        _id: id
      };
      let options = {
        projection: {
          login: 0
        }
      };

      let utilisateurs = await collection.find(query, options).toArray();
      return utilisateurs[0];
    } catch(err) {
      throw err;
    } finally {
      if(mongoClient) {
        await mongoClient.close();
      }
    }
  }
}

module.exports = UtilisateurService;
