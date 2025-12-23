import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  LockClosedIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      district: '',
      postalCode: ''
    },
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (!formData.address.line1.trim()) {
      toast.error('Address line 1 is required');
      return false;
    }

    if (!formData.address.city.trim()) {
      toast.error('City is required');
      return false;
    }

    if (!formData.address.district.trim()) {
      toast.error('District is required');
      return false;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        address: formData.address
      });
      
      if (result.success) {
        router.push('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sriLankanDistricts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 
    'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 
    'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 
    'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 
    'Trincomalee', 'Vavuniya'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Register - ToolHub Sri Lanka</title>
        <meta name="description" content="Create your ToolHub account to start shopping for professional tools and equipment." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-accent-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Circuit Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="circuit-register" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M0 12.5h25M12.5 0v25M6.25 6.25h12.5v12.5H6.25z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-register)" className="text-accent-500"/>
            </svg>
          </div>

          {/* Geometric Elements */}
          <motion.div
            className="absolute top-32 right-32 w-40 h-40 border border-accent-500/20 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-br from-accent-500/15 to-accent-600/5 rotate-45"
            animate={{
              rotate: [45, 405],
              y: [0, -40, 0],
            }}
            transition={{
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>

        <div className="relative z-10 py-20 md:py-20 px-3 md:px-4 sm:px-6 lg:px-8 pt-24 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl md:max-w-4xl mx-auto"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <motion.h2 
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4"
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
                Join ToolHub
              </motion.h2>
              <p className="text-gray-300 text-sm md:text-lg">
                Create your account and access professional-grade tools
              </p>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 border border-accent-500/20 relative overflow-hidden"
            >
              {/* Enhanced Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent-500/30 to-accent-600/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent-500/30 to-accent-600/10 rounded-full translate-y-20 -translate-x-20 blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-500/5 to-transparent" />

              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                  {/* Personal Information */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-8 flex items-center">
                      <UserIcon className="w-5 h-5 md:w-7 md:h-7 mr-2 md:mr-3 text-accent-500" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      {/* Name */}
                      <div className="group">
                        <label htmlFor="name" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                            <UserIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                            placeholder="Enter your full name"
                          />
                          <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="group">
                        <label htmlFor="phone" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                            <PhoneIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                          </div>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                            placeholder="07X XXX XXXX"
                          />
                          <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mt-4 md:mt-8 group">
                      <label htmlFor="email" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                          placeholder="Enter your email address"
                        />
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Address Information */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
                      <HomeIcon className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-accent-500" />
                      Delivery Address
                    </h3>
                    
                    {/* Address Line 1 */}
                    <div className="mb-4 md:mb-6 group">
                      <label htmlFor="address.line1" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                        Address Line 1 *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                          <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                        </div>
                        <input
                          id="address.line1"
                          name="address.line1"
                          type="text"
                          required
                          value={formData.address.line1}
                          onChange={handleChange}
                          className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                          placeholder="House number and street name"
                        />
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>

                    {/* Address Line 2 */}
                    <div className="mb-4 md:mb-6 group">
                      <label htmlFor="address.line2" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                        Address Line 2
                      </label>
                      <input
                        id="address.line2"
                        name="address.line2"
                        type="text"
                        value={formData.address.line2}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                        placeholder="Apartment, suite, etc. (optional)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                      {/* City */}
                      <div className="group">
                        <label htmlFor="address.city" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                          City *
                        </label>
                        <input
                          id="address.city"
                          name="address.city"
                          type="text"
                          required
                          value={formData.address.city}
                          onChange={handleChange}
                          className="w-full px-3 md:px-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                          placeholder="City"
                        />
                      </div>

                      {/* District */}
                      <div className="group">
                        <label htmlFor="address.district" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                          District *
                        </label>
                        <select
                          id="address.district"
                          name="address.district"
                          required
                          value={formData.address.district}
                          onChange={handleChange}
                          className="w-full px-3 md:px-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                        >
                          <option value="" className="bg-gray-800">Select District</option>
                          {sriLankanDistricts.map(district => (
                            <option key={district} value={district} className="bg-gray-800">
                              {district}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Postal Code */}
                      <div className="group">
                        <label htmlFor="address.postalCode" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                          Postal Code
                        </label>
                        <input
                          id="address.postalCode"
                          name="address.postalCode"
                          type="text"
                          value={formData.address.postalCode}
                          onChange={handleChange}
                          className="w-full px-3 md:px-4 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                          placeholder="Postal Code"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
                      <LockClosedIcon className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-accent-500" />
                      Account Security
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Password */}
                      <div className="group">
                        <label htmlFor="password" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                          Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                            <LockClosedIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 md:pl-12 pr-12 md:pr-14 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                            placeholder="Create a password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center hover:text-accent-400 transition-colors"
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            ) : (
                              <EyeIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            )}
                          </button>
                          <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1 md:mt-2">
                          Must be at least 6 characters long
                        </p>
                      </div>

                      {/* Confirm Password */}
                      <div className="group">
                        <label htmlFor="confirmPassword" className="block text-xs md:text-sm font-bold text-white mb-2 md:mb-3 group-focus-within:text-accent-400 transition-colors">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                            <LockClosedIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 md:pl-12 pr-12 md:pr-14 py-3 md:py-4 bg-black/40 border-2 border-gray-700/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:border-accent-500 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner text-sm md:text-base"
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center hover:text-accent-400 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeSlashIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            ) : (
                              <EyeIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            )}
                          </button>
                          <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Terms Agreement */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex items-start"
                  >
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 md:h-5 md:w-5 text-accent-500 focus:ring-accent-500 border-gray-300 rounded mt-1 bg-white/10 border-white/20"
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 md:ml-3 block text-xs md:text-sm text-gray-300">
                      I agree to the{' '}
                      <Link href="/terms-conditions" className="text-accent-400 hover:text-accent-300 transition-colors">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy-policy" className="text-accent-400 hover:text-accent-300 transition-colors">
                        Privacy Policy
                      </Link>
                    </label>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(229, 90, 43, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:from-accent-600 hover:via-accent-700 hover:to-accent-600 transition-all duration-500 shadow-2xl hover:shadow-accent-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="relative z-10">Creating Account...</span>
                      </>
                    ) : (
                      <span className="relative z-10">Create Account</span>
                    )}
                  </motion.button>
                </form>

                {/* Login Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="mt-6 md:mt-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs md:text-sm">
                      <span className="px-4 bg-transparent text-white">Already have an account?</span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 text-center">
                    <Link
                      href="/login"
                      className="font-medium text-white hover:text-accent-400 transition-colors text-sm md:text-lg"
                    >
                      Sign in to your account
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}