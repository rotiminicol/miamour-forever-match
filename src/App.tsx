
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import Appointments from "./pages/Appointments";
import Notifications from "./pages/Notifications";
import { useAuth } from "./contexts/AuthContext";
import ModernSidebar from "./components/ModernSidebar";
import NotificationsProvider from "./contexts/NotificationsContext";

// Create a layout component to conditionally render the footer and navbar based on auth state
const AppLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Pages where we only show the component content (no navbar, sidebar, or footer)
  const fullScreenPages = ['/login', '/register'];
  
  // Landing pages - show normal navbar and footer
  const landingPages = ['/', '/wedding-matching', '/couples-therapy', '/pricing'];
  
  // Only show footer on landing pages
  const showFooter = landingPages.includes(location.pathname);
  
  // Show the navbar only on landing pages or when user is not logged in
  const showNavbar = landingPages.includes(location.pathname) || !user;
  
  // Show sidebar when user is logged in and not on landing pages
  const showSidebar = user && !landingPages.includes(location.pathname) && !fullScreenPages.includes(location.pathname);

  if (fullScreenPages.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      
      <div className="flex flex-grow w-full">
        {showSidebar && <ModernSidebar />}
        
        <main className={`flex-grow w-full ${showSidebar ? 'md:ml-0' : ''} smooth-scroll`}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wedding-matching" element={<WeddingMatching />} />
            <Route path="/start-matching" element={<MatchStartPage />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      
      {showFooter && <Footer />}
    </div>
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
          <NotificationsProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </NotificationsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
