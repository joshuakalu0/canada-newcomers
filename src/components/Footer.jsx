"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#D52B1E] to-[#b91c1c] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Canadian Maple Leaf Decoration */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-12 h-12" viewBox="0 0 512 512" fill="white">
              <path d="M256,0c-11.3,0-22.6,0.7-33.8,2.1c-9.4,1.2-18.7,3-27.8,5.3c-9.1,2.3-18,5.1-26.7,8.4c-8.7,3.3-17.1,7.1-25.3,11.3
                c-8.2,4.2-16,8.9-23.6,14c-7.6,5.1-14.8,10.7-21.7,16.7c-6.9,6-13.4,12.4-19.5,19.2c-6.1,6.8-11.8,13.9-17,21.3
                c-5.2,7.4-10,15.1-14.3,23c-4.3,7.9-8.1,16.1-11.4,24.5c-3.3,8.4-6.1,17-8.4,25.8c-2.3,8.8-4,17.7-5.2,26.8
                c-1.2,9.1-1.8,18.2-1.8,27.4c0,11.3,0.7,22.6,2.1,33.8c1.2,9.4,3,18.7,5.3,27.8c2.3,9.1,5.1,18,8.4,26.7
                c3.3,8.7,7.1,17.1,11.3,25.3c4.2,8.2,8.9,16,14,23.6c5.1,7.6,10.7,14.8,16.7,21.7c6,6.9,12.4,13.4,19.2,19.5
                c6.8,6.1,13.9,11.8,21.3,17c7.4,5.2,15.1,10,23,14.3c7.9,4.3,16.1,8.1,24.5,11.4c8.4,3.3,17,6.1,25.8,8.4
                c8.8,2.3,17.7,4,26.8,5.2c9.1,1.2,18.2,1.8,27.4,1.8c11.3,0,22.6-0.7,33.8-2.1c9.4-1.2,18.7-3,27.8-5.3
                c9.1-2.3,18-5.1,26.7-8.4c8.7-3.3,17.1-7.1,25.3-11.3c8.2-4.2,16-8.9,23.6-14c7.6-5.1,14.8-10.7,21.7-16.7
                c6.9-6,13.4-12.4,19.5-19.2c6.1-6.8,11.8-13.9,17-21.3c5.2-7.4,10-15.1,14.3-23c4.3-7.9,8.1-16.1,11.4-24.5
                c3.3-8.4,6.1-17,8.4-25.8c2.3-8.8,4-17.7,5.2-26.8c1.2-9.1,1.8-18.2,1.8-27.4c0-11.3-0.7-22.6-2.1-33.8
                c-1.2-9.4-3-18.7-5.3-27.8c-2.3-9.1-5.1-18-8.4-26.7c-3.3-8.7-7.1-17.1-11.3-25.3c-4.2-8.2-8.9-16-14-23.6
                c-5.1-7.6-10.7-14.8-16.7-21.7c-6-6.9-12.4-13.4-19.2-19.5c-6.8-6.1-13.9-11.8-21.3-17c-7.4-5.2-15.1-10-23-14.3
                c-7.9-4.3-16.1-8.1-24.5-11.4c-8.4-3.3-17-6.1-25.8-8.4c-8.8-2.3-17.7-4-26.8-5.2C274.3,0.6,265.2,0,256,0z
                M383.8,192.2l-25.5,25.5l-25.5-25.5l-25.5,25.5l-25.5-25.5l-25.5,25.5l-25.5-25.5l-25.5,25.5l-25.5-25.5l-25.5,25.5
                l-25.5-25.5l-25.5,25.5l-25.5-25.5v127.5l25.5,25.5l25.5-25.5l25.5,25.5l25.5-25.5l25.5,25.5l25.5-25.5l25.5,25.5l25.5-25.5
                l25.5,25.5l25.5-25.5l25.5,25.5l25.5-25.5V192.2z"
              />
            </svg>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">About Us</h3>
            <p className="text-white/90 mb-4">
              Newcomers Canada Hub is dedicated to helping international students and newcomers navigate their Canadian journey with ease and confidence.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.879v-8.385h-3.047v-3.492h3.047v-2.606c0-3.007 1.792-4.402 4.301-4.402 1.22 0 2.286.099 2.596.143v2.973h-1.46c-1.158 0-1.352.558-1.352 1.382v2.06h3.293l-.449 3.492h-2.844v8.385c5.738-.925 10.125-5.889 10.125-11.879z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:scale-110 transition-transform"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Map
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/student-guide" className="hover:underline">
                  Student Guide
                </Link>
              </li>
              <li>
                <Link href="/housing" className="hover:underline">
                  Housing Resources
                </Link>
              </li>
              <li>
                <Link href="/employment" className="hover:underline">
                  Employment Opportunities
                </Link>
              </li>
              <li>
                <Link href="/healthcare" className="hover:underline">
                  Healthcare Information
                </Link>
              </li>
              <li>
                <Link href="/transportation" className="hover:underline">
                  Transportation Guide
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:underline">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-white/10 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-white/90">Subscribe to our newsletter for the latest resources, events, and tips for newcomers to Canada.</p>
            </div>
            <div>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit" 
                  className="bg-[#D52B1E] hover:bg-[#b91c1c] px-4 py-2 rounded-r-md transition-colors"
                  aria-label="Subscribe"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-lg">Newcomers Canada Hub</span>
          </div>
          <p className="text-sm text-white/80">© {new Date().getFullYear()} Newcomers Canada Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;