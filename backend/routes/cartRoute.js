const express = require('express');
const {
  createCard,
  updateCard,
  deleteCard,
  getCard,
  getAllCards,
} = require('../controllers/cardsController');

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = express.Router();

router.post('/', verifyToken, createCard);
router.put('/:id', verifyTokenAndAuthorization, updateCard);
router.delete('/:id', verifyTokenAndAuthorization, deleteCard);
router.get('/find/:userId', verifyTokenAndAuthorization, getCard);
router.get('/', verifyTokenAndAdmin, getAllCards);

module.exports = router;
