require('dotenv').config();
const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: '121.152.79.226',
  port: parseInt(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});

const ensureBucketExists = async (bucketName) => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`Bucket '${bucketName}' 버킷 생성 완료`);
    } else {
      console.log(`Bucket '${bucketName}' 이미 생성된 버킷.`);
    }
  } catch (err) {
    console.error(`Error checking/creating bucket '${bucketName}':`, err);
    throw err;
  }
};
//파일명 ENCODED 특수문자때문에 깨짐
const encodeFileName = (fileName) => {
  return encodeURIComponent(fileName);
};

const uploadFileToMinIO = async (bucketName, files, objName) => {
  try {
    const etags = [];
    await ensureBucketExists(bucketName);
    if (!Array.isArray(files)) {
      files = [files];
    }
    for (const file of files) {
      const encodedName = encodeFileName(file.filename);
      const insertObjName = `${objName}/${encodedName}`;
      const etag = await minioClient.fPutObject(bucketName, insertObjName, file.path);
      console.log(`File : '${file.filename}' minIO 파일 업로드 성공 ETag: ${etag}`);
      etags.push(etag);
    }
    return etags;
  } catch (err) {
    console.error(`minIO 파일 업로드 실패`, err);
    throw err;
  }
};

const deleteFileFromMinIo = async (bucketName, objName) => {
  try {
    await minioClient.removeObject(bucketName, objName);
    console.log(`삭제 정공${objName}`)
  } catch (err) {
    console.error(`minIO 파일 삭제 실패 '${objName}' from bucket '${bucketName}':`, err);
    throw err;
  }
}
export { uploadFileToMinIO, encodeFileName, deleteFileFromMinIo };

