import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Apple, Facebook } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome back to MiAmour!",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Login error",
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
            <h2 className="text-4xl font-serif text-white mb-4">Find Your Perfect Match</h2>
            <p className="text-white/90">Join thousands of happy couples who found love through MiAmour</p>
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
              Welcome Back
            </h1>
            <p className="text-miamour-charcoal mt-2">
              Sign in to continue your love journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-miamour-burgundy hover:text-miamour-burgundy/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border-miamour-blush focus:border-miamour-burgundy focus:ring focus:ring-miamour-burgundy/30"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-miamour-blush" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-miamour-charcoal">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="border-miamour-blush">
                {/* Replace with a generic icon or SVG for Google */}
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <g>
                    <circle cx="12" cy="12" r="10" fill="#EA4335" />
                    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial">G</text>
                  </g>
                </svg>
              </Button>
              <Button variant="outline" className="border-miamour-blush">
                <Facebook className="h-4 w-4 text-blue-600" />
              </Button>
              <Button variant="outline" className="border-miamour-blush">
                <Apple className="h-4 w-4 text-gray-800" />
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-miamour-charcoal">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-miamour-burgundy hover:text-miamour-burgundy/80 transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;