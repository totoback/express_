const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGO_DB_URI } = process.env;

const client = new MongoClient(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
