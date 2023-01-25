const {EtatFacture} = require('../../constantes');
const Evolution = require('../evolution');

class Facture {
  constructor(session_reparation_id, date, total, reste, etat = EtatFacture.CREE) {
    this.session_reparation_id = session_reparation_id;
    this.date = date;
    this.total = total;
    this.reste = reste;
    this.etat = etat;
    this.evolutions = [new Evolution(this.etat)];
  }
}

module.exports = Facture;
