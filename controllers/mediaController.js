const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }

        // Image ko Cloudinary par upload karein
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'blog_images'
        });

        // Frontend ko URL bhejein
        res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadImage };