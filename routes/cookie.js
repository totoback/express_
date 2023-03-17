const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.cookie('alert', true, {
  //   expires: new Date(Date.now() + 1000 * 60),
  //   httpOnly: true,
  // });
  // console.log(req.cookies);
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  //쿠키 발행 코드 발행하기
  res.cookie('alert', true, {
    httpOnly: false,
    maxAge: 1000 * 5, //5초 동안 유지할 수 있도록
  });
  res.status(200).json('쿠키 굽기 성공');
});

module.exports = router;
