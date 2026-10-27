const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_h4rxwndg,
    api_key: process.env.CLOUDINARY_API_969138255158347,
    api_secret: process.env.CLOUDINARY_API_lpdR4wmKdpdhHUBqvWzSkIQUe34
});

module.exports = cloudinary;