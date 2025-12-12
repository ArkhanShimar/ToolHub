import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { api } from '../../lib/api';
import { modalVariants } from '../../lib/motionVariants';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      searchProducts();
    } else {
      setResults([]);
    }
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/search/query?q=${encodeURIComponent(query)}`);
      setResults(response.data.products || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="flex min-h-full items-start justify-center p-4 pt-16">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-2xl bg-white rounded-xl shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-semibold">Search Products</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="p-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for tools, parts, or brands..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="spinner mx-auto"></div>
                    <p className="text-gray-500 mt-2">Searching...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="divide-y">
                    {results.map((product) => (
                      <Link
                        key={product._id}
                        href={`/products/${product.slug || product._id}`}
                        onClick={handleClose}
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 flex-shrink-0">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.brand}
                          </p>
                          <p className="text-sm font-semibold text-brand-500">
                            LKR {product.salePrice || product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : query.length > 2 ? (
                  <div className="p-6 text-center text-gray-500">
                    No products found for "{query}"
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Type at least 3 characters to search
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}