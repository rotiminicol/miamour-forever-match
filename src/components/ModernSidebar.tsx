
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { 
  Heart, Users, Settings, Calendar, MessageCircle, User,
  CreditCard, FileText, Gift, Shield, Home, Sparkles,
  HelpCircle, LogOut, ChevronDown, Bell, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

type CategoryItem = {
  icon: JSX.Element;
  text: string;
  to: string;
  badge?: number;
}

type Categories = {
  services: CategoryItem[];
  billing: CategoryItem[];
  settings: CategoryItem[];
  support: CategoryItem[];
}

const ModernSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('services');
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { notifications, clearNotifications } = useNotifications();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Categories with their respective items
  const categories: Categories = {
    services: [
      { icon: <Heart size={18} className="text-pink-500" />, text: 'Counseling', to: '/marriage-counseling' },
      { icon: <Calendar size={18} className="text-teal-500" />, text: 'Appointments', to: '/appointments' },
      { icon: <Home size={18} className="text-amber-500" />, text: 'Ceremony Planning', to: '/ceremony-planning' },
      { icon: <Users size={18} className="text-blue-500" />, text: 'Therapy Sessions', to: '/therapy' },
      { icon: <Home size={18} className="text-amber-500" />, text: 'Marriage Planning', to: '/marriage-planning' },
      { icon: <Sparkles size={18} className="text-pink-400" />, text: 'Personalized Matchmaking', to: '/personalized-matchmaking' },
    ],
    billing: [
      { icon: <CreditCard size={18} className="text-green-500" />, text: 'Payment Methods', to: '/billing-process' },
      { icon: <CreditCard size={18} className="text-green-600" />, text: 'Subscriptions', to: '/subscriptions' },
      { icon: <FileText size={18} className="text-green-400" />, text: 'Invoices', to: '/invoices' },
      { icon: <Gift size={18} className="text-green-700" />, text: 'Discounts', to: '/discounts' },
    ],
    settings: [
      { icon: <User size={18} className="text-blue-500" />, text: 'My Account', to: '/profile' },
      { icon: <Settings size={18} className="text-blue-600" />, text: 'Preferences', to: '/preference' },
      { icon: <Shield size={18} className="text-blue-400" />, text: 'Privacy', to: '/privacy' },
    ],
    support: [
      { icon: <HelpCircle size={18} className="text-orange-500" />, text: 'Get Help', to: '/help-support' },
      { icon: <MessageCircle size={18} className="text-orange-400" />, text: 'Contact Us', to: '/contact-us' },
      { icon: <HelpCircle size={18} className="text-orange-600" />, text: 'FAQs', to: '/faqs' },
      { icon: <HelpCircle size={18} className="text-orange-300" />, text: 'Resources', to: '/resources' },
    ]
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Only show sidebar for authenticated users
  if (!user) return null;

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Helper for active link
  const isActive = (path: string) => location.pathname === path;
  
  // Animation variants
  const sidebarVariants = {
    closed: { width: 0, opacity: 0 },
    open: { width: "280px", opacity: 1 },
  };

  const mobileMenuVariants = {
    closed: { x: "-100%" },
    open: { x: 0 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar toggle button for mobile */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed left-4 top-4 z-50 bg-white text-miamour-pink p-2 rounded-full shadow-xl border border-pink-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full z-40 md:hidden"
          >
            <div className="h-full w-[280px] bg-white shadow-lg border-r border-gray-100 flex flex-col">
              {renderSidebarContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block relative">
        <motion.div
          initial="closed"
          animate="open"
          variants={sidebarVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-screen w-[280px] bg-white border-r border-gray-100 flex flex-col fixed top-0 left-0 z-30"
        >
          {renderSidebarContent()}
        </motion.div>
        
        {/* This creates space for the fixed sidebar */}
        <div className="w-[280px] flex-shrink-0"></div>
      </div>
    </>
  );
  
  function renderSidebarContent() {
    return (
      <>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/miLogo2.png"
              alt="MiAmour Logo"
              className="h-10 w-10 rounded-full shadow-sm object-contain bg-white"
            />
            <div className="flex flex-col">
              <span className="text-lg font-serif font-medium text-miamour-pink">miamour.me</span>
              <span className="text-xs text-gray-500">Find Your Perfect Match</span>
            </div>
          </div>
        </div>
        
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-pink-100">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-miamour-pink text-white">
                {user.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.user_metadata?.full_name || user.email}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto p-2 smooth-scroll">
          {/* Core Navigation */}
          <div className="mb-2">
            <Link to="/dashboard" className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isActive('/dashboard') ? 'bg-pink-50 text-miamour-pink' : 'hover:bg-pink-50/50'}`}>
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            
            <Link to="/matches" className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isActive('/matches') ? 'bg-pink-50 text-miamour-pink' : 'hover:bg-pink-50/50'}`}>
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">My Matches</span>
            </Link>
            
            <Link to="/messages" className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isActive('/messages') ? 'bg-pink-50 text-miamour-pink' : 'hover:bg-pink-50/50'}`}>
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Messages</span>
            </Link>
          </div>
          
          {/* Categories */}
          <div className="space-y-1">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="mb-1">
                <button 
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <span className="font-medium capitalize">{category}</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Category items */}
                <AnimatePresence>
                  {expandedCategory === category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-3 pr-1 py-1 space-y-1">
                        {items.map((item, idx) => (
                          <Link
                            key={`${category}-${idx}`}
                            to={item.to}
                            className={`flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                              isActive(item.to) 
                                ? 'bg-pink-50 text-miamour-pink' 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              <span>{item.text}</span>
                            </div>
                            {item.badge && (
                              <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        
        {/* Notification button & bottom buttons */}
        <div className="p-3 border-t border-gray-100 space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 text-left relative border-pink-100 hover:bg-pink-50"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-4 w-4 text-miamour-pink" />
            <span>Notifications</span>
            {unreadNotifications > 0 && (
              <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-miamour-pink">
                {unreadNotifications}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 text-left border-pink-100 hover:bg-pink-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 text-miamour-pink" />
            <span>Sign Out</span>
          </Button>
        </div>
      </>
    );
  }
};

export default ModernSidebar;
