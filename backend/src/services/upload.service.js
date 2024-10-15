// services/upload.service.js
import uploadFileToMinIO from '../utils/minio'; // MinIO 서비스 가져오기
import setResponseJson from '../utils/responseDto';

export const uploadService = {
  upload: async (req, res) => {
    const bucketName = 'file';
    try {
      const files = req.files;
      if (!Array.isArray(files)) {
        files = [files];
      }
      const etags = [];

      for (const file of files) {
        const etag = await uploadFileToMinIO(bucketName, file); // 각 파일을 업로드
        etags.push(etag); // 각 파일의 ETag를 배열에 저장
      }
      setResponseJson(res, 200, '성공', etags)
    } catch (error) {
      console.log(error)
      setResponseJson(res, 500, { message: 'File upload failed', error });
    }
  },
  uploadRender: (req, res) => {
    res.render('minioTest');
  }
};