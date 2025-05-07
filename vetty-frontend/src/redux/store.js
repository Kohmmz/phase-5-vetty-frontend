import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

// Configure for Redux store
const store = configureStore({
  reducer: {
    products: productReducer,
    
  }
});

export default store;