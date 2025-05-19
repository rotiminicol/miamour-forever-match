
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Users, Settings, Calendar, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar toggle button for mobile */}
      <button
        className="md:hidden fixed left-4 top-20 z-50 bg-miamour-pink text-white p-2 rounded-full shadow-lg"
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
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed md:static top-0 left-0 h-full bg-white border-r border-miamour-lightpink/50 w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-miamour-lightpink/50">
          <div className="flex items-center mb-6">
            <Heart className="h-8 w-8 text-miamour-pink mr-2" />
            <span className="text-xl font-serif font-medium text-miamour-pink">MiAmour</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-miamour-blush flex items-center justify-center text-miamour-pink mr-3">
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
          <ul className="space-y-1">
            <li>
              <Link 
                to="/dashboard" 
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/dashboard' 
                    ? 'bg-miamour-pink text-white' 
                    : 'hover:bg-miamour-blush/50 text-miamour-charcoal'
                }`}
              >
                <Heart className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/matches" 
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/matches' 
                    ? 'bg-miamour-pink text-white' 
                    : 'hover:bg-miamour-blush/50 text-miamour-charcoal'
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>My Matches</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/messages" 
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/messages' 
                    ? 'bg-miamour-pink text-white' 
                    : 'hover:bg-miamour-blush/50 text-miamour-charcoal'
                }`}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/appointments" 
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/appointments' 
                    ? 'bg-miamour-pink text-white' 
                    : 'hover:bg-miamour-blush/50 text-miamour-charcoal'
                }`}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <span>Appointments</span>
              </Link>
            </li>
          </ul>

          <p className="text-xs font-semibold text-gray-500 mb-2 mt-6 pl-2">ACCOUNT</p>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/profile" 
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/profile' 
                    ? 'bg-miamour-pink text-white' 
                    : 'hover:bg-miamour-blush/50 text-miamour-charcoal'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/settings' 
                    ? 'bg-miamour-pink text-white' 
                    : 'hover:bg-miamour-blush/50 text-miamour-charcoal'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
