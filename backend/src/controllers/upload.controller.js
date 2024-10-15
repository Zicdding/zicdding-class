import express from 'express';
import { uploads } from '../utils/multer'
import { uploadService } from '../services/upload.service'; // uploadService에서 메소드 가져오기

const router = express.Router();


router.post('/', uploads.array('files'), uploadService.upload);
router.get('/', uploadService.uploadRender);
export default router;