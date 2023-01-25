const {EtatSessionReparation} = require('../../constantes');
const Evolution = require('../evolution');

class SessionReparation {
  constructor(voiture_id, entree, sortie, etat = EtatSessionReparation.ENTREE) {
    this.voiture_id = voiture_id;
    this.entree = entree;
    this.sortie = sortie;
    this.etat = etat;
    this.evolutions = [new Evolution(this.etat)];
  }
}

module.exports = SessionReparation;
