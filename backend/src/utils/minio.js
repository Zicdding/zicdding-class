// minioService.js
require('dotenv').config();
const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});

// 버킷 존재 여부 확인 후 버킷 생성
const ensureBucketExists = async (bucketName) => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`Bucket '${bucketName}' created successfully.`);
    } else {
      console.log(`Bucket '${bucketName}' already exists.`);
    }
  } catch (err) {
    console.error(`Error checking/creating bucket '${bucketName}':`, err);
    throw err;
  }
};

// 파일 업로드 함수
const uploadFileToMinIO = async (bucketName, files) => {
  try {
    const etags = [];
    await ensureBucketExists(bucketName);
    for (const file of files) {
      const etag = await minioClient.fPutObject(bucketName, file.originalname, file.path);
      console.log(`File '${file.originalname}' uploaded successfully with ETag: ${etag}`);
      etags.push(etag);
    }
    return etags;
  } catch (err) {
    console.error(`Error uploading file:`, err);
    throw err;
  }
};

export default uploadFileToMinIO;

