const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');
  const isMatch = await user.isValidPassword(password);
  if (!isMatch) return res.status(400).send('Invalid email or password');
  const token = createToken(user._id);
  res.status(200).json({ token });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).send('User already exists');
  const newUser = new User({ email, password });
  await newUser.save();
  const token = createToken(newUser._id);
  res.status(200).json({ token });
};

module.exports = { loginUser, registerUser };
