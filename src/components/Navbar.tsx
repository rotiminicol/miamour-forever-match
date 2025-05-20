
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/wedding-matching", label: "Wedding Matching" },
    { path: "/couples-therapy", label: "Couples Therapy" },
    { path: "/pricing", label: "Pricing" },
  ];

  const isLandingPage = location.pathname === '/';

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white/90 backdrop-blur-lg sticky top-0 z-40 border-b border-miamour-lightpink/30 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img
              src="/lovable-uploads/miLogo2.png"
              alt="miamour.me logo"
              className="h-9 w-9 rounded-full shadow-md object-contain bg-white"
              whileHover={{ rotate: [0, 15, -10, 5, 0], scale: 1.08 }}
              transition={{ duration: 0.8 }}
            />
            <motion.span 
              className="text-xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-miamour-pink to-miamour-burgundy"
              whileHover={{ scale: 1.05 }}
            >
              miamour.me
            </motion.span>
          </Link>

          {/* Desktop Navigation - Only show on landing page */}
          {isLandingPage && (
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  onHoverStart={() => setHoveredLink(link.path)}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative"
                >
                  <Link 
                    to={link.path} 
                    className="text-miamour-charcoal hover:text-miamour-pink transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.label === "Pricing" && (
                      <motion.span 
                        animate={{ y: hoveredLink === link.path ? 2 : 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    )}
                  </Link>
                  {hoveredLink === link.path && (
                    <motion.div
                      layoutId="navHoverIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-miamour-pink"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </motion.div>
              ))}
            </nav>
          )}

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-miamour-pink text-miamour-pink hover:bg-miamour-blush/30 group relative overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-miamour-pink/10 group-hover:bg-miamour-pink/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-miamour-pink text-white text-xs">
                        {user.email?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-[100px] truncate">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 rounded-lg shadow-lg border border-miamour-lightpink/20"
                >
                  <DropdownMenuLabel className="font-serif text-miamour-pink">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-miamour-lightpink/20" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')}
                    className="focus:bg-miamour-blush/20 focus:text-miamour-pink"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/profile')}
                    className="focus:bg-miamour-blush/20 focus:text-miamour-pink"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/settings')}
                    className="focus:bg-miamour-blush/20 focus:text-miamour-pink"
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-miamour-lightpink/20" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-miamour-pink text-miamour-pink hover:bg-miamour-blush/30 relative overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-miamour-pink/10"
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink relative overflow-hidden shadow-lg hover:shadow-miamour-pink/20"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/10"
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-6 w-6 text-miamour-charcoal" />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link 
                      to={link.path} 
                      className="block py-2 text-miamour-charcoal hover:text-miamour-pink transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                {user ? (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link to="/dashboard">
                      <Button 
                        variant="outline" 
                        className="w-full border-miamour-pink text-miamour-pink hover:bg-miamour-blush/30"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      className="w-full bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link to="/login">
                      <Button 
                        variant="outline" 
                        className="w-full border-miamour-pink text-miamour-pink hover:bg-miamour-blush/30"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button 
                        className="w-full bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
