const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    products: [
      {
        productId: {
          type: String,
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
