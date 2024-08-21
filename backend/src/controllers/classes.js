import express from 'express';
const router = express.Router();
import { mainAuth, auth, unAuth } from '../middlewares/auth';
import { classesList } from '../services/classes/classesList';
import { insertLike } from '../services/classes/insertLike';
import { deleteLike } from '../services/classes/deleteLike';
import { insertClasses } from '../services/classes/insertClasses';
import { updateClasses } from '../services/classes/updateClasses';

// 클래스 리스트 조회 (검색)
router.get('/', classesList);

// 클래스 등록
router.post('/', auth, insertClasses);

// 클래스 수정
router.put('/:classId', auth, updateClasses);

// 클래스 좋아요 등록
router.post('/:classId/like', auth, insertLike);

// 클래스 좋아요 삭제
router.patch('/:classId/like', auth, deleteLike);

export default router;
