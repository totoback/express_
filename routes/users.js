const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('users', { user: '지영' });
});
// ejs를 쓰겠다는 선언

module.exports = router;
