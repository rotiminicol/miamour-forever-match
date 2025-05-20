
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "Email sent",
          description: "Check your email for the password reset link",
        });
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
            <h2 className="text-4xl font-serif text-white mb-4">Reset Your Password</h2>
            <p className="text-white/90">We'll send you instructions to reset your password</p>
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
              {isSubmitted ? "Check Your Email" : "Forgot Password"}
            </h1>
            <p className="text-miamour-charcoal mt-2">
              {isSubmitted 
                ? "We've sent you instructions to reset your password" 
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          {!isSubmitted ? (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="border-miamour-blush focus:border-miamour-burgundy focus:ring focus:ring-miamour-burgundy/30"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-miamour-burgundy hover:text-miamour-burgundy/80"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-blue-800">Email Sent</h3>
                <p className="text-blue-600 mt-2">
                  We've sent a password reset link to: <br />
                  <span className="font-medium">{email}</span>
                </p>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Didn't receive the email? Check your spam folder or:
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="border-miamour-blush text-miamour-burgundy"
                >
                  {isLoading ? "Sending..." : "Resend Email"}
                </Button>
                <div>
                  <Link
                    to="/login"
                    className="inline-flex items-center text-miamour-burgundy hover:text-miamour-burgundy/80"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
