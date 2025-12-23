import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Hero from '../components/Hero/Hero';
import ProductCard from '../components/Products/ProductCard';
import SkeletonCard from '../components/Common/SkeletonCard';
import { staggerContainer, fadeInUp } from '../lib/motionVariants';
import { api } from '../lib/api';
import { 
  WrenchScrewdriverIcon,
  BoltIcon,
  CogIcon,
  ShieldCheckIcon,
  TruckIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products?featured=true&limit=8'),
        api.get('/categories?limit=6')
      ]);
      
      setFeaturedProducts(productsRes.data.products || []);
      setCategories(categoriesRes.data.categories || []);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: WrenchScrewdriverIcon,
      title: 'Professional Grade',
      description: 'High-quality tools built for professional use and durability.'
    },
    {
      icon: BoltIcon,
      title: '3000+ Products',
      description: 'Extensive inventory of tools, spare parts, and machinery.'
    },
    {
      icon: CogIcon,
      title: 'Expert Support',
      description: '24/7 technical support from our experienced team.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Guarantee',
      description: 'All products come with manufacturer warranty and quality assurance.'
    },
    {
      icon: TruckIcon,
      title: 'Island-wide Delivery',
      description: 'Fast and reliable delivery across Sri Lanka within 2-5 days.'
    },
    {
      icon: PhoneIcon,
      title: 'Real-time Chat',
      description: 'Instant support through our live chat system.'
    }
  ];

  return (
    <>
      <Head>
        <title>Hardware Tools Sri Lanka - Professional Grade Tools & Spare Parts</title>
        <meta name="description" content="Sri Lanka's premier destination for professional hardware tools, spare parts, and machinery essentials. Quality products with reliable service since 2020." />
      </Head>

      {/* Hero Section */}
      <Hero />

      {/* Hot Deals Section */}
      <section className="py-12 md:py-16 bg-gray-200 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-16 md:w-24 h-16 md:h-24 bg-accent-500/25 rounded-full shadow-lg"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-12 md:w-20 h-12 md:h-20 bg-gradient-to-br from-accent-500/30 to-accent-600/20 rotate-45 shadow-md"
            animate={{
              rotate: [45, 225, 45],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-10 md:w-16 h-10 md:h-16 bg-gray-400/40 rounded-full shadow-sm"
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/3 w-20 md:w-28 h-20 md:h-28 border-3 border-accent-500/40 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* More Prominent Moving Elements */}
          <motion.div
            className="absolute w-2 md:w-3 h-2 md:h-3 bg-accent-500/50 rounded-full shadow-sm"
            animate={{
              x: [-50, 1200],
              y: [-50, 100]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-500/60 rounded-full"
            animate={{
              x: [1200, -50],
              y: [100, -30]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: 3
            }}
          />
          
          {/* Additional Floating Elements */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 md:w-6 h-4 md:h-6 bg-accent-500/20 rotate-45"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-16 right-1/4 w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-accent-500/30 to-transparent"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
            >
              🔥 Hot Deals
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4"
            >
              Limited time offers on professional tools with exclusive discounts
            </motion.p>
          </motion.div>

          {/* Hot Deals Grid - Mobile Responsive */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
          >
            {/* Deal 1 - Power Washer */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Left Side - Product Image */}
                <div className="sm:w-2/5 p-4 md:p-5 relative">
                  {/* Scissors Icon */}
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 text-gray-400">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                    </svg>
                  </div>
                  
                  {/* Hot Item Badge */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 w-10 h-10 md:w-12 md:h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-bold text-center leading-tight">
                      HOT<br />ITEM
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center items-center h-20 md:h-28 mt-4 md:mt-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                      <div className="text-2xl md:text-3xl">🚿</div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Product Info */}
                <div className="sm:w-3/5 p-4 md:p-5 flex flex-col justify-center">
                  {/* Discount Badge */}
                  <div className="flex justify-end mb-2">
                    <span className="text-accent-500 font-bold text-sm md:text-base">Save 20%</span>
                    <div className="w-8 md:w-12 h-0.5 bg-accent-500 ml-2 mt-2 md:mt-2.5"></div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    10-Bar Power Jet Steam Washer
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    On the purchase of any three (3) jet steam
                  </p>

                  {/* Free Bonus */}
                  <div className="text-xs text-gray-500">
                    Free portable coupons
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deal 2 - Drill Set */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Left Side - Product Image */}
                <div className="sm:w-2/5 p-4 md:p-5 relative">
                  {/* Scissors Icon */}
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 text-gray-400">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                    </svg>
                  </div>
                  
                  {/* Hot Item Badge */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 w-10 h-10 md:w-12 md:h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-bold text-center leading-tight">
                      HOT<br />ITEM
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center items-center h-20 md:h-28 mt-4 md:mt-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                      <div className="text-2xl md:text-3xl">🔧</div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Product Info */}
                <div className="sm:w-3/5 p-4 md:p-5 flex flex-col justify-center">
                  {/* Discount Badge */}
                  <div className="flex justify-end mb-2">
                    <span className="text-accent-500 font-bold text-sm md:text-base">Save 25%</span>
                    <div className="w-8 md:w-12 h-0.5 bg-accent-500 ml-2 mt-2 md:mt-2.5"></div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    Professional Drill Set 18V Lithium
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    Complete drill set with 2 batteries and fast charger
                  </p>

                  {/* Free Bonus */}
                  <div className="text-xs text-gray-500">
                    Free carrying case included
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deal 3 - Welding Helmet */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Left Side - Product Image */}
                <div className="sm:w-2/5 p-4 md:p-5 relative">
                  {/* Scissors Icon */}
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 text-gray-400">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                    </svg>
                  </div>
                  
                  {/* Hot Item Badge */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 w-10 h-10 md:w-12 md:h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-bold text-center leading-tight">
                      HOT<br />ITEM
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center items-center h-20 md:h-28 mt-4 md:mt-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                      <div className="text-2xl md:text-3xl">🥽</div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Product Info */}
                <div className="sm:w-3/5 p-4 md:p-5 flex flex-col justify-center">
                  {/* Discount Badge */}
                  <div className="flex justify-end mb-2">
                    <span className="text-accent-500 font-bold text-sm md:text-base">Save 15%</span>
                    <div className="w-8 md:w-12 h-0.5 bg-accent-500 ml-2 mt-2 md:mt-2.5"></div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    Auto-Darkening Welding Helmet Pro
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    Professional welding helmet with auto-darkening filter
                  </p>

                  {/* Free Bonus */}
                  <div className="text-xs text-gray-500">
                    Free replacement filters included
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deal 4 - Angle Grinder */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Left Side - Product Image */}
                <div className="sm:w-2/5 p-4 md:p-5 relative">
                  {/* Scissors Icon */}
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 text-gray-400">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                    </svg>
                  </div>
                  
                  {/* Hot Item Badge */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 w-10 h-10 md:w-12 md:h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-bold text-center leading-tight">
                      HOT<br />ITEM
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center items-center h-20 md:h-28 mt-4 md:mt-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                      <div className="text-2xl md:text-3xl">⚙️</div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Product Info */}
                <div className="sm:w-3/5 p-4 md:p-5 flex flex-col justify-center">
                  {/* Discount Badge */}
                  <div className="flex justify-end mb-2">
                    <span className="text-accent-500 font-bold text-sm md:text-base">Save 30%</span>
                    <div className="w-8 md:w-12 h-0.5 bg-accent-500 ml-2 mt-2 md:mt-2.5"></div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    Heavy Duty Angle Grinder 850W
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    Professional grade 115mm angle grinder with accessories
                  </p>

                  {/* Free Bonus */}
                  <div className="text-xs text-gray-500">
                    Free cutting discs included
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* View All Deals Button */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-12"
          >
            <Link
              href="/products?deals=true"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-all font-medium text-sm shadow-lg hover:shadow-xl"
            >
              View All Hot Deals
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Tools and Services Section */}
      <section className="py-16 md:py-20 bg-gray-200 relative overflow-hidden">
        {/* Animated Wave Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Enhanced Wave Patterns */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              className="absolute top-10 w-full h-2 bg-gradient-to-r from-transparent via-accent-500/40 to-transparent shadow-sm"
              animate={{
                x: [-200, 1400]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute top-32 w-full h-1 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"
              animate={{
                x: [1400, -200]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-20 w-full h-2 bg-gradient-to-r from-transparent via-accent-500/30 to-transparent shadow-sm"
              animate={{
                x: [-300, 1500]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute top-1/2 w-full h-1 bg-gradient-to-r from-transparent via-gray-300/60 to-transparent"
              animate={{
                x: [1200, -300]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
            />
          </div>

          {/* Enhanced Pulsing Rings */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-accent-500/40 rounded-full"
            animate={{
              scale: [1, 2.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-32 h-32 border-2 border-gray-400/50 rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/2 w-20 h-20 border border-accent-500/30 rounded-full"
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.4, 0, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1
            }}
          />

          {/* Enhanced Floating Tool Icons */}
          <motion.div
            className="absolute top-16 right-16 text-4xl opacity-40 filter drop-shadow-sm"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🔧
          </motion.div>
          <motion.div
            className="absolute bottom-24 left-20 text-3xl opacity-35 filter drop-shadow-sm"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -15, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ⚙️
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/3 text-2xl opacity-45 filter drop-shadow-sm"
            animate={{
              y: [0, -10, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            🔩
          </motion.div>
          <motion.div
            className="absolute bottom-1/2 left-1/3 text-2xl opacity-30 filter drop-shadow-sm"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 20, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            🔨
          </motion.div>

          {/* Additional Geometric Elements */}
          <motion.div
            className="absolute top-20 left-1/3 w-12 h-12 bg-accent-500/25 rotate-45"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 right-20 w-16 h-16 bg-gray-400/30 rounded-full"
            animate={{
              y: [0, -25, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            >
              Our Tools and Services
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4"
            >
              Professional Grade Equipment for Every Need
            </motion.p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-4"
          >
            {['Power Tools', 'Hand Tools', 'Safety Equipment', 'Measuring Tools', 'Storage', 'Spare Parts', 'Welding', 'Electrical'].map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(index)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all border-2 ${
                  activeCategory === index 
                    ? 'bg-accent-500 text-white shadow-md border-accent-500' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-accent-500'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Product Showcase */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-10"
          >
            {/* Professional Drill Set */}
            <motion.div 
              variants={fadeInUp} 
              className="group rounded-lg md:rounded-xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%),
                  linear-gradient(90deg, transparent 0%, rgba(229, 90, 43, 0.05) 50%, transparent 100%)
                `,
                backgroundSize: '100% 100%, 200% 100%',
                animation: 'shimmer 4s ease-in-out infinite'
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 40px rgba(229, 90, 43, 0.15)'
              }}
            >
              {/* Shimmer Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="aspect-[4/3] bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-md md:rounded-lg mb-2 md:mb-4 flex items-center justify-center group-hover:from-accent-500/30 group-hover:to-accent-600/20 transition-all duration-300">
                  <div className="text-center text-accent-600">
                    <div className="text-xl md:text-3xl mb-1 md:mb-2">🔧</div>
                    <p className="text-xs font-medium">Power Drill</p>
                  </div>
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-accent-600 transition-colors">Professional Drill Set 18V</h3>
                <div className="space-y-0.5 md:space-y-1 text-xs text-gray-600 mb-2 md:mb-4">
                  <p>Voltage: 18V Lithium-Ion</p>
                  <p>Max Torque: 65 Nm</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Starting at</p>
                    <p className="text-sm md:text-lg font-bold text-gray-900">LKR 22,500</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Angle Grinder */}
            <motion.div 
              variants={fadeInUp} 
              className="group rounded-lg md:rounded-xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%),
                  linear-gradient(90deg, transparent 0%, rgba(229, 90, 43, 0.05) 50%, transparent 100%)
                `,
                backgroundSize: '100% 100%, 200% 100%',
                animation: 'shimmer 4s ease-in-out infinite 1s'
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 40px rgba(229, 90, 43, 0.15)'
              }}
            >
              {/* Shimmer Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="aspect-[4/3] bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-md md:rounded-lg mb-2 md:mb-4 flex items-center justify-center group-hover:from-accent-500/30 group-hover:to-accent-600/20 transition-all duration-300">
                  <div className="text-center text-accent-600">
                    <div className="text-xl md:text-3xl mb-1 md:mb-2">⚙️</div>
                    <p className="text-xs font-medium">Angle Grinder</p>
                  </div>
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-accent-600 transition-colors">Angle Grinder 115mm</h3>
                <div className="space-y-0.5 md:space-y-1 text-xs text-gray-600 mb-2 md:mb-4">
                  <p>Disc Size: 115mm</p>
                  <p>Power: 850W Motor</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Starting at</p>
                    <p className="text-sm md:text-lg font-bold text-gray-900">LKR 18,000</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Socket Set */}
            <motion.div 
              variants={fadeInUp} 
              className="group rounded-lg md:rounded-xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%),
                  linear-gradient(90deg, transparent 0%, rgba(229, 90, 43, 0.05) 50%, transparent 100%)
                `,
                backgroundSize: '100% 100%, 200% 100%',
                animation: 'shimmer 4s ease-in-out infinite 2s'
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 40px rgba(229, 90, 43, 0.15)'
              }}
            >
              {/* Shimmer Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="aspect-[4/3] bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-md md:rounded-lg mb-2 md:mb-4 flex items-center justify-center group-hover:from-accent-500/30 group-hover:to-accent-600/20 transition-all duration-300">
                  <div className="text-center text-accent-600">
                    <div className="text-xl md:text-3xl mb-1 md:mb-2">🔩</div>
                    <p className="text-xs font-medium">Socket Set</p>
                  </div>
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-accent-600 transition-colors">Socket Set 42 Pieces</h3>
                <div className="space-y-0.5 md:space-y-1 text-xs text-gray-600 mb-2 md:mb-4">
                  <p>Pieces: 42 Complete Set</p>
                  <p>Material: Chrome Vanadium</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Starting at</p>
                    <p className="text-sm md:text-lg font-bold text-gray-900">LKR 10,800</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Welding Helmet */}
            <motion.div 
              variants={fadeInUp} 
              className="group rounded-lg md:rounded-xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%),
                  linear-gradient(90deg, transparent 0%, rgba(229, 90, 43, 0.05) 50%, transparent 100%)
                `,
                backgroundSize: '100% 100%, 200% 100%',
                animation: 'shimmer 4s ease-in-out infinite 3s'
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 40px rgba(229, 90, 43, 0.15)'
              }}
            >
              {/* Shimmer Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="aspect-[4/3] bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-md md:rounded-lg mb-2 md:mb-4 flex items-center justify-center group-hover:from-accent-500/30 group-hover:to-accent-600/20 transition-all duration-300">
                  <div className="text-center text-accent-600">
                    <div className="text-xl md:text-3xl mb-1 md:mb-2">🥽</div>
                    <p className="text-xs font-medium">Welding Helmet</p>
                  </div>
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-accent-600 transition-colors">Auto-Darkening Welding Helmet</h3>
                <div className="space-y-0.5 md:space-y-1 text-xs text-gray-600 mb-2 md:mb-4">
                  <p>Type: Auto-Darkening</p>
                  <p>Protection: UV/IR Filter</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Starting at</p>
                    <p className="text-sm md:text-lg font-bold text-gray-900">LKR 35,000</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Show All Products Button */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-accent-500 text-accent-500 rounded-full hover:bg-accent-500 hover:text-white transition-all font-medium text-sm"
            >
              Show all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 md:w-40 h-32 md:h-40 bg-accent-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 md:w-60 h-48 md:h-60 bg-accent-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4"
            >
              Why Choose Hardware Tools?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4"
            >
              We're committed to providing Sri Lankan professionals with the best tools 
              and service in the industry.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:border-accent-500/50 transition-all duration-500 relative overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(55, 65, 81, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%),
                    linear-gradient(90deg, transparent 0%, rgba(229, 90, 43, 0.1) 50%, transparent 100%)
                  `,
                  backgroundSize: '100% 100%, 200% 100%',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(229, 90, 43, 0.3)'
                }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{
                       background: 'linear-gradient(135deg, rgba(229, 90, 43, 0.1) 0%, transparent 50%, rgba(229, 90, 43, 0.1) 100%)',
                       animation: 'glow 2s ease-in-out infinite alternate'
                     }}
                />

                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 25px rgba(229, 90, 43, 0.6)'
                    }}
                  >
                    <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 group-hover:text-accent-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Shimmer Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden"
          >
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
              <motion.div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '30px 30px']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </div>

            {/* Floating Geometric Elements */}
            <motion.div
              className="absolute top-8 md:top-12 left-8 md:left-12 w-12 md:w-16 h-12 md:h-16 border-2 border-white/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute bottom-8 md:bottom-12 right-8 md:right-12 w-16 md:w-20 h-16 md:h-20 border-2 border-accent-500/30 rotate-45"
              animate={{
                rotate: [45, 405],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute top-1/2 left-12 md:left-16 w-8 md:w-12 h-8 md:h-12 bg-accent-500/20 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Main Content */}
            <div className="relative z-20">
              <motion.h2 
                variants={fadeInUp}
                className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              >
                Unlock Superior Performance<br />
                <span className="text-white">for Your Machinery Needs</span>
              </motion.h2>
              
              <motion.div 
                variants={fadeInUp}
                className="mb-6 md:mb-8"
              >
                <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto mb-2 px-4">
                  Experience unmatched reliability and durability with our top-tier heavy machinery solutions.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto px-4">
                  From construction to industrial projects, we ensure optimal performance and longevity.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
              >
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-all font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Contact Us
                  <svg 
                    className="w-4 h-4 md:w-5 md:h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}