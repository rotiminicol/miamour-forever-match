
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
  });
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      // Only show after a short delay for better user experience
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    
    localStorage.setItem("cookie-consent", JSON.stringify(allPreferences));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    const preferences = { ...cookiePreferences, necessary: true }; // Necessary is always required
    
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowConsent(false);
  };

  const handlePreferenceChange = (key: keyof typeof cookiePreferences) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-x-0 bottom-0 z-50 p-4"
      >
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border border-gray-100">
          <div className="p-5 md:p-6">
            {!showPreferences ? (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="shrink-0 bg-pink-50 rounded-full p-3 hidden sm:block">
                  <Cookie className="h-7 w-7 text-miamour-burgundy" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-medium text-lg text-gray-900">We value your privacy</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="border-miamour-blush text-miamour-charcoal hover:bg-gray-50"
                    onClick={() => setShowPreferences(true)}
                  >
                    Cookie Settings
                  </Button>
                  <Button 
                    className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
                    onClick={handleAcceptAll}
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-50 rounded-full p-2">
                      <Cookie className="h-5 w-5 text-miamour-burgundy" />
                    </div>
                    <h3 className="font-medium text-lg text-gray-900">Cookie Preferences</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Necessary</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        These cookies are required for the website to function and cannot be disabled.
                      </p>
                    </div>
                    <div className="mt-1">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.necessary}
                        disabled
                        className="h-5 w-5 rounded border-gray-300 text-miamour-burgundy focus:ring-miamour-burgundy/30"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between bg-white border border-gray-100 p-4 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Functional</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        These cookies enable personalized features and functionality.
                      </p>
                    </div>
                    <div className="mt-1">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.functional}
                        onChange={() => handlePreferenceChange('functional')}
                        className="h-5 w-5 rounded border-gray-300 text-miamour-burgundy focus:ring-miamour-burgundy/30"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between bg-white border border-gray-100 p-4 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Analytics</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        These cookies help us improve our website by collecting anonymous usage data.
                      </p>
                    </div>
                    <div className="mt-1">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="h-5 w-5 rounded border-gray-300 text-miamour-burgundy focus:ring-miamour-burgundy/30"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between bg-white border border-gray-100 p-4 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Marketing</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        These cookies are used to track performance and deliver relevant ads.
                      </p>
                    </div>
                    <div className="mt-1">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        className="h-5 w-5 rounded border-gray-300 text-miamour-burgundy focus:ring-miamour-burgundy/30"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                  <Button 
                    variant="outline" 
                    className="border-miamour-blush text-miamour-charcoal hover:bg-gray-50"
                    onClick={() => setShowPreferences(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
                    onClick={handleSavePreferences}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
