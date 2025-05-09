import axios from 'axios';
import {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
} from './cartSlice';

// Fetch current user's cart
export const fetchCart = () => async (dispatch) => {
  dispatch(fetchCartStart());
  try {
    const response = await axios.get('/cart');
    dispatch(fetchCartSuccess(response.data));
  } catch (error) {
    dispatch(fetchCartFailure(error.message));
  }
};

// Add a service to the cart
export const addToCart = (serviceId) => async (dispatch) => {
  dispatch(addToCartStart());
  try {
    // Assuming the backend API supports adding items to cart via POST /cart/items or similar
    // Adjust the endpoint and payload as per backend API
    const response = await axios.post('/cart/items', { service_id: serviceId });
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartFailure(error.message));
  }
};
