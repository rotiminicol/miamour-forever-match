
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a placeholder for authentication logic
    // In a real application, you'd connect to Supabase or another auth provider
    setTimeout(() => {
      toast({
        title: "Registration functionality",
        description: "This is a placeholder. Connect to Supabase for real authentication.",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-miamour-cream/50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md border border-miamour-blush">
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

            <Button
              type="submit"
              className="w-full bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

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
