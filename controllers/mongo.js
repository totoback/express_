const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://totojoung:dkssud@cluster0.cfvpd5x.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  // 몽고 디비 클라이언트를 통해서 접속을 시도하고 문제없으면 없으면 kdt5만들고 test만들다.
  // console.log(collection);
  test.deleteMany({}, (deleteErr, deleteResult) => {
    // 조건이 없을 떄  {} --> 모든 데이터를 찾는다.
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);
    test.insertOne(
      {
        name: 'tetz',
        nickName: 'chicken head',
      },
      (insertErr, insertResult) => {
        console.log(insertResult);
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
        // client.close();
      },
    );
  });
});
