import express from "express";
const router = express.Router();
import { deleteItNews } from '../services/itNews/deleteItNews.js';
import { insertItNews } from '../services/itNews/insertItNews.js';
import { findItNews } from '../services/itNews/findItNews.js';
import { updateItNews } from '../services/itNews/updateItNews.js';
import { LikeItNews } from '../services/itNews/itNewsLike.js';
import { viewItNews } from '../services/itNews/itNewsViewCnt.js'

import { orderByItnews } from '../services/itNews/orderitNews.js'
import { mainAuth, auth } from '../middlewares/auth.js';


//등록
router.post('/', auth, insertItNews.process.news);

router.get('/', auth, insertItNews.output.view);


//조회
router.get('/find', findItNews.output.findOne);
router.get('/findAll', findItNews.output.findAll);
router.post('/search', findItNews.process.search);

//삭제
router.patch('/del', auth, deleteItNews.process.delete);
router.get('/del', auth, deleteItNews.process.delete);

//수정
router.patch('/modify', auth, updateItNews.process.modify);
router.get('/modify', auth, updateItNews.output.modify);

//좋아요
router.post('/like/:newsId', auth, LikeItNews.process.newsLike);
router.delete('/likeDel/:newsId', auth, LikeItNews.process.newsLikeCancel);
router.get('/like/:newsId', auth, LikeItNews.output.newsLike);
router.get('/likeDel/:newsId', auth, LikeItNews.output.newsDel);

//조회수
router.post('/cnt/:newsId', viewItNews.process.newsCnt);
router.get('/cnt/:newsId', viewItNews.output.newsCnt);

//댓글
router.post('/comments', auth, insertItNews.process.comments);
router.get('/comments', insertItNews.output.comments);

export default router;