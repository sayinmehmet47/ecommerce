const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json({
      message: 'Order created successfully',
      order: saveOrder,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateOrder);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deleteOrder) throw Error('Order has been deleted ...');
    res.status(200).json({
      msg: 'User deleted',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const cart = await Order.findOne({ userId: req.params.userId });
    if (!cart) throw Error('Order not found');
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// //GET ALL OrderS

const getAllOrders = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//GET  INCOME INFO

const getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      { $group: { _id: '$month', total: { $sum: '$sales' } } },
    ]);

    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getIncome,
};
