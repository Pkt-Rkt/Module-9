const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const newPost = await Post.create({
      title,
      description,
      image,
    });

    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.likes += 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: 'Error liking post' });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ text });
    await post.save();

    res.json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error commenting on post' });
  }
};
