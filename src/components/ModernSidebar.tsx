import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Heart, Users, Calendar, MessageSquare, User, Settings, Bell, CreditCard, 
         HelpCircle, LogOut, Search, ChevronRight, Home, HelpCircle as HelpCircleIcon, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ModernSidebar = () => {
  const { signOut, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSearch, setShowSearch] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsExpanded(false);
      else setIsExpanded(true);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [location.pathname, isMobile]);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/matches', label: 'Matches', icon: Heart },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const serviceItems = [
    { path: '/personalized-matchmaking', label: 'Matchmaking', icon: Users },
    { path: '/counseling', label: 'Counseling', icon: Heart },
    { path: '/therapy-sessions', label: 'Therapy Sessions', icon: HelpCircleIcon },
    { path: '/ceremony-planning', label: 'Ceremony Planning', icon: Calendar },
    { path: '/marriage-planning', label: 'Marriage Planning', icon: Calendar },
  ];

  const billingItems = [
    { path: '/billing-process', label: 'Payment Methods', icon: CreditCard },
    { path: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { path: '/transaction-history', label: 'Transaction History', icon: CreditCard },
    { path: '/discounts', label: 'Discounts', icon: CreditCard },
  ];

  const settingsItems = [
    { path: '/preferences', label: 'Preferences', icon: Settings },
    { path: '/privacy', label: 'Privacy', icon: Settings },
    { path: '/notifications', label: 'Notifications', icon: Bell },
  ];

  const supportItems = [
    { path: '/help-support', label: 'Get Help', icon: HelpCircle },
    { path: '/contact-us', label: 'Contact Us', icon: MessageSquare },
    { path: '/faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const renderNavLink = (item) => (
    <TooltipProvider key={item.path} delayDuration={!isExpanded ? 100 : 1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={item.path}
          >
            {({ isActive }) => (
              <div
                className={`relative flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white shadow-md' 
                    : 'hover:bg-miamour-blush/10 text-gray-700'
                } ${!isExpanded ? 'justify-center' : ''}`}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {hoveredItem === item.path && !isActive && (
                  <motion.span 
                    className="absolute inset-0 bg-miamour-blush/10 rounded-lg"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <item.icon size={20} className="z-10" />
                {isExpanded && (
                  <motion.span 
                    className="whitespace-nowrap overflow-hidden text-ellipsis z-10"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </div>
            )}
          </NavLink>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">{item.label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );

  const handleLogout = () => {
    signOut();
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const sidebarVariants = {
    expanded: { width: '260px' },
    collapsed: { width: '80px' }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <AnimatePresence>
        {isMobile && isExpanded && (
          <motion.div 
            className="fixed inset-0 bg-black/30 z-20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed md:sticky top-0 left-0 h-screen bg-white/95 border-r border-gray-100/50 z-30 overflow-hidden custom-scrollbar shadow-lg backdrop-blur-sm ${
          isMobile && !isExpanded ? 'w-0' : ''
        }`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute top-4 right-2 p-1.5 rounded-full hover:bg-gray-100/50 transition-all ${
              isMobile ? 'hidden' : 'block'
            } z-10`}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight size={16} />
            </motion.div>
          </button>

          <motion.div 
            className={`p-4 ${isExpanded ? 'justify-start' : 'justify-center'} flex items-center border-b border-gray-100/30`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {isExpanded ? (
              <motion.div 
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src="/lovable-uploads/miLogo2.png"
                  alt="MiAmour Logo"
                  className="h-10 w-10"
                />
                <span className="ml-2 font-serif text-lg font-medium bg-gradient-to-r from-miamour-pink to-miamour-burgundy bg-clip-text text-transparent">
                  MiAmour
                </span>
              </motion.div>
            ) : (
              <motion.img
                src="/lovable-uploads/miLogo2.png"
                alt="MiAmour Logo"
                className="h-8 w-8"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}
          </motion.div>

          <AnimatePresence>
            {isMobile && isExpanded && (
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-3 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close sidebar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <X size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <motion.div 
              className="px-2 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <button
                onClick={toggleSearch}
                className="w-full flex justify-center p-2 rounded-lg hover:bg-miamour-blush/20 text-gray-500 hover:text-miamour-pink transition-all"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {(isExpanded || showSearch) && (
              <motion.div 
                className={`px-4 my-2 ${!isExpanded && showSearch ? 'absolute top-16 left-16 z-50 bg-white shadow-lg rounded-lg p-4 min-w-64' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-miamour-pink/30 focus:border-miamour-pink transition-all"
                  />
                  {!isExpanded && showSearch && (
                    <button 
                      onClick={() => setShowSearch(false)} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-miamour-pink transition-all"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <nav className="px-2 py-2">
              <motion.div 
                className="mb-2"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                {isExpanded && (
                  <motion.p 
                    className="px-4 text-xs font-semibold text-gray-500/80 uppercase mt-2 mb-1"
                    variants={itemVariants}
                  >
                    Main Menu
                  </motion.p>
                )}
                <motion.div className="space-y-1" variants={sectionVariants}>
                  {menuItems.map((item) => (
                    <motion.div key={item.path} variants={itemVariants}>
                      {renderNavLink(item)}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                className="mb-2 mt-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                {isExpanded && (
                  <motion.p 
                    className="px-4 text-xs font-semibold text-gray-500/80 uppercase mt-2 mb-1"
                    variants={itemVariants}
                  >
                    Services
                  </motion.p>
                )}
                {!isExpanded && <div className="h-px bg-gray-100/30 my-3 mx-2"></div>}
                <motion.div className="space-y-1" variants={sectionVariants}>
                  {serviceItems.map((item) => (
                    <motion.div key={item.path} variants={itemVariants}>
                      {renderNavLink(item)}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                className="mb-2 mt-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                {isExpanded && (
                  <motion.p 
                    className="px-4 text-xs font-semibold text-gray-500/80 uppercase mt-2 mb-1"
                    variants={itemVariants}
                  >
                    Billing
                  </motion.p>
                )}
                {!isExpanded && <div className="h-px bg-gray-100/30 my-3 mx-2"></div>}
                <motion.div className="space-y-1" variants={sectionVariants}>
                  {billingItems.map((item) => (
                    <motion.div key={item.path} variants={itemVariants}>
                      {renderNavLink(item)}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                className="mb-2 mt-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                {isExpanded && (
                  <motion.p 
                    className="px-4 text-xs font-semibold text-gray-500/80 uppercase mt-2 mb-1"
                    variants={itemVariants}
                  >
                    Settings
                  </motion.p>
                )}
                {!isExpanded && <div className="h-px bg-gray-100/30 my-3 mx-2"></div>}
                <motion.div className="space-y-1" variants={sectionVariants}>
                  {settingsItems.map((item) => (
                    <motion.div key={item.path} variants={itemVariants}>
                      {renderNavLink(item)}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                className="mb-2 mt-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                {isExpanded && (
                  <motion.p 
                    className="px-4 text-xs font-semibold text-gray-500/80 uppercase mt-2 mb-1"
                    variants={itemVariants}
                  >
                    Support
                  </motion.p>
                )}
                {!isExpanded && <div className="h-px bg-gray-100/30 my-3 mx-2"></div>}
                <motion.div className="space-y-1" variants={sectionVariants}>
                  {supportItems.map((item) => (
                    <motion.div key={item.path} variants={itemVariants}>
                      {renderNavLink(item)}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </nav>
          </div>

          <div className={`p-4 border-t border-gray-100/30 ${isExpanded ? '' : 'flex flex-col items-center'}`}>
            {isExpanded && user && (
              <motion.div 
                className="flex items-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-miamour-pink to-miamour-burgundy flex items-center justify-center text-white shadow-sm">
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate">{user?.email || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">Premium Member</p>
                </div>
              </motion.div>
            )}
            
            <TooltipProvider delayDuration={!isExpanded ? 100 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={handleLogout}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-miamour-blush/20 w-full ${
                      !isExpanded ? 'justify-center' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut size={20} />
                    {isExpanded && <span>Log out</span>}
                  </motion.button>
                </TooltipTrigger>
                {!isExpanded && <TooltipContent side="right">Log out</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.aside>

      <AnimatePresence>
        {isMobile && !isExpanded && (
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="fixed top-4 left-4 z-30 p-2 bg-gradient-to-br from-miamour-pink to-miamour-burgundy rounded-full shadow-lg text-white"
            aria-label="Open menu"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernSidebar;