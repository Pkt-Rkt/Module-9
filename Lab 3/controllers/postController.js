// controllers/postController.js
const { Post } = require('../models');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { title, description, image } = req.body;
      const post = await Post.create({ title, description, image });
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
