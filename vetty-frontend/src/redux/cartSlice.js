import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    fetchCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addToCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    addToCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
