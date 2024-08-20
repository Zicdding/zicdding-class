import express from 'express';
const router = express.Router();
import upload from '../utils/multer';
import { uploadService } from '../services/upload.service';

router.post('/', upload.single('file'), uploadService.upload);

export default uploadService;
