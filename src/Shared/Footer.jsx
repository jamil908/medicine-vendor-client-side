import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Medicine Vendor</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for quality medicines and healthcare products in Bangladesh.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Fast Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  24/7 Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Pharmacist Consultation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Medicine Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Prescription Upload
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <a
                  href="mailto:jamilhossainrafi@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300 break-all"
                >
                  jamilhossainrafi@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <a
                  href="tel:+8801781142856"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  +880 1781142856
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Chittagong, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <div className="max-w-md">
            <h4 className="text-white font-bold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates on new medicines, discounts, and health tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Payment Methods */}
            <div>
              <h5 className="text-white font-semibold mb-3">Payment Methods</h5>
              <p className="text-gray-400 text-sm">
                We accept Cash on Delivery, Online Transfer, and Card Payments for your convenience.
              </p>
            </div>

            {/* Shipping Info */}
            <div>
              <h5 className="text-white font-semibold mb-3">Fast Shipping</h5>
              <p className="text-gray-400 text-sm">
                Same-day delivery available in Chittagong. Next-day delivery for other areas in Bangladesh.
              </p>
            </div>

            {/* Warranty */}
            <div>
              <h5 className="text-white font-semibold mb-3">Authenticity Guaranteed</h5>
              <p className="text-gray-400 text-sm">
                100% authentic medicines from verified manufacturers with proper documentation.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="flex items-center justify-center gap-1 mb-4">
              <p className="text-gray-400">Made with</p>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <p className="text-gray-400">for better health</p>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Medicine Vendor. All rights reserved. | 
              <a href="#" className="text-gray-400 hover:text-white ml-2">Privacy Policy</a> | 
              <a href="#" className="text-gray-400 hover:text-white ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <a
          href="tel:+8801781142856"
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          title="Call us now"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;