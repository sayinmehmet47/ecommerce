const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', CardSchema);
