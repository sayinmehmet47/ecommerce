const Product = require('../models/Product');

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json({
      message: 'Product created successfully',
      product: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateUser = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) throw Error('User not found');
    res.status(200).json({
      msg: 'User deleted',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const user = await Product.findById(req.params.id);
    if (!user) throw Error('User not found');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//GET ALL PRODUCTS

const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
