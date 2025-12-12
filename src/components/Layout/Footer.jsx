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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚙️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">MegaEquip</h3>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Mighty Gear provides high-performance machinery solutions, ensuring reliability and efficiency for your industrial needs.
            </p>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-accent-500 text-white text-sm"
              />
              <button className="px-6 py-2 bg-accent-500 text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-accent-600 transition-colors font-medium text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Links - Two columns on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 lg:col-span-4">
            {footerSections.map((section, index) => (
              <div key={section.title}>
                <h4 className="text-white font-semibold mb-4 text-sm">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            Copyright © {currentYear} MegaEquip. All Rights Reserved
          </p>
          
          <div className="flex items-center space-x-3">
            {/* Social Media Icons */}
            <Link href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-sm">f</span>
            </Link>
            <Link href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-sm">t</span>
            </Link>
            <Link href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-sm">in</span>
            </Link>
            <Link href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-accent-500 transition-colors">
              <span className="text-sm">ig</span>
            </Link>
          </div>
        </div>
      </div>


    </footer>
  );
}