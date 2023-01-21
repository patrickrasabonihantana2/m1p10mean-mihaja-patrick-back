const jwt = require('jsonwebtoken');
const MongoConnect = require('../dao/MongoConnect');
const Env = require('../util/env');
const {Utilisateur, UtilisateurLogin} = require('../models/utilisateurs');

class UtilisateurService {
  /**
   * cree un nouvel utilisateur
   * @param {UtilisateurLogin} utilsateurLogin login
   * @return {object} utilisateur et token
   */
  static login(utilsateurLogin) {
    let utlisateur = utilsateurLogin.getUtilisateur(undefined);

    let data = {
      utilisateur_id: utlisateur._id,
    };
    const tokenSecret = '';
    let token = jwt.sign(data, tokenSecret);
    return token;
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
}

module.exports = UtilisateurService;
