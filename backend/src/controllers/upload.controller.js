import express from 'express';
import uploads from '../utils/multer'
import { uploadService } from '../services/upload.service'; // uploadService에서 메소드 가져오기

const router = express.Router();
//const upload = multer({ dest: 'uploads/' }); // 파일을 임시로 저장할 경로

// 파일 업로드 엔드포인트
router.post('/', uploads.array('file'), uploadService.upload);
router.get('/', uploadService.upload);
export default router;