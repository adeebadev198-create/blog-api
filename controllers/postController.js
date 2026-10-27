const Post = require('../models/Post');

// Naya blog create karein
const createPost = async (req, res) => {
    try {
        const { title, slug, content, image, category } = req.body;

        const post = await Post.create({
            title,
            slug: slug || title.toLowerCase().replace(/ /g, '-'),
            content,
            image,
            category,
            author: req.body.author || "65f1a2b3c4d5e6f7a8b9c0d1",
            isPublished: true
        });

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Saare blogs fetch karein
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ek blog ID/slug se fetch karein
const getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Blog Update Karein (Naya add kiya)
const updatePost = async (req, res) => {
    try {
        const { title, content, image, category } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.title = title || post.title;
        post.content = content || post.content;
        post.image = image || post.image;
        post.category = category || post.category;

        const updatedPost = await post.save();
        res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Blog Delete Karein (Naya add kiya)
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };