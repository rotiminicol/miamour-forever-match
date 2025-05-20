
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is actually a password reset session
    const checkIfResetSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      // If no type=recovery in URL, and no active session, redirect to forgot password
      if (!window.location.hash.includes('type=recovery') && !data.session) {
        navigate('/forgot-password');
      }
    };
    
    checkIfResetSession();
  }, [navigate]);

  const validatePassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsSuccess(true);
        toast({
          title: "Success",
          description: "Your password has been reset successfully",
        });
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Image Section */}
      <div className="hidden lg:block w-1/2 bg-miamour-burgundy/10 relative">
        <img 
          src="/lovable-uploads/7f02a8d8-0b0a-46fd-bb7b-3d63b35e1677.png" 
          alt="Couple in love" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-12">
          <div>
            <h2 className="text-4xl font-serif text-white mb-4">Create New Password</h2>
            <p className="text-white/90">Choose a strong password to secure your account</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <Heart className="h-8 w-8 text-miamour-burgundy" />
            </div>
            <h1 className="text-3xl font-serif font-medium text-miamour-burgundy mt-4">
              {isSuccess ? "Password Reset Complete" : "Reset Your Password"}
            </h1>
            <p className="text-miamour-charcoal mt-2">
              {isSuccess 
                ? "You can now sign in with your new password" 
                : "Enter your new password below"}
            </p>
          </div>

          {!isSuccess ? (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border-miamour-blush focus:border-miamour-burgundy focus:ring focus:ring-miamour-burgundy/30"
                />
                <p className="text-xs text-miamour-charcoal">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border-miamour-blush focus:border-miamour-burgundy focus:ring focus:ring-miamour-burgundy/30"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Reset Password"}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <p className="text-gray-600 mb-6">
                  Your password has been reset successfully. You will be redirected to the login page.
                </p>
                <Button 
                  onClick={() => navigate('/login')} 
                  className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
                >
                  Sign In Now
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
