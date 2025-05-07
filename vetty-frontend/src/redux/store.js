// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import errorReducer from './errorSlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer,
        products: productReducer,
    },
});

export default store;