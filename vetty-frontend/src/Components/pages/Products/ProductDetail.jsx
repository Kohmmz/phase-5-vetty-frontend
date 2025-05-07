import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

import { 
  fetchProductById,
  selectProductById,
  selectProductsStatus,
  selectProductsError
} from '../../../redux/productSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Get product data from Redux store
  const product = useSelector(selectProductById);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  
  // Local state for quantity
  const [quantity, setQuantity] = useState(1);
  
  // Loading state based on Redux status
  const loading = status === 'loading';

  // Fetch product when component mounts or ID changes
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="animate-pulse max-w-4xl w-full">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-gray-200 h-96 w-full md:w-1/2 rounded-lg"></div>
            <div className="w-full md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-24 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800 flex items-center justify-center">
            <FiArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // If product is not loaded yet, show nothing
  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <div className="relative pb-[100%] md:pb-0 md:h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover md:absolute"
                  onError={(e) => {
                    console.error(`Failed to load image for ${product.name}`);
                    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                  }}
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="text-sm text-gray-500 mb-4">Category: {product.category}</div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="text-2xl font-bold text-indigo-600 mb-6">${product.price.toFixed(2)}</div>
              
              <div className="flex items-center mb-6">
                <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;