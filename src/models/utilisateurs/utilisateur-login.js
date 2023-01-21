const bcrypt = require('bcrypt');

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
   * cree un nouvel utilisateur
   * @param {Db} db database
   * @return {Utilisateur} utilisateur correspondant
   */
  async getUtilisateur(db) {

  }
}

module.exports = UtilisateurLogin;
