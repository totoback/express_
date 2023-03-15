//database를 컨트롤하기 위한 라우터
const express = require("express");
const userDB = require("../controllers/userController");

const router = express.Router();
router.get("/", (req, res) => {
  userDB.getUsers((data) => {
    res.send(data);
  });
});

module.exports = router;
