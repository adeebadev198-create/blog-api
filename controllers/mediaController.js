const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }

        // Image buffer ko Cloudinary par upload karein
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'blog_images'
        });

        res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadImage };