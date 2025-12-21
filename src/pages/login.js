import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      const redirect = router.query.redirect || '/';
      router.push(redirect);
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        const redirect = router.query.redirect || '/';
        router.push(redirect);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="spinner border-accent-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login - ToolHub Sri Lanka</title>
        <meta name="description" content="Login to your ToolHub account to access your orders, wishlist, and more." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border-2 border-accent-500/20 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-accent-500/10 to-accent-600/5 rotate-45"
            animate={{
              rotate: [45, 405],
              y: [0, -30, 0],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(229, 90, 43, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(229, 90, 43, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full space-y-8"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <motion.h2 
                className="text-4xl font-bold text-white mb-3"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(229, 90, 43, 0.3)",
                    "0 0 20px rgba(229, 90, 43, 0.5)",
                    "0 0 10px rgba(229, 90, 43, 0.3)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Welcome Back
              </motion.h2>
              <p className="text-gray-300 text-lg">
                Sign in to access your professional tools
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-accent-500/20 relative overflow-hidden"
            >
              {/* Enhanced Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent-500/30 to-accent-600/10 rounded-full -translate-y-20 translate-x-20 blur-xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-500/30 to-accent-600/10 rounded-full translate-y-16 -translate-x-16 blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-500/5 to-transparent" />

              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="group"
                  >
                    <label htmlFor="email" className="block text-sm font-bold text-white mb-3 group-focus-within:text-accent-400 transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-black/40 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner"
                        placeholder="Enter your email address"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="group"
                  >
                    <label htmlFor="password" className="block text-sm font-bold text-white mb-3 group-focus-within:text-accent-400 transition-colors">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-14 py-4 bg-black/40 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-accent-400 transition-colors"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-gray-300 rounded bg-white/10 border-white/20"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link href="/forgot-password" className="font-medium text-white hover:text-accent-400 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(229, 90, 43, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-accent-600 hover:via-accent-700 hover:to-accent-600 transition-all duration-500 shadow-2xl hover:shadow-accent-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="relative z-10">Signing in...</span>
                      </>
                    ) : (
                      <span className="relative z-10">Sign In</span>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-white">Don't have an account?</span>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Link
                      href="/register"
                      className="font-medium text-white hover:text-accent-400 transition-colors text-lg"
                    >
                      Create a new account
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-center text-sm text-gray-400"
            >
              <p>
                By signing in, you agree to our{' '}
                <Link href="/terms-conditions" className="text-accent-400 hover:text-accent-300 transition-colors">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-accent-400 hover:text-accent-300 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}