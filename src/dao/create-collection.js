const { Db } = require('mongodb');
const utilisateurCollection = require('../models/utilisateurs').collection;
const voitureCollection = require('../models/voitures').collection;
const reparationCollection = require('../models/reparations').collection;
const depenseCollection = require('../models/depenses').collection;
const factureCollection = require('../models/factures').collection;

//Listes des collections
const collections = [
  utilisateurCollection,
  voitureCollection,
  reparationCollection,
  depenseCollection,
  factureCollection
]

module.exports = {
  createCollections: async function (db) {
    if (!(db instanceof Db)) {
        throw Error("Erreur lors de la création des collections")
    }
    //Lister les collections déjà existantes
    const existingCollections = await db.collections();

    for(let collection of collections){
      if (existingCollections.find((col) => col.collectionName === collection.name) === undefined) {
        //Créer collection
        let newCollection = await db.createCollection(collection.name, collection.options);

        if(collection.indexes !== undefined || collection.indexes !== [] || collection.indexes !== null){
          for(let index of collection.indexes) {
            const {indexInfo,isUnique} = index;
            newCollection.createIndex(indexInfo, (isUnique) ? {unique:true} : undefined);
          }
        }
      }
    }
  }
}
