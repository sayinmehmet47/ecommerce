const express = require('express');
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getIncome,
} = require('../controllers/ordersController');

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.put('/:id', verifyTokenAndAdmin, updateOrder);
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);
router.get('/find/:userId', verifyTokenAndAuthorization, getOrder);
router.get('/', verifyTokenAndAdmin, getAllOrders);
router.get('/income', verifyTokenAndAdmin, getIncome);
module.exports = router;
