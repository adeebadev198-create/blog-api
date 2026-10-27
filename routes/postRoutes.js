const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:slug', getPostById);
router.post('/', createPost);

// Update aur Delete ke routes
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;