import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      primary: '+94 11 234 5678',
      secondary: '+94 77 123 4567',
      description: 'Speak directly with our experts',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      primary: 'info@toolhub.lk',
      secondary: 'support@toolhub.lk',
      description: 'Get detailed responses to your queries',
      bgColor: 'bg-green-500',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Store',
      primary: 'Mawanella',
      secondary: 'Sri Lanka',
      description: 'See our tools in person',
      bgColor: 'bg-accent-500',
      textColor: 'text-accent-600',
      borderColor: 'border-accent-200'
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
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Head>
        <title>Contact ToolHub - Professional Hardware Tools Sri Lanka</title>
        <meta name="description" content="Contact ToolHub Sri Lanka for expert advice on professional tools. Call, email, chat, or visit our Mawanella showroom. We're here to help!" />
      </Head>

      <div ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
        {/* Unique Animated Background - Different from About */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Circuit Board Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10h20M10 0v20M5 5h10v10H5z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" className="text-accent-500"/>
            </svg>
          </div>

          {/* Floating Tech Elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className={`w-4 h-4 ${i % 2 === 0 ? 'bg-accent-500/20' : 'border-2 border-accent-500/20'} ${i % 3 === 0 ? 'rounded-full' : 'rotate-45'}`} />
            </motion.div>
          ))}
        </div>

        {/* Hero Section - Extended Dark Background */}
        <section className="relative z-10 min-h-screen flex items-center pt-12 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
              {/* Left Side - Content */}
              <div className="flex items-center justify-center p-8 lg:p-16 relative overflow-hidden">
                {/* Unique Background Pattern */}
                <div className="absolute inset-0">
                  {/* Hexagon Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <pattern id="hexagons" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
                          <polygon points="15,2 25,8 25,18 15,24 5,18 5,8" stroke="currentColor" strokeWidth="1" fill="none"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hexagons)" className="text-accent-500"/>
                    </svg>
                  </div>

                  {/* Animated Dots */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-accent-500 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: Math.random() * 2 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 text-white max-w-lg"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-6"
                  >
                    <span className="inline-block px-4 py-2 bg-accent-500/20 rounded-full text-accent-400 text-sm font-medium mb-4">
                      Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Let's Connect &
                      <span className="block text-accent-500">Build Together</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Ready to find the perfect tools for your project? Our expert team is here to guide you every step of the way.
                    </p>
                  </motion.div>

                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="grid grid-cols-2 gap-6"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-500 mb-1">24/7</div>
                      <div className="text-sm text-gray-400">Support Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-500 mb-1">15min</div>
                      <div className="text-sm text-gray-400">Response Time</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Side - Contact Methods */}
              <div className="flex items-center justify-center p-8 lg:p-16 relative">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(229, 90, 43, 0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 75% 75%, rgba(229, 90, 43, 0.2) 0%, transparent 50%)`
                  }} />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10 w-full max-w-md"
                >
                  <h2 className="text-2xl font-bold text-white mb-8 text-center">Choose Your Preferred Way</h2>
                  
                  <div className="space-y-4">
                    {contactMethods.map((method, index) => (
                      <motion.div
                        key={method.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`p-6 bg-gradient-to-br from-accent-500/20 to-accent-600/10 backdrop-blur-sm rounded-3xl shadow-xl border border-accent-500/30 cursor-pointer group hover:shadow-2xl hover:from-accent-500/30 hover:to-accent-600/20 transition-all duration-500 hover:scale-105`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <method.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white mb-1 group-hover:text-accent-100 transition-colors">{method.title}</h3>
                            <p className={`font-medium text-accent-300 text-sm mb-1 group-hover:text-accent-200 transition-colors`}>{method.primary}</p>
                            <p className="text-gray-300 text-sm mb-2 group-hover:text-gray-200 transition-colors">{method.secondary}</p>
                            <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">{method.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section - Unique Card-based Layout */}
        <section className="relative z-10 py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have a specific question or need expert advice? Fill out the form below and we'll get back to you within 15 minutes during business hours.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-500/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

                  <div className="relative z-10">
                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                              placeholder="John Doe"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                              placeholder="+94 77 123 4567"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Subject *
                          </label>
                          <select
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                          >
                            <option value="">Select a subject</option>
                            <option value="product-inquiry">Product Inquiry</option>
                            <option value="order-support">Order Support</option>
                            <option value="technical-support">Technical Support</option>
                            <option value="partnership">Partnership Opportunity</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:outline-none transition-colors resize-vertical"
                            placeholder="Tell us about your project or how we can help you..."
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-accent-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-accent-600 transition-colors flex items-center justify-center space-x-2"
                        >
                          <PaperAirplaneIcon className="w-5 h-5" />
                          <span>Send Message</span>
                        </motion.button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 15 minutes during business hours.</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Business Hours Card */}
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white">
                  <ClockIcon className="w-8 h-8 mb-4" />
                  <h3 className="text-lg font-bold mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <PhoneIcon className="w-8 h-8 text-accent-500 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Need Immediate Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    For urgent inquiries, call us directly and speak with our expert team.
                  </p>
                  <a href="tel:+94112345678" className="text-accent-500 font-semibold hover:text-accent-600 transition-colors">
                    +94 11 234 5678
                  </a>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <MapPinIcon className="w-8 h-8 text-accent-500 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Visit Our Showroom</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Mawanella<br />
                    Sri Lanka
                  </p>
                  <p className="text-gray-500 text-xs">
                    Free parking available
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section - Unique Interactive Design */}
        <section className="relative z-10 py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find Us in Mawanella
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Located in Mawanella with easy access and ample parking
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Map Placeholder - Reduced Size */}
              <div className="aspect-[2/1] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPinIcon className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                  <p className="text-gray-600">Google Maps integration would be embedded here</p>
                </div>
                
                {/* Animated Location Pin */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-6 h-6 bg-accent-500 rounded-full shadow-lg" />
                </motion.div>
              </div>

              {/* Location Details */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPinIcon className="w-6 h-6 text-accent-500" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Prime Location</h4>
                    <p className="text-gray-600 text-sm">Easy access from all parts of Sri Lanka</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <BuildingOfficeIcon className="w-6 h-6 text-accent-500" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Modern Facility</h4>
                    <p className="text-gray-600 text-sm">State-of-the-art showroom and warehouse</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <UserGroupIcon className="w-6 h-6 text-accent-500" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Expert Team</h4>
                    <p className="text-gray-600 text-sm">Knowledgeable staff ready to assist</p>
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