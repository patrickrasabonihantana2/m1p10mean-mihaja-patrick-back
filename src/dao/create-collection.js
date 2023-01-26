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

    let newCollections = [];
    let allCollections = [];
    //Lister les collections déjà existantes
    const existingCollections = await db.collections();

    for(let collection of collections){
      allCollections.push(collection.name);

      if (existingCollections.find((col) => col.collectionName === collection.name) === undefined) {
        //Créer collection
        let newCollection = await db.createCollection(collection.name, collection.options);

        console.log(`${collection.name} created`);
        newCollections.push(collection.name);

        if(collection.indexes !== undefined || collection.indexes !== [] || collection.indexes !== null){
          for(let index of collection.indexes) {
            const {indexInfo,isUnique} = index;
            await newCollection.createIndex(indexInfo, (isUnique) ? {unique:true} : undefined);
          }
        }
      }
    }

    let data = {
      new: newCollections,
      all: allCollections
    }
    return data;
  }
}
