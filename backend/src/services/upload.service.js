// services/upload.service.js
import { uploadFileToMinIO } from '../utils/minio'; // MinIO 서비스 가져오기
import { uploads } from '../utils/multer';

import setResponseJson from '../utils/responseDto';

export const uploadService = {
  upload: async (req, res) => {
    const bucketName = 'zic';
    try {
      const files = req.files;
      const etags = [];
      for (const file of files) {
        const etag = await uploadFileToMinIO(bucketName, file); // 파일 업로드
        etags.push(etag);
      }
      setResponseJson(res, 200, '성공', etags)
    } catch (error) {
      res.status(500).json({ message: 'File upload failed', error });
    }
  },
  upload: (req, res) => {
    res.render('minioTest');
  }
};