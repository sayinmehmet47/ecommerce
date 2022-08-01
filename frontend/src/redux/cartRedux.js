import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { quantity, color, size } = action.payload;
      const productExists = state.products.find(
        (p) =>
          p.id === action.payload.id && p.color === color && p.size === size
      );
      if (productExists) {
        productExists.quantity += quantity;
      } else {
        state.products.push({
          ...action.payload,
        });
      }
      state.quantity += quantity;
      state.total += action.payload.price * quantity;
    },
  },
});

export default cartSlice.reducer;
export const { addProduct } = cartSlice.actions;
