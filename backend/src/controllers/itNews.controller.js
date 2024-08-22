import express from "express";
import { itNewsService } from '../services/itNews.service';
import { mainAuth, auth } from '../middlewares/auth.js';

const router = express.Router();

//itNews

//등록
router.post(itNewsService.process.news);
router.get(itNewsService.output.view);

//조회
router.get('/find', itNewsService.output.findOne);
router.get('/findAll', itNewsService.output.findAll);
router.post('/search', itNewsService.process.search);

//삭제
router.put('/delete', itNewsService.process.delete);

//수정
router.put('/modify', auth, itNewsService.process.put);
router.get('/modify', auth, itNewsService.process.put);

export default router;