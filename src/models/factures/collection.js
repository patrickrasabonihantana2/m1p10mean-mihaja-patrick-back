const collection = {
  name: 'factures',
  options: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Factures',
        required: ['session_reparation_id', 'date', 'total', 'etat'],
        properties: {
          session_reparation_id: {
            bsonType: 'objectId'
          },
          date: {
            bsonType: 'date'
          },
          total: {
            bsonType: 'double'
          },
          reste: {
            bsonType: 'double'
          },
          etat: {
            bsonType: 'int'
          },
          details: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['montant'],
              properties: {
                reparation_id: {
                  bsonType: 'objectId'
                },
                montant: {
                  bsonType: 'double'
                }
              }
            }
          },
          paiements: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['date', 'montant'],
              properties: {
                date: {
                  bsonType: 'date'
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
  }
}

module.exports = collection;
