
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Apple, Facebook } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!acceptedTerms) {
      toast({
        title: "Terms and Conditions",
        description: "You must accept the terms and privacy policy to continue",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Registration successful",
          description: "Welcome to miamour! Please check your email to confirm your account.",
        });
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        toast({
          title: "Authentication failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        toast({
          title: "Authentication failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAppleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        toast({
          title: "Authentication failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Image Section */}
      <div className="hidden lg:block w-1/2 bg-miamour-burgundy/10 relative">
        <img 
          src="/lovable-uploads/70afdab7-cb7a-4e0d-bb1b-55e99da53d1d.png" 
          alt="Couple in love" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-12">
          <div>
            <h2 className="text-4xl font-serif text-white mb-4">Begin Your Love Story</h2>
            <p className="text-white/90">Create your account and start connecting with potential matches today</p>
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
              Create Your Account
            </h1>
            <p className="text-miamour-charcoal mt-2">
              Begin your journey to love and connection
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  required
                  className="border-miamour-blush focus:border-miamour-burgundy focus:ring focus:ring-miamour-burgundy/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Your last name"
                  required
                  className="border-miamour-blush focus:border-miamour-burgundy focus:ring focus:ring-miamour-burgundy/30"
                />
              </div>
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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

            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="data-[state=checked]:bg-miamour-burgundy data-[state=checked]:border-miamour-burgundy"
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="terms" className="text-miamour-charcoal cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-miamour-burgundy hover:text-miamour-burgundy/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-miamour-burgundy hover:text-miamour-burgundy/80">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-miamour-blush" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-miamour-charcoal">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="border-miamour-blush"
                onClick={handleGoogleSignUp}
                type="button"
              >
                {/* Google icon SVG */}
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <g>
                    <path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148s2.75-6.148 6.125-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.531-6.656-2.531-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.148-.156-1.648z"/>
                    <path fill="#34A853" d="M3.545 7.545l3.273 2.402c.891-1.742 2.578-2.945 4.687-2.945 1.109 0 2.125.383 2.922 1.016l2.703-2.633c-1.711-1.57-3.922-2.531-6.656-2.531-3.984 0-7.344 2.617-8.672 6.148z"/>
                    <path fill="#FBBC05" d="M12 22c2.672 0 4.922-.883 6.563-2.398l-3.047-2.5c-.844.57-1.922.914-3.516.914-2.789 0-5.148-1.883-5.992-4.414l-3.273 2.531c1.617 3.367 5.125 5.867 9.265 5.867z"/>
                    <path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148s2.75-6.148 6.125-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.531-6.656-2.531-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.148-.156-1.648z"/>
                  </g>
                </svg>
              </Button>
              <Button 
                variant="outline" 
                className="border-miamour-blush"
                onClick={handleFacebookSignUp}
                type="button"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
              </Button>
              <Button 
                variant="outline" 
                className="border-miamour-blush"
                onClick={handleAppleSignUp}
                type="button"
              >
                <Apple className="h-4 w-4 text-gray-800" />
              </Button>
            </div>

            <p className="text-xs text-center text-miamour-charcoal">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-miamour-burgundy hover:text-miamour-burgundy/80">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-miamour-burgundy hover:text-miamour-burgundy/80">
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          <div className="mt-8 text-center">
            <p className="text-miamour-charcoal">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-miamour-burgundy hover:text-miamour-burgundy/80 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
