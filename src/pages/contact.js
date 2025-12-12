import { motion } from 'framer-motion';
import Head from 'next/head';
import { fadeInUp, staggerContainer } from '../lib/motionVariants';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+94 11 234 5678', '+94 77 123 4567'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['info@hardwaretools.lk', 'support@hardwaretools.lk'],
      description: 'Send us your questions anytime'
    },
    {
      icon: MapPinIcon,
      title: 'Address',
      details: ['123 Main Street', 'Colombo 03, Sri Lanka'],
      description: 'Visit our showroom and warehouse'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      details: ['Mon - Sat: 8:00 AM - 6:00 PM', 'Sunday: Closed'],
      description: 'We are here to help during business hours'
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us - Hardware Tools Sri Lanka</title>
        <meta name="description" content="Get in touch with Hardware Tools Sri Lanka. We're here to help with your tool and equipment needs." />
      </Head>

      <div className="min-h-screen bg-surface-100">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-muted-500">
                We're here to help with all your hardware tool needs
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-2xl font-bold text-gray-900 mb-8"
              >
                Get in Touch
              </motion.h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-card"
                  >
                    <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">
                          {detail}
                        </p>
                      ))}
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-card p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label className="form-label">Subject *</label>
                  <select required className="form-select">
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-support">Order Support</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary justify-center"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-xl shadow-card p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Visit Our Showroom
            </h2>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPinIcon className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive map would be embedded here</p>
                <p className="text-sm">123 Main Street, Colombo 03, Sri Lanka</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}