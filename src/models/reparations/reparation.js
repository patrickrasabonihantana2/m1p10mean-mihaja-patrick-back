const {ObjectId} = require('mongodb');
const {EtatReparation} = require('../../constantes');
const Evolution = require('../evolution');

class Reparation {
  constructor(description, montant, etat = EtatReparation.CREE, _id = new ObjectId()) {
    this.session_reparation_id = session_reparation_id;
    this.description = description;
    this.montant = montant;
    this.etat = etat;
    this.evolutions = [new Evolution(this.etat)];
    this._id = _id;
  }
}

module.exports = Reparation;
