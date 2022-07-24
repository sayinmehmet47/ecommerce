const Card = require('../models/Card');

const createCard = async (req, res) => {
  const newCard = new Card(req.body);
  try {
    const saveCard = await newCard.save();
    res.status(200).json({
      message: 'Card created successfully',
      Card: saveCard,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateCard = async (req, res) => {
  try {
    const updateCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateCard);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const deleteCard = await Card.findByIdAndDelete(req.params.id);
    if (!deleteCard) throw Error('User not found');
    res.status(200).json({
      msg: 'User deleted',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getCard = async (req, res) => {
  try {
    const cart = await Card.findOne({ userId: req.params.userId });
    if (!cart) throw Error('Card not found');
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// //GET ALL CardS

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createCard,
  updateCard,
  deleteCard,
  getCard,
  getAllCards,
};
