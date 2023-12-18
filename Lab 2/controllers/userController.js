const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = await User.create({ username });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};
