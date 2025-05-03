import { useState, useEffect, useMemo } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { MdSort } from "react-icons/md";

const products = [
  {
    id: 1,
    name: "Premium Pet Carrier",
    price: 89.99,
    category: "Travel",
    description: "Comfortable and durable pet carrier for safe transportation",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993"
  },
  {
    id: 2,
    name: "Automatic Pet Feeder",
    price: 129.99,
    category: "Electronics",
    description: "Smart feeding system with timer and portion control",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1"
  },
  {
    id: 3,
    name: "Luxury Pet Bed",
    price: 79.99,
    category: "Furniture",
    description: "Memory foam pet bed with washable cover",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0"
  },
  {
    id: 4,
    name: "Interactive Pet Toy",
    price: 34.99,
    category: "Toys",
    description: "Engaging toy for mental stimulation and exercise",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97"
  },
  {
    id: 5,
    name: "Pet Grooming Kit",
    price: 49.99,
    category: "Grooming",
    description: "Complete set of grooming tools for pets",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7"
  },
  {
    id: 6,
    name: "Organic Pet Food",
    price: 59.99,
    category: "Food",
    description: "Premium organic pet food for healthy nutrition",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119"
  }
];

const categories = ["All", "Food", "Toys", "Furniture", "Travel", "Electronics", "Grooming"];
const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price-asc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 mt-20">
      <div className="relative pb-[100%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">${product.price}</span>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <FiShoppingCart className="inline-block mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gray-200 h-64"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pet products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="relative">
              <select
                className="border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <MdSort className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">No pet products found</h2>
            <button
              className="mt-4 text-indigo-600 hover:text-indigo-700"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("price-asc");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;