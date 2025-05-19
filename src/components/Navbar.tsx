
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-miamour-blush">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-miamour-burgundy" />
            <span className="text-xl font-serif font-medium text-miamour-burgundy">MiAmour</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Home
            </Link>
            <Link to="/wedding-matching" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Wedding Matching
            </Link>
            <Link to="/couples-therapy" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Couples Therapy
            </Link>
            <Link to="/pricing" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-miamour-charcoal" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-4 animate-fade-in">
            <Link to="/" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Home
            </Link>
            <Link to="/wedding-matching" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Wedding Matching
            </Link>
            <Link to="/couples-therapy" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Couples Therapy
            </Link>
            <Link to="/pricing" className="text-miamour-charcoal hover:text-miamour-burgundy transition-colors">
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
