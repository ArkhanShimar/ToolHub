import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Updates', href: '/updates' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Career', href: '/career' },
        { name: 'Services', href: '/services' },
        { name: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Report a Bug', href: '/report-bug' },
        { name: 'Chat Support', href: '/chat-support' },
        { name: 'Event', href: '/events' },
      ]
    },
    {
      title: 'Extra links',
      links: [
        { name: 'Customer Support', href: '/customer-support' },
        { name: 'Terms & Conditions', href: '/terms-conditions' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Delivery Details', href: '/delivery-details' },
      ]
    }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 mb-6 lg:mb-0 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3 md:mb-4">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">⚙️</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">ToolHub</h3>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4 md:mb-6 text-xs md:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              Professional hardware tools and equipment for Sri Lankan industries. Quality products with reliable service since 2008.
            </p>

            {/* Newsletter Signup - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-md mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 md:px-4 md:py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-accent-500 text-white text-xs md:text-sm"
              />
              <button className="px-4 py-2 md:px-6 md:py-2 bg-accent-500 text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-accent-600 transition-colors font-medium text-xs md:text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Links - Mobile Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 lg:col-span-4">
            {footerSections.map((section, index) => (
              <div key={section.title} className="text-center lg:text-left">
                <h4 className="text-white font-semibold mb-3 md:mb-4 text-xs md:text-sm">{section.title}</h4>
                <ul className="space-y-2 md:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm leading-tight"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Mobile Optimized */}
        <div className="border-t border-gray-800 mt-6 md:mt-8 lg:mt-12 pt-4 md:pt-6 lg:pt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 md:gap-4">
          <p className="text-gray-500 text-xs md:text-sm text-center">
            Copyright © {currentYear} ToolHub. All Rights Reserved
          </p>
          
          <div className="flex items-center justify-center space-x-2 md:space-x-3">
            {/* Social Media Icons - Smaller on mobile */}
            <Link href="#" className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-xs md:text-sm">f</span>
            </Link>
            <Link href="#" className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-xs md:text-sm">t</span>
            </Link>
            <Link href="#" className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-xs md:text-sm">in</span>
            </Link>
            <Link href="#" className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-xs md:text-sm">ig</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}