
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4 bg-miamour-cream/50">
      <div className="text-center">
        <Heart className="h-16 w-16 text-miamour-burgundy mx-auto mb-6" />
        <h1 className="text-6xl font-serif font-bold text-miamour-burgundy mb-4">404</h1>
        <h2 className="text-2xl font-medium text-miamour-burgundy mb-6">Page Not Found</h2>
        <p className="text-miamour-charcoal max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's help you find your way back to love.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/">
            <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30 w-full sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
