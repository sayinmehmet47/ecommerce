const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Incorrect password');
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      msg: 'Please enter all fields',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      username,
      email,
      password: hash,
      isAdmin,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
        },
      },
      { new: true }
    );
    if (!updateUser) throw Error('User not found');
    res.status(200).json({
      msg: 'User updated',
      user: {
        id: updateUser.id,
        username: updateUser.username,
        email: updateUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) throw Error('User not found');
    res.status(200).json({
      msg: 'User deleted',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error('User not found');
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { loginUser, registerUser, updateUser, deleteUser, getUser };
