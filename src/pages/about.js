import { motion } from 'framer-motion';
import Head from 'next/head';
import { staggerContainer, fadeInUp } from '../lib/motionVariants';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Hardware Tools Sri Lanka</title>
        <meta name="description" content="Learn about Hardware Tools Sri Lanka - your trusted partner for professional tools and equipment." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-6 h-screen">
            
            {/* Left Section - About Us */}
            <div className="col-span-5 flex flex-col justify-start pt-16">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-8xl font-black text-gray-900 leading-none mb-6">
                  ABOUT<br />US
                </h1>
                <p className="text-gray-600 text-lg mb-8 max-w-sm">
                  Building trust with industrial-grade solutions and professional expertise.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  Hardware Tools Sri Lanka offers world-class tools and equipment solutions for professionals and industries across Sri Lanka.
                </p>
              </motion.div>
            </div>

            {/* Center Section - Images and Philosophy */}
            <div className="col-span-4 flex flex-col gap-6 pt-8">
              {/* Top Image */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center"
              >
                <span className="text-gray-600 text-sm">Workshop Image</span>
              </motion.div>

              {/* Philosophy Section */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl p-6 flex-1"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  At Hardware Tools Sri Lanka, we believe in delivering excellence through quality products and exceptional service.
                </p>
                <div className="bg-gray-200 rounded-lg h-24 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Tool Display</span>
                </div>
              </motion.div>
            </div>

            {/* Right Section - Services */}
            <div className="col-span-3 pt-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Services List */}
                <div className="space-y-6">
                  <motion.div variants={fadeInUp} className="border-b border-gray-300 pb-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">TOOL PLANNING</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Comprehensive planning solutions for industrial and commercial equipment needs with expert consultation.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="border-b border-gray-300 pb-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">WORKSHOP DESIGN</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Innovative design approaches for tool organization and workspace optimization solutions.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="border-b border-gray-300 pb-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">EQUIPMENT SOLUTIONS</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Custom equipment solutions designed specifically for professional workshop environments.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="border-b border-gray-300 pb-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">INVENTORY MANAGEMENT</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Complete inventory and tool management systems for efficient workflow and organization.
                    </p>
                  </motion.div>
                </div>

                {/* Certification Badge */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-gray-900 rounded-2xl p-6 text-center text-white"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <div className="text-xs uppercase tracking-wider mb-1">CERTIFIED</div>
                  <div className="text-lg font-bold mb-1">PREMIUM</div>
                  <div className="text-xs uppercase tracking-wider mb-3">YOUTUBE</div>
                  <div className="text-2xl font-black tracking-wider">S • US</div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Meet the Principals Section */}
          <div className="mt-16 mb-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl font-bold text-gray-900 mb-2"
              >
                MEET THE
              </motion.h2>
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl font-bold text-gray-900 mb-8"
              >
                PRINCIPALS
              </motion.h2>
              
              {/* Company Overview Image */}
              <motion.div
                variants={fadeInUp}
                className="bg-gray-300 rounded-2xl h-32 flex items-center justify-center mb-8 max-w-2xl mx-auto"
              >
                <span className="text-gray-600 text-sm">Company Overview Image</span>
              </motion.div>

              <motion.p 
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed"
              >
                Our leadership team combines decades of industry experience with a passion for innovation. 
                Together, they guide Hardware Tools Sri Lanka's mission to provide the best tools and service 
                to professionals across Sri Lanka.
              </motion.p>
            </motion.div>

            {/* Principals Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
            >
              {/* Principal 1 */}
              <motion.div
                variants={fadeInUp}
                className="text-center"
              >
                <div className="bg-gray-300 rounded-2xl h-64 w-48 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Jay Loritto</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Jay Loritto</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-3">FOUNDER AND PRINCIPAL</p>
              </motion.div>

              {/* Principal 2 */}
              <motion.div
                variants={fadeInUp}
                className="text-center"
              >
                <div className="bg-gray-300 rounded-2xl h-64 w-48 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">David Charette</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">David Charette</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-3">MANAGING PRINCIPAL</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}