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

// Saare blogs fetch karein (Pagination + Filters ke sath)
const getPosts = async (req, res) => {
    try {
        // 1. Query parameters se page, limit, search aur category nikalna
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6; // Ek page par 6 blogs
        const skip = (page - 1) * limit;
        
        const { search, category } = req.query;

        // 2. Filter object banana
        let filter = {};
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (search) {
            filter.title = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        // 3. Database se data fetch karna
        const totalPosts = await Post.countDocuments(filter);
        const posts = await Post.find(filter)
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit)
            .populate('author', 'name');

        // 4. Response bhejna
        res.status(200).json({
            posts: posts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            totalPosts: totalPosts
        });
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

// Blog Update Karein
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

// Blog Delete Karein
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