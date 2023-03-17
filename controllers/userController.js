const connection = require('./dbConnect');

const userDB = {
  //중복 회원 찾기
  userCheck: (userID, cb) => {
    //userID의 값을 인자로 받아온다. 화살표함수로 메소드임을 알려준다.
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${userID}'`,
      //'${userID}' 따옴표로 감싸줘야 데이터로 인식함
      (err, data) => {
        if (err) throw err; //에러 발생하면 에러 던진다
        cb(data); // 에러 발생 안하면 데이터를 결과에 넣어준다.
      },
    );
    //mydb.안에 user테이블은 USERID로 가져온다.
  },
  // 회원 가입하기
  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb.user (USERID, PASSWORD) values ('${newUser.id}','${newUser.password},');`,
      (err, data) => {
        if (err) throw err; //에러 발생하면 에러 던진다.
        cb(data); // 에러 발생 안하면 데이터를 결과에 넣어준다.
      },
    );
  },
};

module.exports = userDB;
