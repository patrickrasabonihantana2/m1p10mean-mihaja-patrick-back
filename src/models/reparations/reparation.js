const {ObjectId} = require('mongodb');
const {EtatReparation} = require('../../constantes');
const Evolution = require('../evolution');

class Reparation {
  description;
  montant;
  etat;
  evolutions;

  static newBlank(description, montant, etat, _id) {
    let instance = new Reparation();
    instance.description = description;
    instance.montant = montant;
    instance.etat = etat;
    instance.evolutions = [new Evolution(instance.etat)];
    instance._id = _id;
    return instance;
  }
  static newCreate(description, montant, etat = EtatReparation.CREE, _id = new ObjectId()) {
    let instance = new Reparation();
    instance.description = description;
    instance.montant = montant;
    instance.etat = etat;
    instance.evolutions = [new Evolution(instance.etat)];
    instance._id = _id;
    return instance;
  }
}

module.exports = Reparation;
