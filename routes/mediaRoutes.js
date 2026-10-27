const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/mediaController');

// Multer setup (temporary storage)
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;