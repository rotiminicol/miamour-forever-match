
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState("processing"); // processing, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Process the OAuth callback
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("Auth error:", error);
          setStatus("error");
          setErrorMessage(error.message);
          toast({
            title: "Authentication error",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        // Check the hash fragment for session info
        const hashFragment = window.location.hash;
        const isPassReset = hashFragment.includes("type=recovery");
        setIsPasswordRecovery(isPassReset);
        
        if (isPassReset) {
          setStatus("success");
          setTimeout(() => {
            navigate("/reset-password");
          }, 2000);
          return;
        }
        
        setStatus("success");
        
        // Delay navigation slightly to show success message
        setTimeout(() => {
          toast({
            title: "Authentication successful",
            description: "You have successfully logged in.",
          });
          navigate("/dashboard");
        }, 2000);
        
      } catch (error) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setErrorMessage("An unexpected error occurred");
        toast({
          title: "Authentication error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  const handleRetry = () => {
    window.location.href = "/login";
  };

  if (status === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader />
          <p className="mt-8 text-miamour-burgundy font-medium">Processing your authentication...</p>
          <p className="text-sm text-gray-500">This will only take a moment.</p>
        </motion.div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 pb-6 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-medium mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-6">{errorMessage || "There was a problem with your authentication."}</p>
            <Button onClick={handleRetry} className="bg-miamour-burgundy text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 pb-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-medium mb-2">
              {isPasswordRecovery ? "Password Reset Link Valid" : "Authentication Successful"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isPasswordRecovery 
                ? "You'll be redirected to reset your password." 
                : "You're now signed in. Redirecting you to your dashboard..."}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 bg-miamour-pink rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-miamour-pink rounded-full animate-pulse delay-100"></div>
              <div className="h-2 w-2 bg-miamour-pink rounded-full animate-pulse delay-200"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthCallback;
