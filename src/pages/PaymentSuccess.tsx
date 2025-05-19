
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 bg-miamour-cream/50">
      <div className="w-full max-w-lg text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-miamour-blush">
          <div className="text-center">
            <div className="inline-flex items-center justify-center text-green-500 mb-4">
              <CheckCircle className="h-16 w-16" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-miamour-burgundy">
              Payment Successful!
            </h1>
            <p className="text-miamour-charcoal mt-4 mb-8">
              Thank you for your purchase. Your journey with MiAmour has officially begun. We're excited to help you find and nurture love.
            </p>
            
            <div className="bg-miamour-cream p-6 rounded-lg mb-8">
              <h2 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">
                What's Next?
              </h2>
              <p className="text-miamour-charcoal mb-4">
                Our team will be in touch shortly with next steps to get started with your selected services.
              </p>
              <ul className="text-left space-y-2">
                <li className="flex">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Check your email for confirmation details</span>
                </li>
                <li className="flex">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Complete your profile to improve matching</span>
                </li>
                <li className="flex">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Schedule your first therapy session (if applicable)</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30 w-full sm:w-auto">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
