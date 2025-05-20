
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Heart, Users, Calendar, MessageSquare, User, Settings, Bell, CreditCard, 
         HelpCircle, LogOut, Search, ChevronRight, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const ModernSidebar = () => {
  const { signOut, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsExpanded(false);
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
    { path: '/therapy-sessions', label: 'Therapy Sessions', icon: Heart },
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
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) => 
        `flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
          isActive 
            ? 'bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white' 
            : 'hover:bg-miamour-blush/20 text-gray-700'
        } ${!isExpanded ? 'justify-center' : ''}`
      }
      title={!isExpanded ? item.label : ""}
    >
      <item.icon size={20} />
      {isExpanded && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
    </NavLink>
  );

  const handleLogout = () => {
    signOut();
  };

  // Sidebar variants for animation
  const sidebarVariants = {
    expanded: { width: '240px' },
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
        transition={{ duration: 0.2 }}
        className={`fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-100 z-30 overflow-hidden ${
          isMobile && !isExpanded ? 'w-0' : ''
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute top-4 right-2 p-1 rounded-full hover:bg-gray-100 ${
              isMobile ? 'hidden' : 'block'
            } z-10`}
          >
            <ChevronRight
              size={18}
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Logo */}
          <div className={`p-4 flex items-center ${isExpanded ? 'justify-start' : 'justify-center'} border-b border-gray-100`}>
            <img
              src="/lovable-uploads/miLogo2.png"
              alt="MiAmour Logo"
              className="h-10 w-10"
            />
            {isExpanded && <span className="ml-2 font-serif text-lg font-medium">MiAmour</span>}
          </div>

          {/* Mobile sidebar toggle */}
          {isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute top-4 right-3 md:hidden p-2 rounded-full hover:bg-miamour-blush/10"
            >
              <ChevronRight
                size={20}
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          )}

          {/* Search */}
          {isExpanded && (
            <div className="px-4 my-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-miamour-pink/30 focus:border-miamour-pink"
                />
              </div>
            </div>
          )}

          {/* Navigation links */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <nav className="px-2 py-2">
              <div className="mb-2">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Main Menu</p>}
                <div className="space-y-1 mt-2">
                  {menuItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Services</p>}
                <div className="space-y-1 mt-2">
                  {serviceItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Billing</p>}
                <div className="space-y-1 mt-2">
                  {billingItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Settings</p>}
                <div className="space-y-1 mt-2">
                  {settingsItems.map(renderNavLink)}
                </div>
              </div>

              <div className="mb-2 mt-4">
                {isExpanded && <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Support</p>}
                <div className="space-y-1 mt-2">
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
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-miamour-blush/20 w-full ${
                !isExpanded ? 'justify-center' : ''
              }`}
              title={!isExpanded ? "Log out" : ""}
            >
              <LogOut size={20} />
              {isExpanded && <span>Log out</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile toggle button (outside sidebar) */}
      {isMobile && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed top-4 left-4 z-30 p-2 bg-miamour-pink rounded-full shadow-lg text-white"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </>
  );
};

export default ModernSidebar;
