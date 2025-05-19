import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
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

// Create a layout component to conditionally render the footer
const AppLayout = () => {
  const location = useLocation();

  // Pages where Navbar, Sidebar, and Footer should NOT be shown
  const fullScreenPages = ['/login', '/register'];

  // Only show footer on the home page
  const showFooter = location.pathname === '/';

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
      <Navbar />
      <div className="flex flex-grow w-full">
        <Sidebar />
        <main className="flex-grow w-full">
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
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;