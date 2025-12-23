import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <div className="fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-40 lg:right-40 z-50">
        <motion.header
          className="bg-black/10 backdrop-blur-md electric-border-orange rounded-full shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 md:px-6 lg:px-12 py-3">
            <div className="flex items-center justify-between lg:justify-center lg:gap-16 h-10">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔧</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold text-white whitespace-nowrap">Hardware Tools</h1>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/90 hover:text-accent-500 font-medium transition-colors relative group text-sm whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="px-7 py-2 text-sm font-medium bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-colors whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:text-accent-500 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : (
                  <Bars3Icon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden mt-4"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-4 mx-4 max-w-xs ml-auto mr-4">
                <nav className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2 text-gray-700 hover:text-accent-600 hover:bg-accent-50 font-medium transition-all py-2 px-3 rounded-xl group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Actions */}
                  <motion.div 
                    className="pt-3 mt-3 border-t border-gray-200 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all shadow-md hover:shadow-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </>
  );
}