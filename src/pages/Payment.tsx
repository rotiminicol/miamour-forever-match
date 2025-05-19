
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Check, CreditCard, Heart } from "lucide-react";

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$29.99",
      features: [
        "5 potential matches per month",
        "Basic compatibility report",
        "Email support",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$49.99",
      features: [
        "15 potential matches per month",
        "Detailed compatibility report",
        "Priority email support",
        "1 video consultation per month",
      ],
      recommended: true,
    },
    {
      id: "vip",
      name: "VIP",
      price: "$99.99",
      features: [
        "Unlimited potential matches",
        "Advanced compatibility algorithms",
        "Dedicated relationship coach",
        "3 video consultations per month",
        "Priority matching",
      ],
    },
  ];

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please log in to continue.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!selectedPlan) {
      toast({
        title: "No plan selected",
        description: "Please select a subscription plan to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would integrate with Stripe or another payment processor
      // For now, just simulate a payment and record it in the database
      
      // Determine amount based on selected plan
      let amount = 29.99;
      if (selectedPlan === "premium") amount = 49.99;
      if (selectedPlan === "vip") amount = 99.99;

      // Insert payment record
      const { error } = await supabase.from("payments").insert({
        user_id: user.id,
        amount,
        payment_method: "credit_card",
        status: "completed", // In a real app, this would be set after confirmation from payment processor
        service_type: "matching",
      });

      if (error) throw error;

      toast({
        title: "Payment Successful",
        description: "Thank you for your payment. You can now start matching!",
      });

      // Navigate to matching success page
      navigate("/payment-success");
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-2">Choose Your Plan</h1>
        <p className="text-miamour-charcoal max-w-xl mx-auto">
          Select a subscription plan that fits your needs and start your journey to finding love.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`
              border 
              ${selectedPlan === plan.id ? "border-miamour-gold ring-2 ring-miamour-gold/30" : "border-miamour-blush/50"}
              ${plan.recommended ? "relative" : ""}
            `}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-miamour-gold text-white text-sm font-medium px-4 py-1 rounded-full">
                Recommended
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-serif text-miamour-burgundy flex items-center">
                <Heart className="mr-2 h-5 w-5 text-miamour-gold" />
                {plan.name} Plan
              </CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span> / month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-miamour-gold mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  selectedPlan === plan.id
                    ? "bg-miamour-burgundy text-white"
                    : "bg-white text-miamour-burgundy border border-miamour-burgundy hover:bg-miamour-blush/20"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow border border-miamour-blush max-w-xl mx-auto">
        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Payment Details</h2>
        <p className="mb-6 text-miamour-charcoal">
          In a real application, this would be a secure payment form integrated with Stripe or another payment processor.
          For demo purposes, we'll simulate a payment.
        </p>

        <div className="flex items-center justify-center p-6 border border-dashed border-miamour-blush rounded-lg mb-6">
          <CreditCard className="h-16 w-16 text-miamour-burgundy opacity-50" />
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/match-preferences")}
          >
            Back
          </Button>
          <Button
            className="bg-miamour-burgundy text-white"
            onClick={handlePayment}
            disabled={!selectedPlan || isLoading}
          >
            {isLoading ? "Processing..." : "Complete Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
