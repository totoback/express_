const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 1) {
      if (data[0].PASSWORD === req.body.password) {
        // 백엔드 세션 생성
        req.session.login = true;
        req.session.userId = req.body.id;

        // 로그인 쿠키 발행
        res.cookie('user', req.body.id, {
          // user로 발행하고, 아이디를 받아온다.
          maxAge: 1000 * 10, // 생성부터 30초동안 유지하도록
          httpOnly: true,
          signed: true, // 쿠키가 암호화된다.
        });

        res.status(200);
        res.redirect('/dbBoard');
      } else {
        res.status(400);
        res.send(
          '비밀번호가 다릅니다!<br><a href="/login">로그인으로 이동</a>',
          // '/'를 쓰면 localhost:4000/뒤에 로그인이고,
          // '/'가 없는 상태는 로컬파일의 주소
        );
      }
    } else {
      res.status(400);
      res.send(
        '해당 아이디가 존재하지 않습니다!<br><a href="/register">회원가입으로 이동</a>',
      );
    }
  });
});

// 로그아웃
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;
