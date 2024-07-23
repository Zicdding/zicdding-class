const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const uploadService = require('../services/upload.service');

router.post('/', upload.single('file'), uploadService.upload);

module.exports = router;
