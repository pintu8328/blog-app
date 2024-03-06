const Blog = require('../models/blog');
const Comment = require('../models/comment');

exports.addblog = async (req, res, next) => {
    try {
        const { title, author, content } = req.body;
        const blog = await Blog.create({
            title,
            author,
            content
        });
        
        res.status(201).send("blog added");
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send('Error adding blog');
    }
};

exports.getAllblogs = async (req, res, next) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Error fetching blogs');
    }
};



exports.addCommentToBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const { content } = req.body;

        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        const newComment = await blog.createComment({ content });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Error adding comment');
    }
};




exports.getAllCommentsOfBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        const comments = await blog.getComments();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Error fetching comments');
    }
};

exports.deleteCommentOfBlog = async (req, res, next) => {
    try {
        const { blogId, commentId } = req.params;

        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        const comment = await Comment.findOne({ where: { id: commentId, BlogId: blogId } });
        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        await comment.destroy();
        res.status(200).send('Comment deleted');
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Error deleting comment');
    }
};


