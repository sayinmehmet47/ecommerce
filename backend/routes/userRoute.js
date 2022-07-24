const express = require('express');
const {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUsersStats,
} = require('../controllers/userController');

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/find/:id', verifyTokenAndAdmin, getUser);
router.get('/', verifyTokenAndAdmin, getAllUsers);
router.get('/stats', verifyTokenAndAdmin, getUsersStats);

module.exports = router;
