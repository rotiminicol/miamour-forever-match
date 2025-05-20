
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Users, Settings, Calendar, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const menuLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Heart },
  { to: '/matches', label: 'My Matches', icon: Users },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/appointments', label: 'Appointments', icon: Calendar },
];

const accountLinks = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Only show sidebar for authenticated users
  if (!user) return null;

  // Animation variants
  const sidebarVariants = {
    closed: { x: '-100%' },
    open: { x: 0 },
  };

  // Only animate opacity for backdrop (pointerEvents is not animatable)
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Helper for active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
            className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar toggle button for mobile */}
      <motion.button
        whileTap={{ scale: 0.9, rotate: 15 }}
        className="md:hidden fixed left-4 top-6 z-50 bg-miamour-pink text-white p-2 rounded-full shadow-xl transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.aside
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed md:static top-0 left-0 h-full w-64 z-50 bg-white/80 backdrop-blur-xl border-r border-miamour-lightpink/50 shadow-2xl md:shadow-none transition-all`}
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
          >
            <div className="p-6 border-b border-miamour-lightpink/50">
              <div className="flex items-center mb-6">
                <img
                  src="/lovable-uploads/miLogo2.png"
                  alt="miamour Logo"
                  className="h-10 w-10 mr-2 rounded-full shadow-md object-contain bg-white"
                  style={{ background: 'white' }}
                />
                {/* Optionally, keep the brand name next to the logo */}
                <span className="text-xl font-serif font-medium text-miamour-pink tracking-wide">miamour.me</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-miamour-blush flex items-center justify-center text-miamour-pink mr-3 shadow-lg">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Welcome</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2 pl-2">MENU</p>
              <ul className="space-y-1 relative">
                {menuLinks.map(({ to, label, icon: Icon }) => (
                  <li key={to} className="relative">
                    <Link
                      to={to}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive(to)
                          ? 'bg-miamour-pink text-white shadow-lg'
                          : 'hover:bg-miamour-blush/60 hover:scale-[1.03] text-miamour-charcoal'
                      }`}
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      <Icon className="h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                      <span>{label}</span>
                      {isActive(to) && (
                        <motion.span
                          layoutId="active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded bg-miamour-pink shadow-md"
                          initial={{ scaleY: 0.5, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          exit={{ scaleY: 0.5, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold text-gray-500 mb-2 mt-6 pl-2">ACCOUNT</p>
              <ul className="space-y-1 relative">
                {accountLinks.map(({ to, label, icon: Icon }) => (
                  <li key={to} className="relative">
                    <Link
                      to={to}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive(to)
                          ? 'bg-miamour-pink text-white shadow-lg'
                          : 'hover:bg-miamour-blush/60 hover:scale-[1.03] text-miamour-charcoal'
                      }`}
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      <Icon className="h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                      <span>{label}</span>
                      {isActive(to) && (
                        <motion.span
                          layoutId="active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded bg-miamour-pink shadow-md"
                          initial={{ scaleY: 0.5, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          exit={{ scaleY: 0.5, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
