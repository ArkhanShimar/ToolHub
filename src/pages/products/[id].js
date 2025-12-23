import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  HeartIcon, 
  ShoppingCartIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
  CubeIcon,
  BuildingStorefrontIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../lib/api';
import ProductCard from '../../components/Products/ProductCard';
import PlaceholderImage from '../../components/Common/PlaceholderImage';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showImageModal, setShowImageModal] = useState(false);


  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      
      // Hardcoded comprehensive product for testing
      if (id === 'bosch-professional-drill-gsb-18v-85c') {
        const hardcodedProduct = {
          _id: 'bosch-professional-drill-gsb-18v-85c',
          name: 'Bosch Professional GSB 18V-85 C Cordless Combi Drill',
          slug: 'bosch-professional-drill-gsb-18v-85c',
          sku: 'BSH-GSB18V85C-001',
          brand: 'Bosch Professional',
          price: 45000,
          salePrice: 38250,
          stockQty: 12,
          unit: 'pcs',
          images: [
            '/assets/products/bosch-drill-main.jpg',
            '/assets/products/bosch-drill-side.jpg',
            '/assets/products/bosch-drill-accessories.jpg',
            '/assets/products/bosch-drill-battery.jpg'
          ],
          description: 'The Bosch Professional GSB 18V-85 C is a powerful cordless combi drill designed for professional use. Features brushless motor technology for maximum efficiency and longer runtime. Perfect for drilling in wood, metal, masonry, and driving screws.',
          longDescription: 'This professional-grade cordless combi drill combines power, precision, and durability in one compact tool. The brushless EC motor delivers up to 85 Nm of torque, making it ideal for demanding applications. The intelligent Electronic Cell Protection (ECP) protects the battery against overload, overheating, and deep discharge.',
          categoryId: { _id: 'cat1', name: 'Power Tools', slug: 'power-tools' },
          subcategoryId: { _id: 'subcat1', name: 'Cordless Drills', slug: 'cordless-drills' },
          
          // Dynamic attributes as per your requirements
          attributes: [
            { name: 'Power', value: '18V', unit: 'V' },
            { name: 'Max Torque', value: '85', unit: 'Nm' },
            { name: 'Chuck Size', value: '13', unit: 'mm' },
            { name: 'No-Load Speed', value: '0-550/0-1900', unit: 'rpm' },
            { name: 'Impact Rate', value: '0-8250/0-28500', unit: 'bpm' },
            { name: 'Weight (without battery)', value: '1.7', unit: 'kg' },
            { name: 'Motor Type', value: 'Brushless EC Motor', unit: '' },
            { name: 'Battery Type', value: 'Li-Ion 18V', unit: '' },
            { name: 'Charging Time', value: '60', unit: 'minutes' },
            { name: 'LED Light', value: 'Yes', unit: '' },
            { name: 'Belt Clip', value: 'Included', unit: '' },
            { name: 'Warranty', value: '3 Years Professional', unit: '' }
          ],
          
          // Related products and spare parts
          relatedProducts: [
            'bosch-gsr-18v-28-screwdriver',
            'bosch-gws-18v-7-angle-grinder',
            'bosch-gho-18v-20-planer',
            'bosch-gks-18v-57-circular-saw'
          ],
          
          spareparts: [
            'bosch-18v-4ah-battery',
            'bosch-18v-charger-gal1880cv',
            'bosch-drill-bit-set-34pcs',
            'bosch-screwdriver-bit-set-25pcs',
            'bosch-belt-clip-professional',
            'bosch-side-handle-auxiliary'
          ],
          
          variants: [
            {
              sku: 'BSH-GSB18V85C-KIT1',
              name: 'Single Battery Kit',
              attributes: [{ name: 'Battery', value: '1x 4.0Ah + Charger' }],
              stockQty: 8,
              extraPrice: 0
            },
            {
              sku: 'BSH-GSB18V85C-KIT2', 
              name: 'Twin Battery Kit',
              attributes: [{ name: 'Battery', value: '2x 4.0Ah + Charger' }],
              stockQty: 5,
              extraPrice: 12000
            }
          ],
          
          tags: ['cordless', 'drill', 'professional', 'brushless', '18v', 'bosch'],
          rating: 4.8,
          reviewCount: 47,
          popularity: 95,
          isActive: true,
          isFeatured: true,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-12-10')
        };
        
        setProduct(hardcodedProduct);
        
        // Load related products (mock data)
        const mockRelatedProducts = [
          // Related Power Tools (4 items)
          {
            _id: 'bosch-gsr-18v-28-screwdriver',
            name: 'Bosch GSR 18V-28 Cordless Screwdriver',
            slug: 'bosch-gsr-18v-28-screwdriver',
            brand: 'Bosch Professional',
            price: 28000,
            salePrice: 25200,
            stockQty: 15,
            images: ['/assets/products/bosch-screwdriver.jpg'],
            rating: 4.6,
            categoryId: { name: 'Power Tools' }
          },
          {
            _id: 'bosch-gws-18v-7-angle-grinder',
            name: 'Bosch GWS 18V-7 Cordless Angle Grinder',
            slug: 'bosch-gws-18v-7-angle-grinder',
            brand: 'Bosch Professional',
            price: 32000,
            stockQty: 8,
            images: ['/assets/products/bosch-grinder.jpg'],
            rating: 4.5,
            categoryId: { name: 'Power Tools' }
          },
          {
            _id: 'bosch-gho-18v-20-planer',
            name: 'Bosch GHO 18V-20 Cordless Planer',
            slug: 'bosch-gho-18v-20-planer',
            brand: 'Bosch Professional',
            price: 35000,
            salePrice: 31500,
            stockQty: 6,
            images: ['/assets/products/bosch-planer.jpg'],
            rating: 4.4,
            categoryId: { name: 'Power Tools' }
          },
          {
            _id: 'bosch-gks-18v-57-circular-saw',
            name: 'Bosch GKS 18V-57 Cordless Circular Saw',
            slug: 'bosch-gks-18v-57-circular-saw',
            brand: 'Bosch Professional',
            price: 42000,
            stockQty: 4,
            images: ['/assets/products/bosch-saw.jpg'],
            rating: 4.7,
            categoryId: { name: 'Power Tools' }
          },
          
          // Spare Parts & Accessories (4 items)
          {
            _id: 'bosch-18v-4ah-battery',
            name: 'Bosch Professional 18V 4.0Ah Li-Ion Battery',
            slug: 'bosch-18v-4ah-battery',
            brand: 'Bosch Professional',
            price: 15000,
            stockQty: 25,
            images: ['/assets/products/bosch-battery.jpg'],
            rating: 4.9,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          },
          {
            _id: 'bosch-drill-bit-set-34pcs',
            name: 'Bosch Professional Drill Bit Set 34 Pieces',
            slug: 'bosch-drill-bit-set-34pcs',
            brand: 'Bosch Professional',
            price: 8500,
            salePrice: 7650,
            stockQty: 30,
            images: ['/assets/products/bosch-drill-bits.jpg'],
            rating: 4.7,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          },
          {
            _id: 'bosch-18v-charger-gal1880cv',
            name: 'Bosch GAL 1880 CV Fast Charger',
            slug: 'bosch-18v-charger-gal1880cv',
            brand: 'Bosch Professional',
            price: 12000,
            stockQty: 18,
            images: ['/assets/products/bosch-charger.jpg'],
            rating: 4.8,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          },
          {
            _id: 'bosch-screwdriver-bit-set-25pcs',
            name: 'Bosch Professional Screwdriver Bit Set 25 Pieces',
            slug: 'bosch-screwdriver-bit-set-25pcs',
            brand: 'Bosch Professional',
            price: 6500,
            salePrice: 5850,
            stockQty: 40,
            images: ['/assets/products/bosch-screwdriver-bits.jpg'],
            rating: 4.6,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          }
        ];
        
        setRelatedProducts(mockRelatedProducts);
      } else if (id === 'makita-ga4530r-angle-grinder-115mm') {
        // Second detailed product - Makita Angle Grinder
        const hardcodedProduct = {
          _id: 'makita-ga4530r-angle-grinder-115mm',
          name: 'Makita GA4530R Angle Grinder 115mm Professional',
          slug: 'makita-ga4530r-angle-grinder-115mm',
          sku: 'MKT-GA4530R-001',
          brand: 'Makita',
          price: 22000,
          salePrice: 18700,
          stockQty: 8,
          unit: 'pcs',
          images: [
            '/assets/products/makita-grinder-main.jpg',
            '/assets/products/makita-grinder-side.jpg',
            '/assets/products/makita-grinder-accessories.jpg',
            '/assets/products/makita-grinder-disc.jpg'
          ],
          description: 'The Makita GA4530R is a compact and powerful 115mm angle grinder designed for professional cutting and grinding applications. Features a high-performance motor with excellent power-to-weight ratio and superior durability.',
          longDescription: 'This professional-grade angle grinder delivers exceptional performance in a compact design. The powerful 720W motor provides consistent performance under load, while the ergonomic design ensures comfortable operation during extended use. Perfect for metal fabrication, construction, and general grinding tasks.',
          categoryId: { _id: 'cat1', name: 'Power Tools', slug: 'power-tools' },
          subcategoryId: { _id: 'subcat2', name: 'Angle Grinders', slug: 'angle-grinders' },
          
          // Dynamic attributes
          attributes: [
            { name: 'Power', value: '720', unit: 'W' },
            { name: 'Disc Diameter', value: '115', unit: 'mm' },
            { name: 'Spindle Thread', value: 'M14', unit: '' },
            { name: 'No-Load Speed', value: '11000', unit: 'rpm' },
            { name: 'Weight', value: '1.4', unit: 'kg' },
            { name: 'Cord Length', value: '2.5', unit: 'm' },
            { name: 'Motor Type', value: 'Universal Motor', unit: '' },
            { name: 'Side Handle', value: 'Included', unit: '' },
            { name: 'Wheel Guard', value: 'Adjustable', unit: '' },
            { name: 'Spindle Lock', value: 'Yes', unit: '' },
            { name: 'Soft Start', value: 'No', unit: '' },
            { name: 'Warranty', value: '3 Years', unit: '' }
          ],
          
          // Related products and spare parts
          relatedProducts: [
            'makita-9557pb-angle-grinder',
            'makita-dga452z-cordless-grinder',
            'makita-ga5030r-angle-grinder-125mm',
            'makita-9558pb-angle-grinder'
          ],
          
          spareparts: [
            'makita-cutting-disc-115mm-metal',
            'makita-grinding-disc-115mm',
            'makita-diamond-disc-115mm',
            'makita-side-handle-grinder',
            'makita-wheel-guard-115mm',
            'makita-carbon-brush-set'
          ],
          
          variants: [
            {
              sku: 'MKT-GA4530R-STD',
              name: 'Standard Kit',
              attributes: [{ name: 'Includes', value: 'Grinder + Side Handle + Guard' }],
              stockQty: 8,
              extraPrice: 0
            },
            {
              sku: 'MKT-GA4530R-KIT', 
              name: 'Complete Kit',
              attributes: [{ name: 'Includes', value: 'Grinder + 5 Discs + Case + Accessories' }],
              stockQty: 3,
              extraPrice: 5500
            }
          ],
          
          tags: ['angle-grinder', 'cutting', 'grinding', 'professional', '115mm', 'makita'],
          rating: 4.5,
          reviewCount: 32,
          popularity: 88,
          isActive: true,
          isFeatured: true,
          createdAt: new Date('2024-02-10'),
          updatedAt: new Date('2024-12-15')
        };
        
        setProduct(hardcodedProduct);
        
        // Load related products for angle grinder
        const mockRelatedProducts = [
          // Related Angle Grinders (4 items)
          {
            _id: 'makita-9557pb-angle-grinder',
            name: 'Makita 9557PB Angle Grinder 115mm',
            slug: 'makita-9557pb-angle-grinder',
            brand: 'Makita',
            price: 18500,
            stockQty: 12,
            images: ['/assets/products/makita-9557pb.jpg'],
            rating: 4.3,
            categoryId: { name: 'Power Tools' }
          },
          {
            _id: 'makita-dga452z-cordless-grinder',
            name: 'Makita DGA452Z Cordless Angle Grinder 115mm',
            slug: 'makita-dga452z-cordless-grinder',
            brand: 'Makita',
            price: 28000,
            salePrice: 25200,
            stockQty: 6,
            images: ['/assets/products/makita-cordless-grinder.jpg'],
            rating: 4.7,
            categoryId: { name: 'Power Tools' }
          },
          {
            _id: 'makita-ga5030r-angle-grinder-125mm',
            name: 'Makita GA5030R Angle Grinder 125mm',
            slug: 'makita-ga5030r-angle-grinder-125mm',
            brand: 'Makita',
            price: 24000,
            stockQty: 9,
            images: ['/assets/products/makita-125mm-grinder.jpg'],
            rating: 4.4,
            categoryId: { name: 'Power Tools' }
          },
          {
            _id: 'makita-9558pb-angle-grinder',
            name: 'Makita 9558PB Angle Grinder 125mm',
            slug: 'makita-9558pb-angle-grinder',
            brand: 'Makita',
            price: 21000,
            stockQty: 7,
            images: ['/assets/products/makita-9558pb.jpg'],
            rating: 4.2,
            categoryId: { name: 'Power Tools' }
          },
          
          // Spare Parts & Accessories (4 items)
          {
            _id: 'makita-cutting-disc-115mm-metal',
            name: 'Makita Metal Cutting Disc 115mm (Pack of 5)',
            slug: 'makita-cutting-disc-115mm-metal',
            brand: 'Makita',
            price: 3500,
            salePrice: 3150,
            stockQty: 45,
            images: ['/assets/products/makita-cutting-disc.jpg'],
            rating: 4.8,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          },
          {
            _id: 'makita-grinding-disc-115mm',
            name: 'Makita Grinding Disc 115mm (Pack of 5)',
            slug: 'makita-grinding-disc-115mm',
            brand: 'Makita',
            price: 4000,
            stockQty: 38,
            images: ['/assets/products/makita-grinding-disc.jpg'],
            rating: 4.6,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          },
          {
            _id: 'makita-diamond-disc-115mm',
            name: 'Makita Diamond Cutting Disc 115mm',
            slug: 'makita-diamond-disc-115mm',
            brand: 'Makita',
            price: 8500,
            salePrice: 7650,
            stockQty: 22,
            images: ['/assets/products/makita-diamond-disc.jpg'],
            rating: 4.9,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          },
          {
            _id: 'makita-side-handle-grinder',
            name: 'Makita Side Handle for Angle Grinder',
            slug: 'makita-side-handle-grinder',
            brand: 'Makita',
            price: 2500,
            stockQty: 35,
            images: ['/assets/products/makita-side-handle.jpg'],
            rating: 4.4,
            categoryId: { name: 'Spare Parts' },
            isSpare: true
          }
        ];
        
        setRelatedProducts(mockRelatedProducts);
      } else {
        // Fallback to API call for other products
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
        
        if (response.data.product?.category) {
          const relatedResponse = await api.get(`/products?category=${response.data.product.category}&limit=4&exclude=${id}`);
          setRelatedProducts(relatedResponse.data.products || []);
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to buy this product');
      return;
    }
    addToCart({ ...product, quantity });
    toast.success('Added to cart! Redirecting to checkout...');
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart({ ...product, quantity });
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    
    const isInWishlist = wishlist?.some(item => item._id === product._id);
    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-accent-500 hover:text-accent-600">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist?.some(item => item._id === product._id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <>
      <Head>
        <title>{product.name} - Hardware Tools Sri Lanka</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-gray-100 relative overflow-hidden">
        {/* Header Spacing */}
        <div className="h-24 bg-gray-900"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Section Animations */}
          <motion.div
            className="absolute top-32 left-10 w-20 h-20 bg-orange-500/20 rounded-full shadow-lg"
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-60 right-20 w-16 h-16 bg-gradient-to-br from-orange-500/25 to-orange-600/15 rotate-45 shadow-md"
            animate={{
              rotate: [45, 225, 45],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 left-1/3 w-12 h-12 bg-gray-300/25 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-80 right-1/3 w-10 h-10 bg-orange-400/20 rotate-12"
            animate={{
              rotate: [12, 192, 12],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Middle Section Animations */}
          <motion.div
            className="absolute top-1/2 left-5 w-14 h-14 border border-gray-400/40 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-10 w-18 h-18 bg-orange-300/20 rounded-full"
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-orange-300/30 to-gray-400/20 rounded-full"
            animate={{
              y: [0, -35, 0],
              x: [0, 25, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-2/3 left-1/4 w-12 h-12 bg-gray-400/25 rotate-45"
            animate={{
              rotate: [45, 405, 45],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/4 w-16 h-16 border-2 border-orange-400/30 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Bottom Section Animations */}
          <motion.div
            className="absolute bottom-40 left-1/4 w-12 h-12 bg-gray-400/30 rounded-full shadow-sm"
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-orange-500/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-60 left-10 w-14 h-14 bg-orange-200/25 rounded-full"
            animate={{
              y: [0, -25, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-80 right-20 w-10 h-10 bg-gray-300/30 rotate-12"
            animate={{
              rotate: [12, 372, 12],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-16 h-16 border border-orange-400/25 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.25, 0.6, 0.25]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Moving Dots - Multiple Layers */}
          <motion.div
            className="absolute w-2 h-2 bg-orange-500/40 rounded-full shadow-sm"
            animate={{
              x: [-40, 1200],
              y: [100, 200]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-gray-500/30 rounded-full shadow-sm"
            animate={{
              x: [1200, -40],
              y: [300, 150]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-orange-400/50 rounded-full"
            animate={{
              x: [-30, 1100],
              y: [400, 100]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute w-2.5 h-2.5 bg-gray-400/40 rounded-full"
            animate={{
              x: [1100, -30],
              y: [50, 350]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-orange-300/45 rounded-full"
            animate={{
              x: [-50, 1000],
              y: [250, 400]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-gray-500/35 rounded-full"
            animate={{
              x: [1000, -50],
              y: [500, 200]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating Triangles */}
          <motion.div
            className="absolute top-80 left-1/3 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-orange-400/30"
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-60 right-1/4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-400/35"
            animate={{
              y: [0, -25, 0],
              rotate: [0, -360, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-5 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-orange-300/40"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-5 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[12px] border-l-transparent border-r-transparent border-b-gray-300/30"
            animate={{
              y: [0, -35, 0],
              rotate: [0, -180, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/products" className="hover:text-orange-500 transition-colors">Products</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-8 lg:mb-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto lg:mx-10 flex flex-col items-center lg:items-end"
            >
              {/* Main Image */}
              <div className="relative mb-3 md:mb-4 group w-full max-w-xs md:max-w-sm">
                <div className="aspect-square bg-white rounded-xl shadow-md overflow-hidden electric-border-orange w-full">
                  <PlaceholderImage
                    src={product.images?.[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 80vw, 40vw"
                  />
                  
                  {/* Zoom Button */}
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <MagnifyingGlassIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                  </button>

                  {/* Discount Badge */}
                  {hasDiscount && (
                    <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-red-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-bold shadow-md">
                      -{discountPercentage}% OFF
                    </div>
                  )}
                </div>

                {/* Image Navigation */}
                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                      className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 p-1 md:p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
                    >
                      <ChevronLeftIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 p-1 md:p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
                    >
                      <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images?.length > 1 && (
                <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 justify-center lg:justify-center w-full max-w-xs md:max-w-sm">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all ${
                        selectedImage === index 
                          ? 'electric-border-orange shadow-md' 
                          : 'electric-border-subtle hover:border-gray-300'
                      }`}
                    >
                      <PlaceholderImage
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 md:space-y-4 flex flex-col justify-start px-2 lg:px-0"
            >
              {/* Brand & Category */}
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                {product.brand && (
                  <span className="px-2 md:px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-semibold">
                    {product.brand}
                  </span>
                )}
                {product.categoryId?.name && (
                  <span className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs md:text-sm">
                    {product.categoryId.name}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  {hasDiscount ? (
                    <>
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="text-sm md:text-lg text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-red-100 text-red-700 rounded text-xs md:text-sm font-semibold">
                        Save {formatPrice(product.price - product.salePrice)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  *Price includes all applicable taxes
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stockQty > 0 ? (
                  <>
                    <CheckIcon className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                    <span className="text-green-700 font-medium text-xs md:text-sm">
                      In Stock ({product.stockQty} available)
                    </span>
                  </>
                ) : (
                  <>
                    <InformationCircleIcon className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                    <span className="text-red-700 font-medium text-xs md:text-sm">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 p-2 md:p-3 bg-gray-200 rounded-lg electric-border-subtle">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <TruckIcon className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                  <span className="text-xs text-gray-700">Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <ShieldCheckIcon className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                  <span className="text-xs text-gray-700">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <ClockIcon className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                  <span className="text-xs text-gray-700">2-5 Days Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <PhoneIcon className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                  <span className="text-xs text-gray-700">24/7 Support</span>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3 md:space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <label className="text-xs md:text-sm font-medium text-gray-700">Qty:</label>
                  <div className="flex items-center electric-border-subtle rounded-lg">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-1.5 md:p-2 hover:bg-gray-100 transition-colors text-sm"
                    >
                      -
                    </button>
                    <span className="px-2 md:px-3 py-1.5 md:py-2 font-medium text-sm min-w-[40px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.stockQty, prev + 1))}
                      className="p-1.5 md:p-2 hover:bg-gray-100 transition-colors text-sm"
                      disabled={quantity >= product.stockQty}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex gap-2 md:gap-3">
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={product.stockQty === 0}
                      className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xs md:text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCartIcon className="w-3 h-3 md:w-4 md:h-4" />
                      Add to Cart
                    </motion.button>
                    
                    <motion.button
                      onClick={handleBuyNow}
                      disabled={product.stockQty === 0}
                      className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xs md:text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BoltIcon className="w-3 h-3 md:w-4 md:h-4" />
                      Buy Now
                    </motion.button>
                  </div>
                  
                  <div className="flex gap-2 md:gap-3 justify-center">
                    <motion.button
                      onClick={handleWishlistToggle}
                      className="p-2 border border-gray-300 rounded-lg hover:border-orange-500 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isInWishlist ? (
                        <HeartSolidIcon className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      className="p-2 border border-gray-300 rounded-lg hover:border-orange-500 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShareIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-all text-xs md:text-sm">
                  <PhoneIcon className="w-3 h-3 md:w-4 md:h-4" />
                  Call Now
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-all text-xs md:text-sm">
                  <ChatBubbleLeftRightIcon className="w-3 h-3 md:w-4 md:h-4" />
                  Live Chat
                </button>
              </div>
            </motion.div>
          </div> 
         {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-10"
          >
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {[
                  { id: 'description', label: 'Description', icon: InformationCircleIcon },
                  { id: 'specifications', label: 'Specifications', icon: CubeIcon },
                  { id: 'shipping', label: 'Shipping & Returns', icon: TruckIcon }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-4 md:p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                        {product.description || 'This is a high-quality professional tool designed for durability and performance. Perfect for both professional contractors and DIY enthusiasts.'}
                      </p>
                      
                      <h4 className="text-base font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Professional grade construction for long-lasting durability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Ergonomic design for comfortable extended use</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">High-performance motor with variable speed control</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Includes comprehensive accessory kit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Backed by manufacturer warranty</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'specifications' && (
                  <motion.div
                    key="specifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
                    
                    {/* Basic Product Info */}
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                      <h4 className="text-base font-semibold text-gray-900 mb-3">Product Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between py-1">
                          <span className="font-medium text-gray-700 text-sm">Brand</span>
                          <span className="text-gray-900 text-sm">{product.brand}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-medium text-gray-700 text-sm">SKU</span>
                          <span className="text-gray-900 font-mono text-xs">{product.sku}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-medium text-gray-700 text-sm">Category</span>
                          <span className="text-gray-900 text-sm">{product.categoryId?.name}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-medium text-gray-700 text-sm">Unit</span>
                          <span className="text-gray-900 text-sm">{product.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Attributes */}
                    {product.attributes && product.attributes.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-base font-semibold text-gray-900 mb-3">Technical Specifications</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {product.attributes.map((attr, index) => (
                            <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                              <span className="font-medium text-gray-700 text-sm">{attr.name}</span>
                              <span className="text-gray-900 font-semibold text-sm">
                                {attr.value} {attr.unit && <span className="text-gray-600 font-normal">{attr.unit}</span>}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Variants */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-base font-semibold text-gray-900 mb-3">Available Variants</h4>
                        <div className="space-y-3">
                          {product.variants.map((variant, index) => (
                            <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-gray-900 text-sm">{variant.name}</h5>
                                <div className="text-right">
                                  <span className="text-base font-bold text-gray-900">
                                    {formatPrice((product.salePrice || product.price) + variant.extraPrice)}
                                  </span>
                                  {variant.extraPrice > 0 && (
                                    <div className="text-xs text-green-600">
                                      +{formatPrice(variant.extraPrice)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                SKU: <span className="font-mono">{variant.sku}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                  {variant.attributes?.map((attr, attrIndex) => (
                                    <div key={attrIndex} className="text-xs text-gray-700">
                                      <span className="font-medium">{attr.name}:</span> {attr.value}
                                    </div>
                                  ))}
                                </div>
                                <div className="text-xs">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    variant.stockQty > 0 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {variant.stockQty > 0 ? `${variant.stockQty} in stock` : 'Out of stock'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-semibold text-blue-900 mb-2 text-sm">Warranty Information</h5>
                        <p className="text-blue-800 text-xs">
                          This product comes with manufacturer warranty. Please keep your purchase receipt for warranty claims.
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h5 className="font-semibold text-green-900 mb-2 text-sm">Quality Assurance</h5>
                        <p className="text-green-800 text-xs">
                          All products are tested and certified to meet international quality standards.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <TruckIcon className="w-5 h-5 text-orange-500" />
                          Shipping Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">Free Island-wide Delivery</h4>
                              <p className="text-gray-600 text-xs">On orders over LKR 10,000</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <ClockIcon className="w-4 h-4 text-orange-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">2-5 Business Days</h4>
                              <p className="text-gray-600 text-xs">Standard delivery time across Sri Lanka</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <BuildingStorefrontIcon className="w-4 h-4 text-orange-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">Store Pickup Available</h4>
                              <p className="text-gray-600 text-xs">Collect from our Colombo showroom</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <ShieldCheckIcon className="w-5 h-5 text-orange-500" />
                          Returns & Warranty
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">7-Day Return Policy</h4>
                              <p className="text-gray-600 text-xs">Return unused items in original packaging</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <ShieldCheckIcon className="w-4 h-4 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">1 Year Warranty</h4>
                              <p className="text-gray-600 text-xs">Manufacturer warranty on all products</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <PhoneIcon className="w-4 h-4 text-orange-500 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">24/7 Support</h4>
                              <p className="text-gray-600 text-xs">Contact us anytime for assistance</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Spare Parts & Accessories */}
          {relatedProducts.filter(p => p.isSpare).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6 md:mb-10"
            >
              <div className="text-center mb-4 md:mb-6">
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                  Compatible Spare Parts & Accessories
                </h2>
                <p className="text-gray-600 text-xs md:text-sm max-w-xl mx-auto px-2">
                  Enhance your tool's performance with genuine spare parts and accessories designed specifically for this model.
                </p>
              </div>
              
              {/* Carousel Container */}
              <div className="relative group">
                {/* Navigation Buttons - Hidden on mobile */}
                <button
                  onClick={() => {
                    const container = document.getElementById('spares-carousel');
                    container.scrollBy({ left: -200, behavior: 'smooth' });
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 hidden md:block"
                >
                  <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    const container = document.getElementById('spares-carousel');
                    container.scrollBy({ left: 200, behavior: 'smooth' });
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 hidden md:block"
                >
                  <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </button>

                {/* Carousel */}
                <div className="flex justify-center">
                  <div
                    id="spares-carousel"
                    className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth max-w-6xl w-full px-2 md:px-4"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                  {relatedProducts.filter(p => p.isSpare).map((spareProduct, index) => (
                    <motion.div
                      key={spareProduct._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative flex-shrink-0 w-[180px] md:w-[280px] h-[300px] md:h-[420px]"
                    >
                      <div className="absolute -top-1 -right-1 z-10">
                        <span className="bg-orange-500 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-semibold shadow-md">
                          SPARE
                        </span>
                      </div>
                      <div className="h-full">
                        <ProductCard product={spareProduct} />
                      </div>
                    </motion.div>
                  ))}
                  </div>
                </div>

                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10"></div>
              </div>
            </motion.div>
          )}

          {/* Related Products */}
          {relatedProducts.filter(p => !p.isSpare).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center mb-4 md:mb-6">
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                  You Might Also Like
                </h2>
                <p className="text-gray-600 text-xs md:text-sm max-w-xl mx-auto px-2">
                  Complete your toolkit with these complementary professional tools from the same series.
                </p>
              </div>
              
              {/* Carousel Container */}
              <div className="relative group">
                {/* Navigation Buttons - Hidden on mobile */}
                <button
                  onClick={() => {
                    const container = document.getElementById('related-carousel');
                    container.scrollBy({ left: -200, behavior: 'smooth' });
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 hidden md:block"
                >
                  <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    const container = document.getElementById('related-carousel');
                    container.scrollBy({ left: 200, behavior: 'smooth' });
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 hidden md:block"
                >
                  <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                </button>

                {/* Carousel */}
                <div className="flex justify-center">
                  <div
                    id="related-carousel"
                    className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth max-w-6xl w-full px-2 md:px-4"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                  {relatedProducts.filter(p => !p.isSpare).map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex-shrink-0 w-[180px] md:w-[280px] h-[300px] md:h-[420px]"
                    >
                      <div className="h-full">
                        <ProductCard product={relatedProduct} />
                      </div>
                    </motion.div>
                  ))}
                  </div>
                </div>

                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10"></div>
              </div>
            </motion.div>
          )}

          {/* Courier Payment Notice */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-6 md:mt-10 p-3 md:p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl"
          >
            <div className="flex items-start gap-2 md:gap-3">
              <div className="flex-shrink-0">
                <TruckIcon className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold text-amber-900 mb-1 md:mb-2">
                  Important Delivery Information
                </h3>
                <p className="text-amber-800 mb-1 md:mb-2 text-xs md:text-sm">
                  <strong>Courier charges are NOT included in the product price.</strong> 
                  You will pay the courier charge directly to the delivery person upon receiving your order.
                </p>
                <div className="flex items-center gap-1 md:gap-2 text-xs text-amber-700">
                  <InformationCircleIcon className="w-3 h-3" />
                  <span>Card payment options coming soon! Currently accepting bank transfers only.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {showImageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowImageModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-sm max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <PlaceholderImage
                  src={product.images?.[selectedImage]}
                  alt={product.name}
                  width={320}
                  height={240}
                  className="object-contain max-h-[50vh] rounded-lg"
                />
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-2 right-2 p-1 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors text-base"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}