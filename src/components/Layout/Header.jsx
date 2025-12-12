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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4"
            >
              <div className="bg-white/10 backdrop-blur-md electric-border-subtle rounded-2xl p-4">
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-white/90 hover:text-accent-500 font-medium transition-colors py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Actions */}
                  <div className="pt-4 border-t border-white/20 space-y-3">
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/login"
                        className="text-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors border border-white/20 rounded-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        href="/register"
                        className="text-center px-4 py-2 text-sm font-medium bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </>
  );
}