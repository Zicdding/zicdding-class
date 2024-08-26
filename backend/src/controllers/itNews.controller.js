import express from "express";
import { itNewsService } from '../services/itNews.service.js';
import { mainAuth, auth } from '../middlewares/auth.js';

const router = express.Router();

//itNews

//등록
router.post('/', itNewsService.process.news);
router.get('/', itNewsService.output.view);

//조회
router.get('/find', itNewsService.output.findOne);
router.get('/findAll', itNewsService.output.findAll);
router.post('/search', itNewsService.process.search);

//삭제
router.patch('/del', auth, itNewsService.process.del);
router.get('/del', auth, itNewsService.process.del);
//수정
router.patch('/modify', auth, itNewsService.process.modify);
router.get('/modify', auth, itNewsService.output.modify);

export default router;