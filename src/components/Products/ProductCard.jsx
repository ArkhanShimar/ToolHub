import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  EyeIcon,
  StarIcon,
  TagIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, ShoppingCartIcon as CartSolidIcon } from '@heroicons/react/24/solid';
import { card } from '../../lib/motionVariants';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [imageLoading, setImageLoading] = useState(true);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();

  const isInWishlist = wishlist?.some(item => item._id === product._id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    
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

  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white rounded-2xl shadow-sm electric-border-subtle overflow-hidden group hover:shadow-lg transition-all duration-300"
        whileHover={{ y: -2 }}
      >
        <Link href={`/products/${product.slug || product._id}`}>
          <div className="flex p-4 gap-4">
            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              {hasDiscount && (
                <div className="absolute top-1 left-1 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded-md text-xs font-bold">
                  -{discountPercentage}%
                </div>
              )}
              <Image
                src={product.images?.[0] || '/assets/products/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="96px"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  {product.brand && (
                    <p className="text-xs text-accent-500 font-semibold uppercase tracking-wide mb-1">
                      {product.brand}
                    </p>
                  )}
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-accent-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <motion.button
                    onClick={handleWishlistToggle}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isInWishlist ? (
                      <HeartSolidIcon className="w-4 h-4 text-red-500" />
                    ) : (
                      <HeartIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </motion.button>
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={product.stockQty === 0}
                    className="p-2 rounded-full hover:bg-accent-50 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ShoppingCartIcon className="w-4 h-4 text-accent-500" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {hasDiscount ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.stockQty > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.stockQty > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-sm electric-border-subtle overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col"
      whileHover={{ y: -5, scale: 1.02 }}
      style={{
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%),
          linear-gradient(90deg, transparent 0%, rgba(229, 90, 43, 0.03) 50%, transparent 100%)
        `,
        backgroundSize: '100% 100%, 200% 100%'
      }}
    >
      <Link href={`/products/${product.slug || product._id}`}>
        {/* Image Container */}
        <div className="relative w-full h-36 md:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
          {/* Badges */}
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
            {hasDiscount && (
              <motion.div 
                className="bg-red-500 text-white px-1.5 py-0.5 rounded-md text-xs font-bold shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                -{discountPercentage}%
              </motion.div>
            )}
            {product.featured && (
              <div className="bg-accent-500 text-white px-1.5 py-0.5 rounded-md text-xs font-bold shadow-lg flex items-center gap-1">
                <StarIcon className="w-2.5 h-2.5" />
                Featured
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute top-2 right-2 z-20">
            <div className={`px-1.5 py-0.5 rounded-md text-xs font-bold shadow-lg flex items-center gap-1 ${
              product.stockQty > 0 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {product.stockQty > 0 ? (
                <>
                  <CheckBadgeIcon className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">In Stock</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <span className="text-xs">Out</span>
              )}
            </div>
          </div>

          {/* Product Image */}
          <div className="relative w-full h-full">
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}
            <Image
              src={product.images?.[0] || '/assets/products/placeholder.svg'}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute bottom-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <motion.button
              onClick={handleWishlistToggle}
              className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist ? (
                <HeartSolidIcon className="w-3 h-3 text-red-500" />
              ) : (
                <HeartIcon className="w-3 h-3 text-gray-600" />
              )}
            </motion.button>
            
            <motion.button
              onClick={handleAddToCart}
              disabled={product.stockQty === 0}
              className="p-1.5 bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Add to cart"
            >
              <ShoppingCartIcon className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
          <div className="flex-1">
            {/* Brand */}
            {product.brand && (
              <p className="text-xs text-accent-500 uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
                <TagIcon className="w-2.5 h-2.5" />
                {product.brand}
              </p>
            )}

            {/* Product Name */}
            <h3 className="font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2 group-hover:text-accent-600 transition-colors text-xs md:text-sm leading-tight">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                      i < (product.rating || 4) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1 font-medium">
                ({product.reviewCount || 0})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-1 md:space-x-2">
              {hasDiscount ? (
                <>
                  <span className="text-sm md:text-lg font-bold text-gray-900">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-sm md:text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      </div>
    </motion.div>
  );
}