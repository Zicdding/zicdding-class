import express from 'express';
const router = express.Router();
import { mainAuth, auth, unAuth } from '../middlewares/auth';
import { classesList } from '../services/classes/classesList';
import { insertLike } from '../services/classes/insertLike';
import { deleteLike } from '../services/classes/deleteLike';

// 클래스 리스트 조회 (검색)
router.get('/classes', classesList);

// 클래스 좋아요 등록
router.post('/classes/:classId/like', auth, insertLike);

// 클래스 좋아요 삭제
router.patch('/classes/:classId/like', auth, deleteLike);

export default router;
