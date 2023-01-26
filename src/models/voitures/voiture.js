const {EtatVoiture} = require('../../constantes');
const Evolution = require('../evolution');

class Voiture {
  _id;
  user_id;
  matricule;
  marque;
  modele;
  etat;
  evolutions;

  static newBlank(user_id, matricule, marque, modele, etat) {
    let instance = new Voiture();
    instance.user_id = user_id;
    instance.matricule = matricule;
    instance.marque = marque;
    instance.modele = modele;
    instance.etat = etat;
    return instance;
  }
  static newCreate(user_id, matricule, marque, modele, etat = EtatVoiture.CREE) {
    let instance = new Voiture();
    instance.user_id = user_id;
    instance.matricule = matricule;
    instance.marque = marque;
    instance.modele = modele;
    instance.etat = etat;
    instance.evolutions = [new Evolution(instance.etat)];
    return instance;
  }
}

module.exports = Voiture;
