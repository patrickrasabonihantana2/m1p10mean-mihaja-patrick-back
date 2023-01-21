const {Db, MongoError} = require('mongodb');
const UtilisateurLogin = require('./utilisateur-login');

class Utilisateur {
  constructor(nom, prenom, role, login = undefined) {
    this.nom = nom;
    this.prenom = prenom;
    this.role = role;
    this.login = login ? new UtilisateurLogin(login.email, login.mdp) : undefined;
  }

  /**
   * cree un nouvel utilisateur
   * @param {Db} db database
   * @return {Utilisateur}
   */
  async save(db) {
    let colletion = db.collection('utilisateurs');
    try {
      let result = await colletion.insertOne(this);
      return this;
    } catch(err) {
      console.error(err);
      if(err instanceof MongoError) {
        if(err.code = 11000) {
          throw new Error('email existant');
        }
      }
      throw err;
    }
  }
  /**
   * met a jour un nouvel utilisateur
   * @param {Db} db database
   * @return {Utilisateur}
   */
  update(db) {

  }
}

module.exports = Utilisateur;
