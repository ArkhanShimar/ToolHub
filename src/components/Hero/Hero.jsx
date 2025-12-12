import { motion } from 'framer-motion';
import Link from 'next/link';
import { heroText, fadeInUp } from '../../lib/motionVariants';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const brands = [
    { name: 'BOSCH', logo: 'BOSCH' },
    { name: 'MAKITA', logo: 'MAKITA' },
    { name: 'DEWALT', logo: 'DEWALT' },
    { name: 'MILWAUKEE', logo: 'MILWAUKEE' },
    { name: 'STANLEY', logo: 'STANLEY' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Video */}
      <div className="absolute inset-0 z-0" style={{ top: '-100px' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ minHeight: 'calc(100vh + 100px)' }}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/80 to-gray-900/85">
          {/* Industrial accent overlays */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(255,107,53,0.15),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,107,53,0.1),transparent_50%)]"></div>
          </div>
          
          {/* Geometric overlay pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rotate-12"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 border border-accent-500/30 rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 pt-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            {/* Main Heading */}
            <motion.h1
              custom={1}
              variants={heroText}
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-wide"
            >
              PROFESSIONAL TOOLS
              <br />
              <span className="text-accent-500">FOR EVERY INDUSTRY</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              variants={heroText}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-3 font-light"
            >
              Providing Durable Equipment with Unmatched Expert Support
            </motion.p>
            
            <motion.p
              custom={3}
              variants={heroText}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8"
            >
              for All Your Industrial Needs
            </motion.p>

            {/* CTA Button */}
            <motion.div
              custom={4}
              variants={heroText}
              className="mb-12"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-6 py-3 bg-accent-500 text-white text-base font-semibold rounded-full hover:bg-accent-600 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Our Products
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mb-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center mx-auto"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/70 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Brand Logos Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              {brands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="text-lg md:text-xl font-bold tracking-wider">
                    {brand.logo}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>


    </section>
  );
}