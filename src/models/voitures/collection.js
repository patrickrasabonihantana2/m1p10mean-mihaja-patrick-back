const colletion = {
  name: 'voitures',
  options: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Collection Voiture',
        required: ['user_id', 'matricule', 'marque', 'modele'],
        properties: {
          user_id: {
            bsonType: "objectId"
          },
          matricule: {
            bsonType: "string"
          },
          marque: {
            bsonType: "string"
          },
          modele: {
            bsonType: "string"
          },
          sessions: {
            bsonType: "array",
            items:  {
              bsonType: 'object',
              properties: {
                entree: {
                  bsonType: "date"
                },
                sortie: {
                  bsonType: "date"
                },
              }
            }
          }
        }
      }
    }
  },
  indexes: [
    {
      indexInfo:{ "matricule": 1 },
      isUnique:true
    }
  ]
}

module.exports = colletion;
