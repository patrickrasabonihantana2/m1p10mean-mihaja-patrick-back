const bcrypt = require('bcrypt');
const {Db} = require('mongodb');
const Utilisateur = require('./utilisateur');

class UtilisateurLogin {
  #isCrypt = false;

  constructor(email, mdp) {
    this.validatEmail(email);
    this.email = email;
    this.mdp = mdp;
  }

  /**
   * @param {boolean} isCrypt
   */
  set isCrypt(isCrypt) {
    this.#isCrypt = isCrypt;
  }

  validatEmail(value) {
    let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(value == '' || value.match(emailFormat) == null) {
      throw new Error('email non valide');
    }
  }

  async hashMdp() {
    this.mdp = await bcrypt.hash(this.mdp, 10);
    this.#isCrypt = true;
  }

  /**
   * recupere l'utilisateur
   * @param {Db} db database
   * @return {object} utilisateur correspondant
   */
  async getUtilisateur(db) {
    let collection = db.collection('utilisateurs');
    // await this.hashMdp();
    let query = {
      "login.email": this.email,
      "login.mdp": this.mdp
    };
    let options = {
      projection: {
        login: 0
      }
    };
    console.log(query);
    let utilisateur = await collection.findOne(query, options);
    return utilisateur;
  }
}

module.exports = UtilisateurLogin;
