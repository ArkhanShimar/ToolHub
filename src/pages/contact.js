import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import { staggerContainer, fadeInUp } from '../lib/motionVariants';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      details: ['+94 11 234 5678', '+94 77 123 4567'],
      description: 'Call us for immediate assistance',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      details: ['info@toolhub.lk', 'support@toolhub.lk'],
      description: 'Send us your questions anytime',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Our Store',
      details: ['123 Main Street', 'Colombo 03, Sri Lanka'],
      description: 'Visit our showroom and warehouse',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      details: ['Mon - Sat: 8:00 AM - 6:00 PM', 'Sunday: Closed'],
      description: 'We are here to help during business hours',
      color: 'from-accent-500 to-accent-600'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Head>
        <title>Contact Us - ToolHub Sri Lanka | Get in Touch</title>
        <meta name="description" content="Contact ToolHub Sri Lanka for all your professional tool needs. Phone, email, or visit our showroom in Colombo. Expert support available." />
      </Head>

      <div ref={containerRef} className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Dynamic Gradient Orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(229,90,43,0.3) 0%, transparent 70%)",
              x: mousePosition.x - 200,
              y: mousePosition.y - 200,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border-2 border-accent-500/30 rounded-full"
            style={{ y: y1, rotate }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-accent-600/10 rotate-45"
            style={{ y: y2 }}
            animate={{
              rotate: [45, 225, 45],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Animated Lines */}
          <motion.div
            className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
            animate={{
              x: [-200, 1200],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Hero Section - Dark Theme */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
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

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent-500/40 rounded-full"
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

            {/* Pulsing Rings */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-96 h-96 border border-white/10 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />

            {/* Moving Light Beams */}
            <motion.div
              className="absolute top-0 w-full h-2 bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
              animate={{
                x: [-200, 1400],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Glowing Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/3 w-32 h-32 bg-accent-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Main Title */}
              <motion.div
                variants={fadeInUp}
                className="relative mb-8"
              >
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="relative inline-block">
                    CONTACT
                    {/* Text Glow Effect */}
                    <motion.div
                      className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-black text-accent-500 opacity-50 blur-sm"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      CONTACT
                    </motion.div>
                  </span>
                  <br />
                  <span className="relative inline-block">
                    TOOLHUB
                    <motion.div
                      className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-accent-500 to-accent-600 shadow-lg shadow-accent-500/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    {/* Text Glow Effect */}
                    <motion.div
                      className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-black text-accent-500 opacity-50 blur-sm"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    >
                      TOOLHUB
                    </motion.div>
                  </span>
                </motion.h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed relative"
              >
                <motion.span
                  className="relative z-10"
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
                  Ready to connect? We're here to help with all your{" "}
                  <span className="text-accent-500 font-semibold">professional tool needs</span>{" "}
                  and provide expert guidance for your projects.
                </motion.span>
              </motion.p>

              {/* Quick Contact Stats */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
              >
                {[
                  { icon: ChatBubbleLeftRightIcon, label: "24/7 Support", value: "Always Available" },
                  { icon: UserGroupIcon, label: "Expert Team", value: "20+ Specialists" },
                  { icon: GlobeAltIcon, label: "Island Coverage", value: "All Provinces" },
                  { icon: BuildingOfficeIcon, label: "Showroom", value: "Colombo 03" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="group relative"
                    whileHover={{ y: -10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 relative overflow-hidden">
                      <motion.div
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <stat.icon className="w-8 h-8 text-accent-500 mx-auto mb-3 group-hover:scale-110 transition-transform relative z-10" />
                      </motion.div>
                      
                      <motion.div 
                        className="text-lg font-bold text-white mb-2 relative z-10"
                        animate={{
                          textShadow: [
                            "0 0 5px rgba(255, 255, 255, 0.5)",
                            "0 0 15px rgba(255, 255, 255, 0.8)",
                            "0 0 5px rgba(255, 255, 255, 0.5)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-gray-300 font-medium relative z-10">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Section - Light Theme */}
        <section className="relative z-10 py-20 bg-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Get in Touch
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Multiple ways to reach us for all your hardware tool needs
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={fadeInUp}
                  className="group relative"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden h-full">
                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(229, 90, 43, 0.3)",
                          "0 0 40px rgba(229, 90, 43, 0.6)",
                          "0 0 20px rgba(229, 90, 43, 0.3)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      <info.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {info.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {info.description}
                    </p>

                    {/* Hover Effect Line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${info.color}`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section - Dark Theme */}
        <section className="relative z-10 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent-500/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -200, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Energy Waves */}
            <motion.div
              className="absolute top-1/3 w-full h-1 bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
              animate={{
                x: [-300, 1500],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-white mb-6 relative"
              >
                <span className="relative z-10">Send us a Message</span>
                <motion.div
                  className="absolute inset-0 text-4xl md:text-5xl font-bold text-accent-500 opacity-30 blur-sm"
                  animate={{
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Send us a Message
                </motion.div>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Have a question or need expert advice? We're here to help!
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                animate={{
                  x: [-100, 400],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                      placeholder="Your phone number"
                    />
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                    placeholder="Your email address"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                  >
                    <option value="" className="text-gray-900">Select a subject</option>
                    <option value="product-inquiry" className="text-gray-900">Product Inquiry</option>
                    <option value="order-support" className="text-gray-900">Order Support</option>
                    <option value="technical-support" className="text-gray-900">Technical Support</option>
                    <option value="partnership" className="text-gray-900">Partnership</option>
                    <option value="other" className="text-gray-900">Other</option>
                  </select>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="text-center">
                  <motion.button
                    type="submit"
                    className="px-8 py-4 bg-accent-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:bg-accent-600 relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Send Message</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-600/20 to-accent-500/20"
                      animate={{
                        x: [-100, 300],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Map Section - Light Theme */}
        <section className="relative z-10 py-20 bg-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Visit Our Showroom
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Experience our tools firsthand at our modern showroom in Colombo
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <motion.div
                  className="text-center text-gray-600"
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-accent-500" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                  <p className="text-lg mb-2">123 Main Street, Colombo 03, Sri Lanka</p>
                  <p className="text-sm text-gray-500">Google Maps integration would be embedded here</p>
                </motion.div>
                
                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-accent-500/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-8 h-8 bg-accent-500/30 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPinIcon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Easy to Find</h4>
                    <p className="text-gray-600 text-sm">Located in the heart of Colombo with ample parking</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <BuildingOfficeIcon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Modern Showroom</h4>
                    <p className="text-gray-600 text-sm">Experience our tools in a professional environment</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <UserGroupIcon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Expert Staff</h4>
                    <p className="text-gray-600 text-sm">Get personalized recommendations from our team</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}