const collection = {
  name: 'session_reparations',
  options: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Reparations',
        required: ['voiture_id', 'entree', 'etat'],
        properties: {
          voiture_id: {
            bsonType: 'objectId'
          },
          entree: {
            bsonType: 'date'
          },
          sortie: {
            bsonType: ['null', 'string']
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
          },
          reparations: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['description', 'montant', 'etat'],
              properties: {
                _id: {
                  bsonType: 'objectId',
                },
                description: {
                  bsonType: 'string'
                },
                montant: {
                  bsonType: 'double'
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
        }
      }
    }
  },
  indexes: [
    {
      indexInfo:{ "voiture_id": 1 }
    }
  ]
}

module.exports = collection;
