const {ObjectId} = require('mongodb');
const {Voiture} = require('../models/voitures');

class Voitureervice {
  /**
   * recupere tous les voitures
   * @return voitures
   */
  static findAll() {

  }

  /**
   * recupere les voitures selon les criteres
   * @param {Voiture} voiture criteres
   * @return voitures
   */
  static find(voiture) {

  }

  /**
   * recupere une voiture par l'ID
   * @param {ObjectId} id
   * @return voiture
   */
  static findById(id) {

  }

  /**
   * ajoute une nouvelle voiture
   * @return voiture
   */
  static add() {

  }

  /**
   * met a jour une voiture
   * @param {Voiture} voiture voiture avec nouveaux info
   * @return voiture
   */
  static update(voiture) {

  }
}

module.exports = Voitureervice;
