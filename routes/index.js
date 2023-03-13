const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { msg: '이 데이터는 백엔드가 보냈어요!' });
});
// ejs를 쓰겠다는 선언

module.exports = router;
