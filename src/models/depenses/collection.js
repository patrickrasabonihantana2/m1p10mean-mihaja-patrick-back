const collection = {
  name: 'depenses',
  options: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Collection Voiture',
        required: ['date', 'total'],
        properties: {
          date: {
            bsonType: 'date'
          },
          total: {
            bsonType: 'date'
          },
          details: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['type_depense', 'montant'],
              properties: {
                type_depense: {
                  enum: ["Salaire", "Loyer", "Achat Piece", 'Autre']
                },
                precision: {
                  bsonType: 'string'
                },
                montant: {
                  bsonType: 'double'
                }
              }
            }
          }
        }
      }
    }
  },
  indexes: []
}

module.exports = collection;
