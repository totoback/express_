const { signedCookie } = require('cookie-parser');
const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인용 미들웨어 (로그인전에 확인함)
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    // signedCookies 안에 user라는 키값이 존재하는지 체크
    // console.log(req.signedCookie.user);
    next();
  } else {
    res.status(400);
    res.send(
      '로그인이 필요한 서비스 입니다! <br><a href="/login">로그인 페이지로 이동</a>',
    );
  }
}

//게시판 페이지 호출
router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    const { userId } = req.session;
    console.log(userId);
    res.render('db_Board', { ARTICLE, articleCounts, userId });
  });
});

// 글쓰기 페이지 호출
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
  //db_board_write.ejs를 그려달라는 요청
});

// 데이터 베이스에 글쓰기
router.post('/write', isLogin, (req, res) => {
  // console.log(req.body); //브라우져에서 실행하고 터미널로 확인 가능
  // USERID --> req.sesstion.userID
  if (req.body.title && req.body.content) {
    const newArticle = {
      userId: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };
    boardDB.writeArticle(newArticle, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글쓰기 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 아이디 값을 가지는 게시글이 없습니다.');
      err.statusCode = 500;
      // 서버 문제는 에러 번호 500번대로 선언
      throw err;
    }
  });
});

// 글 수정 하기
router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 수정 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    throw err;
  }
});

// 글 삭제 하기
// 업데이트, 삭제 할떈 affectedRows사용
// delete 방식으로는 redirect가 사용 안됨
router.delete('/delete/:id', isLogin, (req, res) => {
  boardDB.deleteArticle(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.status(200).send('삭제 성공');
    } else {
      const err = new Error('삭제 실패!');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data) => {
    res.send(data);
  });
});

module.exports = router;
