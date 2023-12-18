const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * path:
 *   /posts:
 *     post:
 *       summary: Create a new post
 *       tags: [Posts]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostInput' # Define your PostInput schema
 *       responses:
 *         '201':
 *           description: Post created successfully
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 */
router.post('/', postController.createPost);

/**
 * @swagger
 * path:
 *   /posts/{postId}/like:
 *     post:
 *       summary: Like a post
 *       tags: [Posts]
 *       parameters:
 *         - name: postId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Post liked successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Post not found
 *         '500':
 *           description: Internal server error
 */
router.post('/:postId/like', postController.likePost);

/**
 * @swagger
 * path:
 *   /posts/{postId}/comment:
 *     post:
 *       summary: Comment on a post
 *       tags: [Posts]
 *       parameters:
 *         - name: postId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentInput' # Define your CommentInput schema
 *       responses:
 *         '201':
 *           description: Comment added successfully
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Post not found
 *         '500':
 *           description: Internal server error
 */
router.post('/:postId/comment', postController.commentPost);

module.exports = router;
