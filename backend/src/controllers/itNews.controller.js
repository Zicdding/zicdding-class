import express from "express";
import * as itNewsService from '../services/itNews.service';

const router = express.Router();

//itNews
router.post(itNewsService.process.news);
router.get(itNewsService.output.view);
router.get('/find', itNewsService.output.findOne);
router.get('/findAll', itNewsService.output.findAll);
router.post('/search', itNewsService.process.search);

export default router;