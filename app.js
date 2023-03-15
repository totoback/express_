const express = require("express");
const cors = require("cors");

const app = express();
// 실제로 쓰는 expresss를 app으로 변수화
const PORT = 4000;
// 포트 4000번으로 지정

// 서버 라우터 경로 불러오기
const mainRouter = require("./routes/index"); // 라우츠 폴더에 있는 index.js
const userRouter = require("./routes/users"); // 라우츠 폴더에 있는 users.js
const boardRouter = require("./routes/board");
const dbRouter = require("./routes/db");

const bodyParser = require("body-parser");

app.use(bodyParser.json()); //bodyParser1
app.use(express.urlencoded({ extended: false })); // bodyParser2
app.use(cors());
// cors라는 패키지를 쓴다는 명령
app.set("view engine", "ejs");
// ejs를 사용하려면 뷰엔진을 ejs로 사용한다는 코드 선언
app.use(express.static("public"));
// app.use('/public', express.static('public')); /public의 경로로도 가능

// 라우터를 서버로 연겷해주기
app.use("/", mainRouter); // 4000으로 들어갔을때 메인 서버로 연결
app.use("/users", userRouter);
app.use("/board", boardRouter);
app.use("/db", dbRouter);

app.use((err, req, res, next) => {
  console.log(err.stack); //어떤 에러가 발생하는지 statck을 찍어준다.
  res.status(err.statusCode);
  res.send(err.message);
});

app.get("/", (req, res) => {
  res.send("서버 연결 완료");
});
// 서버 요청에 맞는 미들웨어

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 작동중!`);
});
// 기능 없는 서버키는 방법, 서버를 키는 코드는 최하단에 위치 해야 한다.
