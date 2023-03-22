// const connection = require('./dbConnect');
const { ObjectId } = require('mongodb');
const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br><a href="/">메인 페이지로 이동</a>';

// 모든 게시글 불러오기
const getAllArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const getAllArticleCursor = board.find({});
    // find {} 빈 중괄호로 전체 객체를 가져오겠다.
    const ARTICLE = await getAllArticleCursor.toArray();

    res.render('db_board', {
      ARTICLE,
      articleCounts: ARTICLE.length,
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.massage + UNEXPECTED_MSG);
  }
};

// 글쓰기 (글 수정 모드)
const writeArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    await board.insertOne(newArticle);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.stauts(500).send(err.massage + UNEXPECTED_MSG);
  }
};

// 글 수정
const getArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('db_board_modify', { selectedArticle }); // 객체 전달
  } catch (err) {
    console.error(err);
    res.status(500).send(err.massge + UNEXPECTED_MSG);
  }
};

// 특정 ID를 가지는 게시글을 수정하는 컨트롤러
const modifyArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    await board.updateOne(
      { _id: ObjectId(req.params.id) }, // 찾는다.
      { $set: { TITLE: req.body.title, CONTENT: req.body.content } }, // $set은 변경한다.
    );

    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.massage + UNEXPECTED_MSG);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    await board.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(200).json('삭제 성공');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.massage + UNEXPECTED_MSG);
  }
};

module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};

// const boardDB = {
//   // 모든 게시글 가져오기
//   getAllArticles: (cb) => {
//     connection.query('SELECT * FROM mydb.board', (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       cb(data);
//     });
//   },
//   // 게시글 추가하기
//   writeArticle: (newArticle, cb) => {
//     console.log(newArticle);
//     connection.query(
//       `INSERT INTO mydb.board (USERID, TITLE, CONTENT) values ('${newArticle.userId}','${newArticle.title}', '${newArticle.content}');`,
//       //INSERT INTO board (TITLE, CONTENT) values
//       //반드시 문자열로, 문자열로 안하면 컴퓨터가 컬럼으로 생각함
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID 값을 가지는 게시글 찾기
//   getArticle: (id, cb) => {
//     connection.query(
//       `SELECT * FROM mydb.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID를 가지는 게시글을 수정하는 컨트롤러
//   modifyArticle: (id, modifyArticle, cb) => {
//     connection.query(
//       `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID를 가지는 게시글 삭제하기
//   deleteArticle: (id, cb) => {
//     connection.query(
//       // 데이터 베이스에 쿼리 날리기
//       `DELETE FROM mydb.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
// };

// module.exports = boardDB;
