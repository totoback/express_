// const connection = require('./dbConnect');
const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG =
  '알 수 없는 문제 발생<br><a href="/register">회원가입으로 이동</a>';

const DUPLICATED_MSG =
  '동일한 ID를 가지는 회원이 존재합니다 <br><a href="/register">회원가입으로 이동</a>';
const SUCCESS_MSG = '회원 가입 성공! <br><a href="/login">로그인으로 이동</a>';
const PASSWORD_MSG =
  '비밀번호가 다릅니다!<br><a href="/login">로그인으로 이동</a>';
const LOGIN_UN_MSG = '로그인 실패<br><a href="/login">로그인으로 이동</a>';
const LOGIN_UNEXPECTED_MSG =
  '입력 하신 ID를 가지는 회원이 존재하지 않습니다.<br><a href="/register">회원가입으로 이동</a>';
const LOGIN_SUCCESS_MSG = '로그인 성공';
const LOGIN_WRONG_MSG =
  '비밀번호가 틀렸습니다.<br><a href="/login">로그인으로 이동</a>';

const registerUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    await user.insertOne(req.body);
    res.status(200).send(SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

const loginUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = await client.db('kdt5').collection('user');

    // 입력 받은 사람을 찾는다
    const findUser = await user.findOne({ id: req.body.id });
    if (!findUser) return res.status(400).send(LOGIN_UN_MSG);

    if (findUser.password !== req.body.password)
      return res.status(400).send(LOGIN_WRONG_MSG);

    // 로그인 처리
    req.session.login = true;
    req.session.userId = req.body.id;

    res.cookie('user', req.body.id, {
      maxAge: 1000 * 10,
      httpOnly: true,
      signed: true,
    });

    res.status(200);
    res.redirect('/dbBoard');
  } catch (err) {
    console.log(err);
    res.status(500).send(LOGIN_UNEXPECTED_MSG);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

// const userDB = {
//   //중복 회원 찾기
//   userCheck: (userID, cb) => {
//     //userID의 값을 인자로 받아온다. 화살표함수로 메소드임을 알려준다.
//     connection.query(
//       `SELECT * FROM mydb.user WHERE USERID = '${userID}'`,
//       //'${userID}' 따옴표로 감싸줘야 데이터로 인식함
//       (err, data) => {
//         if (err) throw err; //에러 발생하면 에러 던진다
//         cb(data); // 에러 발생 안하면 데이터를 결과에 넣어준다.
//       },
//     );
//     //mydb.안에 user테이블은 USERID로 가져온다.
//   },
//   // 회원 가입하기
//   registerUser: (newUser, cb) => {
//     connection.query(
//       `INSERT INTO mydb.user (USERID, PASSWORD) values ('${newUser.id}','${newUser.password}');`,
//       (err, data) => {
//         if (err) throw err; //에러 발생하면 에러 던진다.
//         cb(data); // 에러 발생 안하면 데이터를 결과에 넣어준다.
//       },
//     );
//   },
// };

// module.exports = userDB;
