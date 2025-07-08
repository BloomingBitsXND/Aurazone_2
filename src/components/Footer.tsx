import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-900/50 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="text-purple-400" size={32} />
              <span className="text-2xl font-bold text-white">AuraZone</span>
            </Link>
            <p className="text-purple-200">
              Building safer communities through technology and real-time information sharing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/map" className="text-purple-200 hover:text-white transition-colors">Safety Map</Link>
              </li>
              <li>
                <Link to="/alerts" className="text-purple-200 hover:text-white transition-colors">Alerts</Link>
              </li>
              <li>
                <Link to="/stats" className="text-purple-200 hover:text-white transition-colors">Statistics</Link>
              </li>
              <li>
                <Link to="/about" className="text-purple-200 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-purple-200">London, United Kingdom</li>
              <li>
                <a href="tel:+442012345678" className="text-purple-200 hover:text-white transition-colors">
                  +44 20 1234 5678
                </a>
              </li>
              <li>
                <a href="mailto:support@aurazone.com" className="text-purple-200 hover:text-white transition-colors">
                  support@aurazone.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm">
              © {new Date().getFullYear()} AuraZone. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-purple-200 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-purple-200 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <span className="text-purple-200 text-sm flex items-center gap-1">
                Made with <Heart size={14} className="text-red-400" /> in London
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;