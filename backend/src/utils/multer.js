// multerConfig.js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "src/public/uploads");
  },
  filename: (req, file, done) => {
    const originalExtension = file.originalname.split(".").pop(); // 원본 파일의 확장자 추출
    done(null, file.fieldname + "-" + Date.now() + "." + originalExtension);
  },
});

const uploads = multer({ storage: storage });
export default uploads;
