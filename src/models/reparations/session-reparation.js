const {EtatSessionReparation} = require('../../constantes');
const Evolution = require('../evolution');

class SessionReparation {
  voiture_id;
  entree;
  sortie;
  etat;
  evolutions;
  reparations;

  static newBlank(voiture_id, entree, sortie, etat) {
    let instance = new SessionReparation();
    instance.voiture_id = voiture_id;
    instance.entree = entree;
    instance.sortie = sortie;
    instance.etat = etat;
    return instance;
  }
  static newCreate(voiture_id, entree, sortie, etat = EtatSessionReparation.ENTREE) {
    let instance = new SessionReparation();
    instance.voiture_id = voiture_id;
    instance.entree = entree;
    instance.sortie = sortie;
    instance.reparations = [];
    instance.etat = etat;
    instance.evolutions = [new Evolution(this.etat)];
    return instance;
  }
}

module.exports = SessionReparation;
