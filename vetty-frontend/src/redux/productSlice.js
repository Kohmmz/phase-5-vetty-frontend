import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axios from 'axios';

  
// fetching all products with images from backend
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products`);
      // Map image_url to image for frontend compatibility
      const products = response.data.map(product => ({
        ...product,
        image: product.image_url
      }));
      return products;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

// fetching a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

// Initial state
const initialState = {
  products: [],
  product: null,
  categories: ['All'],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedCategory: 'All',
  searchTerm: '',
  sortBy: 'price-asc',
  token: null,
  isLoggedIn: false
};

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = 'All';
      state.searchTerm = '';
      state.sortBy = 'price-asc';
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        // Extract unique categories from products
        const uniqueCategories = [...new Set(action.payload.map(product => product.category))];
        state.categories = ['All', ...uniqueCategories];
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Sorry, no products found. Please try again later.';
        // Provide fallback data when the API fails
        state.products = [
          {
            id: 1,
            name: 'Product 1',
            description: 'This is product 1',
            price: 10.99,
            category: 'Category 1',
            image: 'https://example.com/product1.jpg'
          },
          {
            id: 2,
            name: 'Product 2',
            description: 'This is product 2',
            price: 9.99,
            category: 'Category 2',
            image: 'https://example.com/product2.jpg'
          },
          {
            id: 3,
            name: 'Product 3',
            description: 'This is product 3',
            price: 12.99,
            category: 'Category 3',
            image: 'https://example.com/product3.jpg'
          }
        ];
        state.categories = ['All', 'Category 1', 'Category 2', 'Category 3'];
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
        state.error = null;
      })
    .addCase(fetchProductById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = 'Sorry, product not found. Please try another product.';
      state.product = null;
    });
  }
});

// Export actions
export const {
  setSelectedCategory,
  setSearchTerm,
  setSortBy,
  resetFilters,
  setToken,
  logout
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state) => state.products.product;
export const selectCategories = (state) => state.products.categories;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectSortBy = (state) => state.products.sortBy;
export const selectToken = (state) => state.products.token;
export const selectIsLoggedIn = (state) => state.products.isLoggedIn;

// Memoized selector for filtered and sorted products
export const selectFilteredAndSortedProducts = createSelector(
  [
    (state) => state.products.products,
    (state) => state.products.selectedCategory,
    (state) => state.products.searchTerm,
    (state) => state.products.sortBy
  ],
  (products, selectedCategory, searchTerm, sortBy) => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }
);

export default productSlice.reducer;