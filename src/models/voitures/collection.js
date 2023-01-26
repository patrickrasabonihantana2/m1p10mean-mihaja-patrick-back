const colletion = {
  name: 'voitures',
  options: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Collection Voiture',
        required: ['user_id', 'matricule', 'marque', 'modele', 'etat', 'evolutions'],
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
          etat: {
            bsonType: 'int'
          },
          evolutions: {
            bsonType: "array",
            items:  {
              bsonType: 'object',
              required: ['date', 'etat'],
              properties: {
                date: {
                    bsonType: "date"
                },
                etat: {
                  bsonType: 'int'
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
