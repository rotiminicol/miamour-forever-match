
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Heart, Users, Calendar, MessageSquare, User, Settings, Bell, CreditCard, 
         HelpCircle, LogOut, Search, ChevronRight, Home, HelpCircleIcon, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ModernSidebar = () => {
  const { signOut, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsExpanded(false);
      else setIsExpanded(true); // Default to expanded on desktop
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when route changes
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
            className={({ isActive }) => 
              `flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white' 
                  : 'hover:bg-miamour-blush/20 text-gray-700'
              } ${!isExpanded ? 'justify-center' : ''}`
            }
          >
            <item.icon size={!isExpanded ? 20 : 18} />
            {isExpanded && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
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

  // Sidebar variants for animation
  const sidebarVariants = {
    expanded: { width: '260px' },
    collapsed: { width: '72px' }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black/30 z-20"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-100 z-30 overflow-hidden custom-scrollbar shadow-sm ${
          isMobile && !isExpanded ? 'w-0' : ''
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button for desktop */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute top-4 right-2 p-1.5 rounded-full hover:bg-gray-100 ${
              isMobile ? 'hidden' : 'block'
            } z-10`}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronRight
              size={16}
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Logo */}
          <div className={`p-4 ${isExpanded ? 'justify-start' : 'justify-center'} flex items-center border-b border-gray-100`}>
            {isExpanded ? (
              <div className="flex items-center">
                <img
                  src="/lovable-uploads/miLogo2.png"
                  alt="MiAmour Logo"
                  className="h-10 w-10"
                />
                <span className="ml-2 font-serif text-lg font-medium">MiAmour</span>
              </div>
            ) : (
              <img
                src="/lovable-uploads/miLogo2.png"
                alt="MiAmour Logo"
                className="h-8 w-8"
              />
            )}
          </div>

          {/* Mobile close button */}
          {isMobile && isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-3 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}

          {/* Search toggle for collapsed state */}
          {!isExpanded && (
            <div className="px-2 py-3">
              <button
                onClick={toggleSearch}
                className="w-full flex justify-center p-2 rounded-lg hover:bg-miamour-blush/20 text-gray-500"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Search expanded */}
          {(isExpanded || showSearch) && (
            <div className={`px-4 my-2 ${!isExpanded && showSearch ? 'absolute top-16 left-16 z-50 bg-white shadow-lg rounded-lg p-4 min-w-64' : ''}`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-miamour-pink/30 focus:border-miamour-pink"
                />
                {!isExpanded && showSearch && (
                  <button 
                    onClick={() => setShowSearch(false)} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation links */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <nav className="px-2 py-2">
              <div className="mb-2">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase mt-2 mb-1">Main Menu</p>}
                <div className="space-y-1">
                  {menuItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase mt-2 mb-1">Services</p>}
                {!isExpanded && <div className="h-px bg-gray-100 my-3 mx-2"></div>}
                <div className="space-y-1">
                  {serviceItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase mt-2 mb-1">Billing</p>}
                {!isExpanded && <div className="h-px bg-gray-100 my-3 mx-2"></div>}
                <div className="space-y-1">
                  {billingItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase mt-2 mb-1">Settings</p>}
                {!isExpanded && <div className="h-px bg-gray-100 my-3 mx-2"></div>}
                <div className="space-y-1">
                  {settingsItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase mt-2 mb-1">Support</p>}
                {!isExpanded && <div className="h-px bg-gray-100 my-3 mx-2"></div>}
                <div className="space-y-1">
                  {supportItems.map(renderNavLink)}
                </div>
              </div>
            </nav>
          </div>

          {/* User profile & logout */}
          <div className={`p-4 border-t border-gray-100 ${isExpanded ? '' : 'flex flex-col items-center'}`}>
            {isExpanded && user && (
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-miamour-blush flex items-center justify-center text-miamour-burgundy">
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate">{user?.email || "User"}</p>
                </div>
              </div>
            )}
            
            <TooltipProvider delayDuration={!isExpanded ? 100 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-miamour-blush/20 w-full ${
                      !isExpanded ? 'justify-center' : ''
                    }`}
                  >
                    <LogOut size={isExpanded ? 18 : 20} />
                    {isExpanded && <span>Log out</span>}
                  </button>
                </TooltipTrigger>
                {!isExpanded && <TooltipContent side="right">Log out</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.aside>

      {/* Mobile toggle button (outside sidebar) */}
      {isMobile && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed top-4 left-4 z-30 p-2 bg-miamour-pink rounded-full shadow-lg text-white"
          aria-label="Open menu"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </>
  );
};

export default ModernSidebar;
