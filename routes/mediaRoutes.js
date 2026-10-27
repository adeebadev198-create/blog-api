const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/mediaController');

const upload = multer({ storage: multer.memoryStorage() }); // Memory storage

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;