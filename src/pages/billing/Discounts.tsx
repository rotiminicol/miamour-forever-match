
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Gift, Clock, Tag, AlertCircle, CheckCircle } from "lucide-react";

const Discounts = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoMessage, setPromoMessage] = useState<{type: string, message: string} | null>(null);
  
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API check
    setTimeout(() => {
      if (promoCode.toUpperCase() === "WELCOME25") {
        setPromoMessage({
          type: "success",
          message: "Promo code applied! You'll receive 25% off on your next payment."
        });
      } else {
        setPromoMessage({
          type: "error",
          message: "Invalid or expired promo code. Please try again."
        });
      }
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Sample active discounts
  const activeDiscounts = [
    {
      id: "disc-001",
      name: "New Member Discount",
      description: "25% off for your first 3 months",
      expires: "August 15, 2025",
      status: "active"
    }
  ];
  
  // Sample available offers
  const availableOffers = [
    {
      id: "offer-001",
      name: "Annual Subscription",
      description: "Save 20% when you switch to annual billing",
      value: "20% off"
    },
    {
      id: "offer-002",
      name: "Refer a Friend",
      description: "Get one month free when a friend signs up",
      value: "1 month free"
    },
    {
      id: "offer-003",
      name: "Premium Upgrade",
      description: "50% off your first month of Premium",
      value: "50% off"
    }
  ];
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Discounts & Offers</h1>
          <p className="text-miamour-charcoal text-lg">
            Manage your promotional codes and special offers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                Apply a Promo Code
              </CardTitle>
              <CardDescription>
                Enter your code to redeem special discounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePromoSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-miamour-burgundy text-white" 
                    disabled={isSubmitting || !promoCode}
                  >
                    {isSubmitting ? "Applying..." : "Apply Code"}
                  </Button>
                </div>
                
                {promoMessage && (
                  <div className={`flex items-start p-3 rounded-md ${
                    promoMessage.type === "success" 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {promoMessage.type === "success" ? (
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    )}
                    <p className="text-sm">{promoMessage.message}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                Need a Promo Code?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <Gift className="h-12 w-12 text-miamour-pink mx-auto mb-4 opacity-80" />
              <p className="text-miamour-charcoal mb-4">
                Follow us on social media or subscribe to our newsletter for exclusive promotions!
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Subscribe to Newsletter
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Active Discounts</h2>
        {activeDiscounts.length > 0 ? (
          <div className="space-y-4 mb-10">
            {activeDiscounts.map((discount) => (
              <Card key={discount.id} className="border-2 border-miamour-pink/30">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-miamour-blush/30 p-3 rounded-full">
                        <Tag className="h-6 w-6 text-miamour-burgundy" />
                      </div>
                      <div>
                        <h3 className="font-medium text-miamour-burgundy mb-1">{discount.name}</h3>
                        <p className="text-sm text-gray-600">{discount.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Expires: {discount.expires}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-miamour-pink/90 text-white self-start md:self-center">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mb-10">
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">You don't have any active discounts at the moment.</p>
            </CardContent>
          </Card>
        )}
        
        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Available Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {availableOffers.map((offer) => (
            <Card key={offer.id} className="hover-3d">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-serif font-medium text-miamour-burgundy">{offer.name}</CardTitle>
                  <Badge variant="outline" className="text-miamour-burgundy border-miamour-burgundy">{offer.value}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-6">{offer.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-miamour-burgundy text-white">Redeem Offer</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-miamour-blush/20 p-6 rounded-lg">
          <h2 className="text-xl font-serif font-medium text-miamour-burgundy mb-4">Discount Terms & Conditions</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Promotional codes cannot be combined with other offers unless specifically stated.</p>
            <p>• Discounts apply to the base subscription price and not to add-on services.</p>
            <p>• miamour reserves the right to modify or cancel promotions at any time.</p>
            <p>• Refunds will not be provided for the difference if a promo code is applied after purchase.</p>
            <p>• Some promotions may be limited to new members only.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
