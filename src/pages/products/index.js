import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductCard from '../../components/Products/ProductCard';
import SkeletonCard from '../../components/Common/SkeletonCard';
import { staggerContainer, fadeInUp } from '../../lib/motionVariants';
import { api } from '../../lib/api';
import { 
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('');
  const [windowWidth, setWindowWidth] = useState(1200); // Default width for SSR
  const [isMounted, setIsMounted] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc',
    inStock: false,
    onSale: false
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters, router.query]);

  // Set window width on client side
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const loadInitialData = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        api.get('/products/categories/list'),
        api.get('/products/brands/list')
      ]);
      
      setCategories(categoriesRes.data.categories || []);
      setBrands(brandsRes.data.brands || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      // Add router query params
      Object.entries(router.query).forEach(([key, value]) => {
        if (value && !filters[key]) {
          params.append(key, value);
        }
      });

      const response = await api.get(`/products?${params.toString()}`);
      
      setProducts(response.data.products || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
      order: 'desc',
      inStock: false,
      onSale: false
    });
    setActiveCategory('');
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sortOptions = [
    { value: 'createdAt:desc', label: 'Newest First' },
    { value: 'createdAt:asc', label: 'Oldest First' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'name:asc', label: 'Name: A to Z' },
    { value: 'name:desc', label: 'Name: Z to A' },
    { value: 'popularity:desc', label: 'Most Popular' },
  ];

  return (
    <>
      <Head>
        <title>Products - Hardware Tools Sri Lanka</title>
        <meta name="description" content="Browse our extensive collection of professional hardware tools, spare parts, and machinery essentials." />
      </Head>

      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-accent-500/5 rounded-full"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-24 h-24 bg-gray-300/20 rotate-45"
            animate={{
              rotate: [45, 225, 45],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-accent-500/10 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
          {/* Enhanced Background Pattern with Moving Elements */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '50px 50px']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Moving Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Tool Icons */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10 text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: Math.random() * 8 + 6,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              >
                {['🔧', '⚙️', '🔨', '🔩', '⚡', '🛠️', '🔪', '📏'][i % 8]}
              </motion.div>
            ))}

            {/* Moving Light Beams */}
            {isMounted && (
              <>
                <motion.div
                  className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
                  animate={{
                    x: [-200, windowWidth + 200],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: [windowWidth + 200, -200],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 3
                  }}
                />
              </>
            )}

            {/* Pulsing Circles */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-accent-500/20 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/10 rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeOut",
                delay: 2
              }}
            />

            {/* Floating Geometric Shapes */}
            <motion.div
              className="absolute top-20 right-20 w-32 h-32 border-2 border-accent-500/30 rotate-45"
              animate={{
                rotate: [45, 405],
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-full"
              animate={{
                x: [0, 30, 0],
                y: [0, -25, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          <div className="container mx-auto px-4 pt-20 pb-12 md:pt-24 md:pb-16 relative z-10">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Professional <span className="text-accent-500 relative">
                  Tools
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-accent-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover our extensive collection of 3000+ professional hardware tools, spare parts, and machinery essentials
              </motion.p>
              
              {/* Quick Stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {[
                  { number: '3000+', label: 'Products' },
                  { number: '50+', label: 'Brands' },
                  { number: '24/7', label: 'Support' }
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="text-2xl md:text-3xl font-bold text-accent-500 mb-1"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(229, 90, 43, 0.5)",
                          "0 0 15px rgba(229, 90, 43, 0.8)",
                          "0 0 5px rgba(229, 90, 43, 0.5)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
          {/* Category Quick Filters */}
          <motion.div 
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {[
                { name: 'All', subcategories: [] },
                { name: 'Power Tools', subcategories: ['Drills', 'Saws', 'Grinders', 'Sanders'] },
                { name: 'Hand Tools', subcategories: ['Wrenches', 'Screwdrivers', 'Pliers', 'Hammers'] },
                { name: 'Safety Equipment', subcategories: ['Helmets', 'Gloves', 'Goggles', 'Vests'] },
                { name: 'Measuring Tools', subcategories: ['Rulers', 'Levels', 'Calipers', 'Meters'] },
                { name: 'Storage', subcategories: ['Toolboxes', 'Cabinets', 'Organizers', 'Bags'] },
                { name: 'Welding', subcategories: ['Welders', 'Electrodes', 'Masks', 'Accessories'] }
              ].map((category, index) => (
                <div key={category.name} className="relative group">
                  <motion.button
                    onClick={() => {
                      setActiveCategory(category.name === 'All' ? '' : category.name);
                      handleFilterChange('category', category.name === 'All' ? '' : category.name);
                    }}
                    className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all border-2 ${
                      (category.name === 'All' && activeCategory === '') || activeCategory === category.name
                        ? 'bg-accent-500 text-white border-accent-500 shadow-lg' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-accent-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {category.name}
                    {category.subcategories.length > 0 && (
                      <ChevronDownIcon className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:rotate-180" />
                    )}
                  </motion.button>

                  {/* Subcategories Dropdown */}
                  {category.subcategories.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => {
                            setActiveCategory(subcategory);
                            handleFilterChange('category', subcategory);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-accent-50 hover:text-accent-600 transition-colors"
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Filters Sidebar */}
            <motion.div 
              className="lg:w-1/4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 shadow-sm w-full justify-center hover:border-accent-500 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  Advanced Filters
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>

              {/* Filters */}
              <AnimatePresence>
                <motion.div 
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%),
                      linear-gradient(90deg, transparent 0%, rgba(229, 90, 43, 0.03) 50%, transparent 100%)
                    `,
                    backgroundSize: '100% 100%, 200% 100%'
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <FunnelIcon className="w-5 h-5 text-accent-500" />
                      Filters
                    </h3>
                    <motion.button
                      onClick={clearFilters}
                      className="text-sm text-accent-500 hover:text-accent-600 font-medium px-3 py-1 rounded-full hover:bg-accent-50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All
                    </motion.button>
                  </div>

                {/* Search */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🔍 Search Products
                  </label>
                  <div className="relative group">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="Search by name, brand, or category..."
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </motion.div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Categories
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={filters.category === ''}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 font-medium">All Categories</span>
                    </label>
                    
                    {categories
                      .filter(cat => !cat.parentId) // Main categories only
                      .map(mainCategory => (
                        <div key={mainCategory._id} className="space-y-1">
                          {/* Main Category */}
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="category"
                              value={mainCategory._id}
                              checked={filters.category === mainCategory._id}
                              onChange={(e) => handleFilterChange('category', e.target.value)}
                              className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                            />
                            <span className="ml-2 text-sm text-gray-900 font-semibold">
                              {mainCategory.name}
                            </span>
                          </label>
                          
                          {/* Subcategories */}
                          {categories
                            .filter(cat => cat.parentId === mainCategory._id)
                            .map(subCategory => (
                              <label key={subCategory._id} className="flex items-center ml-4">
                                <input
                                  type="radio"
                                  name="category"
                                  value={subCategory._id}
                                  checked={filters.category === subCategory._id}
                                  onChange={(e) => handleFilterChange('category', e.target.value)}
                                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                  {subCategory.name}
                                </span>
                              </label>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Brand */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (LKR)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🏷️ Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-gray-50 focus:bg-white transition-all"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Price Range */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    💰 Price Range (LKR)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      placeholder="Min"
                      className="w-1/2 px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-gray-50 focus:bg-white transition-all"
                    />
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      placeholder="Max"
                      className="w-1/2 px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                </motion.div>

                {/* In Stock Only */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="rounded border-gray-300 text-accent-500 focus:ring-accent-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">📦 In Stock Only</span>
                  </label>
                </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Products Grid */}
            <motion.div 
              className="lg:w-3/4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Toolbar */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
                  {/* Results Info */}
                  <motion.div 
                    className="text-xs md:text-sm text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {pagination.totalProducts ? (
                      <span className="flex items-center gap-2">
                        📦 Showing <span className="text-accent-500 font-bold">{((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)}</span> of <span className="text-accent-500 font-bold">{pagination.totalProducts}</span> products
                      </span>
                    ) : (
                      'Loading products...'
                    )}
                  </motion.div>
                  
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    {/* Offers Toggle */}
                    <motion.button
                      onClick={() => handleFilterChange('onSale', !filters.onSale)}
                      className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all border-2 ${
                        filters.onSale
                          ? 'bg-red-500 text-white border-red-500 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-red-500 hover:text-red-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm md:text-lg">🔥</span>
                      <span className="hidden sm:inline">Offers Only</span>
                      <span className="sm:hidden">Offers</span>
                    </motion.button>

                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 md:p-2 rounded-md transition-all ${
                          viewMode === 'grid' 
                            ? 'bg-white text-accent-500 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Squares2X2Icon className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 md:p-2 rounded-md transition-all ${
                          viewMode === 'list' 
                            ? 'bg-white text-accent-500 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <ListBulletIcon className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1 md:gap-2">
                      <label className="text-xs md:text-sm text-gray-600 font-medium hidden sm:inline">Sort:</label>
                      <select
                        value={`${filters.sort}:${filters.order}`}
                        onChange={(e) => {
                          const [sort, order] = e.target.value.split(':');
                          handleFilterChange('sort', sort);
                          handleFilterChange('order', order);
                        }}
                        className="px-2 md:px-3 py-1.5 md:py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-gray-50 text-xs md:text-sm font-medium"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className={`grid gap-3 md:gap-6 mb-6 md:mb-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}
              >
                {loading ? (
                  Array.from({ length: 12 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <SkeletonCard />
                    </motion.div>
                  ))
                ) : products.length > 0 ? (
                  products.map((product, index) => (
                    <motion.div 
                      key={product._id} 
                      variants={fadeInUp}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto">
                      <div className="text-gray-300 mb-6">
                        <MagnifyingGlassIcon className="w-20 h-20 mx-auto" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        No products found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                      </p>
                      <motion.button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-all font-semibold shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear All Filters
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg border ${
                          page === pagination.currentPage
                            ? 'bg-brand-500 text-white border-brand-500'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}