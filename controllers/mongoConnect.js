const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://totojoung:dkssud@cluster0.cfvpd5x.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
