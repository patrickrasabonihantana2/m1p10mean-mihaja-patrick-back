const {EtatVoiture} = require('../../constantes');
const Evolution = require('../evolution');

class Voiture {
  constructor(user_id, matricule, marque, modele, etat = EtatVoiture.CREE) {
    this.user_id = user_id;
    this.matricule = matricule;
    this.marque = marque;
    this.modele = modele;
    this.etat = etat;
    this.evolutions = [new Evolution(this.etat)];
  }
}

module.exports = Voiture;
