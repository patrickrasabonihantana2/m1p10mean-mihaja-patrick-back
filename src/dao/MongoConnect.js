const { MongoClient } = require('mongodb');
const Env = require('../util/env');

class MongoConnect {
    async getConnectionByUrl(url) {
        let client = new MongoClient(url);
        await client.connect();
        return client;
    }
    async getConnection() {
        const url = Env.MONGO_URL;
        let client = await this.getConnectionByUrl(url);
        return client;
    }
}

module.exports = MongoConnect;