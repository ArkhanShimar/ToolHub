import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import { staggerContainer, fadeInUp } from '../lib/motionVariants';
import { 
  WrenchScrewdriverIcon,
  CogIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  StarIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { number: "3000+", label: "Products Available", icon: WrenchScrewdriverIcon },
    { number: "15+", label: "Years Experience", icon: StarIcon },
    { number: "500+", label: "Happy Customers", icon: UserGroupIcon },
    { number: "24/7", label: "Customer Support", icon: ShieldCheckIcon }
  ];

  const values = [
    {
      icon: CheckBadgeIcon,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality testing to ensure professional-grade performance and durability.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TruckIcon,
      title: "Reliable Delivery",
      description: "Island-wide delivery network ensuring your tools reach you safely and on time, every time.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CogIcon,
      title: "Expert Support",
      description: "Our technical team provides comprehensive support from product selection to after-sales service.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BuildingStorefrontIcon,
      title: "Local Presence",
      description: "Proudly Sri Lankan, serving local industries with global-standard tools and equipment.",
      color: "from-accent-500 to-accent-600"
    }
  ];

  const timeline = [
    { year: "2008", title: "Foundation", description: "Started as a small hardware store in Colombo with a vision to serve Sri Lankan industries." },
    { year: "2012", title: "Expansion", description: "Opened our first warehouse and began importing professional-grade tools from international brands." },
    { year: "2016", title: "Digital Transformation", description: "Launched our online platform to serve customers across the island more efficiently." },
    { year: "2020", title: "Innovation Hub", description: "Established our technical support center and training facility for customers." },
    { year: "2024", title: "Future Ready", description: "Continuing to evolve with cutting-edge technology and sustainable business practices." }
  ];

  return (
    <>
      <Head>
        <title>About Us - ToolHub Sri Lanka | Professional Hardware Solutions</title>
        <meta name="description" content="Discover ToolHub Sri Lanka's journey - 15+ years of providing professional-grade tools and equipment to industries across Sri Lanka. Quality, reliability, and expert support." />
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
              scale: isHovering ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
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
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gray-400/20 rounded-full"
            style={{ y: y3, scale }}
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6,
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
          <motion.div
            className="absolute bottom-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"
            animate={{
              x: [1200, -200],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
        </div>

        {/* Hero Section - Dark Theme with Enhanced Effects */}
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
            {[...Array(20)].map((_, i) => (
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

            {/* Large Geometric Shapes */}
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 border-2 border-accent-500/20 rounded-full"
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
              className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-accent-500/10 to-accent-600/5 rotate-45"
              animate={{
                rotate: [45, 405],
                y: [0, -30, 0],
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />

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
            <motion.div
              className="absolute bottom-1/3 left-1/4 w-80 h-80 border border-accent-500/20 rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 2
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
            <motion.div
              className="absolute bottom-1/4 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: [1400, -200],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 3
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
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
                x: [0, -40, 0],
                y: [0, 20, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
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
              {/* Main Title with Advanced Animation */}
              <motion.div
                variants={fadeInUp}
                className="relative mb-8"
              >
                <motion.h1 
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="relative inline-block">
                    ABOUT
                    {/* Text Glow Effect */}
                    <motion.div
                      className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-accent-500 opacity-50 blur-sm"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ABOUT
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
                      className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-accent-500 opacity-50 blur-sm"
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

              {/* Subtitle with Enhanced Effects */}
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed relative"
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
                  Empowering Sri Lankan industries with{" "}
                  <span className="text-accent-500 font-semibold">professional-grade tools</span>{" "}
                  and unwavering commitment to excellence since 2008.
                </motion.span>
              </motion.p>

              {/* Enhanced Animated Stats */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="group relative"
                    whileHover={{ y: -10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 relative overflow-hidden">
                      {/* Animated Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
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
                        className="text-3xl font-bold text-white mb-2 relative z-10"
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
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-gray-300 font-medium relative z-10">{stat.label}</div>
                    </div>
                    
                    {/* Enhanced Hover Glow Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-accent-500/30 to-accent-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section - Light Theme */}
        <section className="relative z-10 py-20 bg-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Side - Story Content */}
              <motion.div variants={fadeInUp} className="space-y-8">
                <div>
                  <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                  >
                    Our Story
                  </motion.h2>
                  <motion.div
                    className="w-24 h-1 bg-accent-500 mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </div>

                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  What started as a small hardware store in Colombo has grown into Sri Lanka's most trusted 
                  source for professional tools and equipment. Our journey began with a simple mission: 
                  to provide Sri Lankan industries with access to world-class tools that match international standards.
                </motion.p>

                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  Today, we serve over 500 satisfied customers across the island, from small workshops to 
                  large industrial complexes. Our commitment to quality, reliability, and exceptional 
                  customer service has made us the preferred partner for professionals who demand the best.
                </motion.p>

                {/* Mission Statement */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 border-l-4 border-accent-500 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700 italic">
                    "To empower Sri Lankan industries with professional-grade tools and equipment, 
                    backed by expert knowledge and unwavering commitment to customer success."
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Side - Interactive Visual */}
              <motion.div 
                variants={fadeInUp}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-2xl">
                  {/* Floating Tool Icons */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {['🔧', '⚙️', '🔨', '🔩', '⚡', '🛠️'].map((icon, index) => (
                      <motion.div
                        key={index}
                        className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2,
                          ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                      >
                        {icon}
                      </motion.div>
                    ))}
                  </div>

                  {/* Central Logo Area */}
                  <motion.div
                    className="bg-accent-500 rounded-2xl p-8 text-center text-white relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{
                        x: [-100, 300],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                    <h3 className="text-2xl font-bold mb-2 relative z-10">ToolHub</h3>
                    <p className="text-accent-100 relative z-10">Professional Grade Since 2008</p>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-accent-500/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-accent-500/30 rounded-full"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section - Dark Theme */}
        <section className="relative z-10 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Our Core Values
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                The principles that guide everything we do and every relationship we build
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="group relative"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 relative overflow-hidden">
                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {value.description}
                    </p>

                    {/* Hover Effect Line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.color}`}
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

        {/* Timeline Section - Light Theme */}
        <section className="relative z-10 py-20 bg-gray-200">
          <div className="max-w-6xl mx-auto px-4">
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
                Our Journey
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Milestones that shaped our commitment to excellence
              </motion.p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-accent-500 to-accent-600 rounded-full"
                style={{ height: '100%' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              <div className="space-y-16">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    variants={fadeInUp}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <motion.div
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative"
                        whileHover={{ scale: 1.05, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-3xl font-bold text-accent-500 mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        
                        {/* Arrow */}
                        <motion.div
                          className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-accent-500 rotate-45 ${
                            index % 2 === 0 ? '-right-2' : '-left-2'
                          }`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                        />
                      </motion.div>
                    </div>

                    {/* Timeline Dot */}
                    <motion.div
                      className="w-6 h-6 bg-accent-500 rounded-full border-4 border-white shadow-lg z-10 relative"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-accent-500 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Spacer */}
                    <div className="w-5/12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Founder Section - Dark Theme */}
        <section className="relative z-10 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated Constellation Pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Floating Geometric Elements */}
            <motion.div
              className="absolute top-20 left-20 w-40 h-40 border border-accent-500/20 rotate-45"
              animate={{
                rotate: [45, 405],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-lg"
              animate={{
                scale: [1, 1.8, 1],
                x: [0, -50, 0],
                y: [0, 30, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

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
            <motion.div
              className="absolute bottom-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: [1500, -300],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
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
                <span className="relative z-10">Meet Our Founder</span>
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
                  Meet Our Founder
                </motion.div>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                The visionary behind ToolHub's commitment to excellence and innovation
              </motion.p>
            </motion.div>

            {/* Founder Profile */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Side - Founder Image */}
              <motion.div 
                variants={fadeInUp}
                className="relative group"
              >
                <div className="relative">
                  {/* Main Image Container */}
                  <motion.div
                    className="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-accent-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Profile Image Placeholder */}
                    <div className="relative z-10 aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center text-gray-400 text-lg font-medium shadow-inner">
                      <motion.div
                        className="text-center"
                        animate={{
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="text-6xl mb-4">👤</div>
                        <div>Founder Photo</div>
                      </motion.div>
                    </div>

                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        x: [-100, 400],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </motion.div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-white/20 rounded-full"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              </motion.div>

              {/* Right Side - Founder Info */}
              <motion.div 
                variants={fadeInUp}
                className="space-y-8"
              >
                {/* Name and Title */}
                <div>
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 255, 255, 0.3)",
                        "0 0 20px rgba(255, 255, 255, 0.5)",
                        "0 0 10px rgba(255, 255, 255, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Rajesh Perera
                  </motion.h3>
                  <motion.p 
                    className="text-accent-500 text-lg font-semibold mb-6"
                    animate={{
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Founder & CEO
                  </motion.p>
                </div>

                {/* Bio */}
                <motion.div 
                  className="space-y-4 text-gray-300 leading-relaxed"
                  variants={staggerContainer}
                >
                  <motion.p variants={fadeInUp}>
                    With over 20 years of experience in the hardware and tools industry, Rajesh founded ToolHub 
                    with a vision to revolutionize how Sri Lankan professionals access quality equipment.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    His deep understanding of industrial needs and commitment to excellence has made ToolHub 
                    the trusted partner for thousands of professionals across the island.
                  </motion.p>
                </motion.div>

                {/* Achievements */}
                <motion.div 
                  variants={staggerContainer}
                  className="grid grid-cols-2 gap-6"
                >
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div 
                      className="text-2xl font-bold text-accent-500 mb-2"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(229, 90, 43, 0.5)",
                          "0 0 15px rgba(229, 90, 43, 0.8)",
                          "0 0 5px rgba(229, 90, 43, 0.5)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      20+
                    </motion.div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div 
                      className="text-2xl font-bold text-accent-500 mb-2"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(229, 90, 43, 0.5)",
                          "0 0 15px rgba(229, 90, 43, 0.8)",
                          "0 0 5px rgba(229, 90, 43, 0.5)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      500+
                    </motion.div>
                    <div className="text-sm text-gray-400">Happy Clients</div>
                  </motion.div>
                </motion.div>

                {/* Quote */}
                <motion.div 
                  variants={fadeInUp}
                  className="bg-gradient-to-r from-accent-500/10 to-accent-600/5 rounded-2xl p-6 border-l-4 border-accent-500 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="relative z-10">
                    <div className="text-4xl text-accent-500 mb-4">"</div>
                    <p className="text-gray-300 italic mb-4 leading-relaxed">
                      Quality tools are not just products – they're the foundation of craftsmanship, 
                      the enablers of dreams, and the partners in every professional's journey to excellence.
                    </p>
                    <div className="text-accent-500 font-semibold">- Rajesh Perera</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action - Light Theme */}
        <section className="relative z-10 py-20 bg-gray-200 overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: "radial-gradient(circle, rgba(229, 90, 43, 0.5) 1px, transparent 1px)",
                backgroundSize: "50px 50px"
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                Ready to Experience Excellence?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl mb-8 text-gray-600"
              >
                Join thousands of professionals who trust ToolHub for their equipment needs
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  className="px-8 py-4 bg-accent-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:bg-accent-600"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Our Products
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-accent-500 text-accent-500 rounded-full font-bold text-lg hover:bg-accent-500 hover:text-white transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Our Team
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}