const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
