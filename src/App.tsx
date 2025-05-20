
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import WeddingMatching from "./pages/WeddingMatching";
import MatchStartPage from "./pages/MatchStartPage";
import ProfileSetup from "./pages/ProfileSetup";
import MatchPreferences from "./pages/MatchPreferences";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import MatchingDashboard from "./pages/MatchingDashboard";
import CouplesTherapy from "./pages/CouplesTherapy";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import Appointments from "./pages/Appointments";
import Notifications from "./pages/Notifications";
import { useAuth } from "./contexts/AuthContext";
import ModernSidebar from "./components/ModernSidebar";
import NotificationsProvider from "./contexts/NotificationsContext";
import CloudinaryProvider from "./contexts/CloudinaryContext";
import CookieConsent from "./components/CookieConsent";
import Loader from "./components/Loader";
import { useState, useEffect } from "react";
import Counseling from "./pages/Counseling";
import CeremonyPlanning from "./pages/CeremonyPlanning";
import TherapySessions from "./pages/TherapySessions";
import MarriagePlanning from "./pages/MarriagePlanning";
import PersonalizedMatchmaking from "./pages/PersonalizedMatchmaking";
import BillingProcess from "./pages/BillingProcess";
import Subscriptions from "./pages/Subscriptions";
import TransactionHistory from "./pages/TransactionHistory";
import Discounts from "./pages/Discounts";
import Preferences from "./pages/Preferences";
import Privacy from "./pages/Privacy";
import HelpSupport from "./pages/HelpSupport";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";

// Create a layout component to conditionally render the footer and navbar based on auth state
const AppLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Pages where we only show the component content (no navbar, sidebar, or footer)
  const fullScreenPages = ['/login', '/register', '/forgot-password', '/reset-password', '/auth/callback'];
  
  // Landing pages - show normal navbar and footer
  const landingPages = ['/', '/wedding-matching', '/couples-therapy', '/pricing'];
  
  // Only show footer on landing pages
  const showFooter = landingPages.includes(location.pathname);
  
  // Show the navbar only on landing pages or when user is not logged in
  const showNavbar = landingPages.includes(location.pathname) || !user;
  
  // Show sidebar when user is logged in and not on landing pages
  const showSidebar = user && !landingPages.includes(location.pathname) && !fullScreenPages.includes(location.pathname);

  // Handle start journey redirect
  const handleStartJourney = () => {
    return user ? <Navigate to="/dashboard" /> : <MatchStartPage />;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (fullScreenPages.includes(location.pathname) || location.pathname.startsWith('/auth/')) {
    return (
      <>
        <CookieConsent />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <CookieConsent />
      <div className="flex flex-col min-h-screen">
        {showNavbar && <Navbar />}
        
        <div className="flex flex-grow w-full">
          {showSidebar && <ModernSidebar />}
          
          <main className={`flex-grow w-full ${showSidebar ? 'md:ml-0' : ''} smooth-scroll`}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/wedding-matching" element={<WeddingMatching />} />
              <Route path="/start-matching" element={handleStartJourney()} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/match-preferences" element={<MatchPreferences />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/matches" element={<MatchingDashboard />} />
              <Route path="/couples-therapy" element={<CouplesTherapy />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/counseling" element={<Counseling />} />
              <Route path="/ceremony-planning" element={<CeremonyPlanning />} />
              <Route path="/therapy-sessions" element={<TherapySessions />} />
              <Route path="/marriage-planning" element={<MarriagePlanning />} />
              <Route path="/personalized-matchmaking" element={<PersonalizedMatchmaking />} />
              <Route path="/billing-process" element={<BillingProcess />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/transaction-history" element={<TransactionHistory />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        
        {showFooter && <Footer />}
      </div>
    </>
  );
};

// Create a new QueryClient in a functional component rather than at module level
const App = () => {
  // Instantiate QueryClient inside the component to ensure proper React context
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CloudinaryProvider>
            <NotificationsProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppLayout />
              </BrowserRouter>
            </NotificationsProvider>
          </CloudinaryProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
