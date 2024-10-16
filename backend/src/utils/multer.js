import multer from 'multer';

//확장자 추출 후 이름 변경
const generatedFileName = (file) => {
  const originExt = file.originalname.split('.').pop();
  return `${file.fieldname}-${Date.now()}.${originExt}`
}

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "src/public/uploads/");
  },
  filename: (req, file, done) => {
    const changedName = generatedFileName(file)
    done(null, changedName);
  },
});

const uploads = multer({
  storage: storage,
});

export { uploads, generatedFileName };
