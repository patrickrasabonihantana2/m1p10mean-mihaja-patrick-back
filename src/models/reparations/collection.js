const colletion = {
  name: 'reparations',
  options: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Collection Reparation',
        required: ['session_reparation_id', 'description', 'montant'],
        properties: {
          session_reparation_id: {
            bsonType: "objectId"
          },
          description: {
            bsonType: "string"
          },
          montant: {
            bsonType: "double",
            minimum: 0
          },
          evolutions: {
            bsonType: "array",
            items:  {
              bsonType: 'object',
              properties: {
                date: {
                    bsonType: "date"
                },
              }
            }
          }
        }
      }
    }
  },
  indexes: []
}

module.exports = colletion;
