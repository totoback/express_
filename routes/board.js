const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: '타이틀1',
    content: '컨텐츠1',
  },
  {
    title: '타이틀2',
    content: '컨텐츠2',
  },
];

// localhost:4000/board/
// 글 목록 보여주기
router.get('/', (req, res) => {
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length });
});

// 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

// 글 추가
router.post('/write', (req, res) => {
  // console.log(req.body);
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/board');
    // 글쓰기 작성을 완료 하면 /board 라는 url로 연결시키기
  } else {
    const err = new Error('폼 입력을 확인해 주세요!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정
// 글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

// 글 수정
// 어떤 글을 수정하는지 알아야 하기 때문에 title을 쓴다
router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => req.params.title === article.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('입력이 잘못 되었습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제
// 어떤 글을 삭제하는지 알아야 하기 때문에 title을 쓴다
router.delete('/delete/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  ARTICLE.splice(arrIndex, 1);
  // res.redirect('/board');
  res.send('삭제 완료');
});

module.exports = router;
