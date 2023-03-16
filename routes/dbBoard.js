const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

//게시판 페이지 호출
router.get('/', (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('db_Board', { ARTICLE, articleCounts });
  });
});

// 글쓰기 페이지 호출
router.get('/write', (req, res) => {
  res.render('db_board_write');
  //db_board_write.ejs를 그려달라는 요청
});

// 데이터 베이스에 글쓰기
router.post('/write', (req, res) => {
  // console.log(req.body); //브라우져에서 실행하고 터미널로 확인 가능
  if (req.body.title && req.body.content) {
    boardDB.writeArticle(req.body, (data) => {
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
router.get('/modify/:id', (req, res) => {
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
router.post('/modify/:id', (req, res) => {
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
router.delete('/delete/:id', (req, res) => {
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
