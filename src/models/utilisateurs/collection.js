const colletion = {
  name: 'utilisateurs',
  options: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Collection Utilisateur',
        required: ['nom', 'prenom', 'login'],
        properties: {
          nom: {
            bsonType: "string"
          },
          prenom: {
            bsonType: "string"
          },
          login: {
            bsonType: "object",
            required: ['email', 'mdp'],
            properties: {
              email: {
                bsonType: "string"
              },
              mdp: {
                bsonType: "string"
              }
            }
          },
          role: {
            enum: ["Client", "Atelier", "Finance"]
          }
        }
      }
    }
  },
  indexes: [
    {
      indexInfo:{ "email": 1 },
      isUnique:true
    }
  ]
}

module.exports = colletion;
