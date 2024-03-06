const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

router.post('/', blogController.addblog);
router.get('/', blogController.getAllblogs);
router.post('/:blogId/comments', blogController.addCommentToBlog);
router.get('/:blogId/comments', blogController.getAllCommentsOfBlog);
router.delete('/:blogId/comments/:commentId', blogController.deleteCommentOfBlog);

module.exports = router;
