const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *   /users:
 *     post:
 *       summary: Create a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput' # Define your UserInput schema
 *       responses:
 *         '201':
 *           description: User created successfully
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 */
router.post('/', userController.createUser);

module.exports = router;
