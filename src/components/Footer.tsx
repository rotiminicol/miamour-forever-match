
import { Link } from 'react-router-dom';
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-miamour-navy text-white pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-miamour-gold" />
              <span className="text-xl font-serif font-medium text-white">MiAmour</span>
            </div>
            <p className="text-gray-300 text-sm">
              Finding love, nurturing relationships. MiAmour helps you find your perfect match and build lasting connections.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4 text-miamour-gold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/wedding-matching" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Wedding Matching
                </Link>
              </li>
              <li>
                <Link to="/couples-therapy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Couples Therapy
                </Link>
              </li>
              <li>
                <Link to="/relationship-coaching" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Relationship Coaching
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4 text-miamour-gold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4 text-miamour-gold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MiAmour. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <p className="text-gray-400 text-sm">Made with love for couples worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
