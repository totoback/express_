const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시글 가져오기
  getAllArticles: (cb) => {
    connection.query('SELECT * FROM mydb.board', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
  writeArticle: (newArticle, cb) => {
    console.log(newArticle);
    connection.query(
      `INSERT INTO mydb.board (TITLE, CONTENT) values ('${newArticle.title}', '${newArticle.content}');`,
      //INSERT INTO board (TITLE, CONTENT) values
      //반드시 문자열로, 문자열로 안하면 컴퓨터가 컬럼으로 생각함
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정 ID 값을 가지는 게시글 찾기
  getArticle: (id, cb) => {
    connection.query(
      `SELECT * FROM mydb.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정 ID를 가지는 게시글을 수정하는 컨트롤러
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정 ID를 가지는 게시글 삭제하기
  deleteArticle: (id, cb) => {
    connection.query(
      // 데이터 베이스에 쿼리 날리기
      `DELETE FROM mydb.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = boardDB;
