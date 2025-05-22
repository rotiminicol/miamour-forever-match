

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Check, CreditCard, Heart, Star } from "lucide-react";

type Currency = "NGN" | "USD" | "EUR";

type Plan = {
  id: string;
  name: string;
  price: string;
  priceUSD: string;
  priceEUR: string;
  period: string;
  features: string[];
  icon: JSX.Element;
  color: string;
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    id: "blossom",
    name: "Blossom Package",
    price: "₦75,000",
    priceUSD: "$20",
    priceEUR: "€18",
    period: "1 month",
    features: [
      "Exclusive matchmaking within your country",
      "Access to live sessions",
      "Basic profile verification",
      "Standard customer support",
    ],
    icon: <Star className="w-6 h-6 text-pink-600" />,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "harmony",
    name: "Harmony Package",
    price: "₦125,000",
    priceUSD: "$33",
    priceEUR: "€30",
    period: "3 months",
    features: [
      "Exclusive matchmaking within and outside your country",
      "Access to live sessions",
      "Priority profile verification",
      "Premium customer support",
      "Advanced matching algorithms",
    ],
    icon: <Star className="w-6 h-6 text-purple-600" />,
    color: "from-purple-500 to-indigo-500",
    recommended: true,
  },
  {
    id: "forever",
    name: "My Forever Package",
    price: "₦225,000",
    priceUSD: "$66",
    priceEUR: "€60",
    period: "6 months",
    features: [
      "Personal matches",
      "Private sessions",
      "Access to high-profile members",
      "Matches within and outside Nigeria",
      "VIP customer support",
      "Exclusive events access",
    ],
    icon: <Star className="w-6 h-6 text-amber-500" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "personalized",
    name: "Personalized Matching",
    price: "₦475,000",
    priceUSD: "$125",
    priceEUR: "€115",
    period: "1 year",
    features: [
      "Dedicated matchmaker",
      "Customized matching strategy",
      "Unlimited private sessions",
      "Global elite network access",
      "24/7 VIP support",
      "Premium event invitations",
    ],
    icon: <Heart className="w-6 h-6 text-red-500" />,
    color: "from-red-500 to-pink-500",
  },
];

// Map plan id to amount in NGN for demo payment
const planAmounts: Record<string, number> = {
  blossom: 75000,
  harmony: 125000,
  forever: 225000,
  personalized: 475000,
};

function getPlanPrice(plan: Plan, currency: Currency) {
  switch (currency) {
    case "USD":
      return plan.priceUSD;
    case "EUR":
      return plan.priceEUR;
    default:
      return plan.price;
  }
}

function PlanCard({
  plan,
  selected,
  onSelect,
  currency,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
  currency: Currency;
}) {
  return (
    <Card
      className={`
        relative group transition-all duration-200
        border-2
        ${selected
          ? "border-miamour-gold ring-2 ring-miamour-gold/40 scale-105 shadow-lg"
          : "border-miamour-blush/50 hover:scale-102 hover:shadow-md"}
        overflow-hidden
        bg-gradient-to-br ${plan.color}
        text-white
        min-h-[420px]
      `}
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${plan.name} plan`}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onSelect(); }}
      role="button"
    >
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-miamour-gold to-yellow-400 text-white text-sm font-bold px-5 py-1 rounded-full shadow-lg z-10">
          Recommended
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {plan.icon}
          <CardTitle className="text-xl font-serif">{plan.name}</CardTitle>
        </div>
        <CardDescription className="text-white/90">
          <span className="text-3xl font-bold">{getPlanPrice(plan, currency)}</span>
          <span className="ml-2 text-base font-medium">/ {plan.period}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mt-2">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="h-5 w-5 text-miamour-gold mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full mt-2 transition-all duration-150
            ${selected
              ? "bg-miamour-burgundy text-white shadow-lg"
              : "bg-white text-miamour-burgundy border border-miamour-burgundy hover:bg-miamour-blush/20"}
          `}
          aria-pressed={selected}
          tabIndex={-1}
        >
          {selected ? "Selected" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>("NGN");

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
      // Simulate payment and record in DB
      const amount = planAmounts[selectedPlan] || 0;

      const { error } = await supabase.from("payments").insert({
        user_id: user.id,
        amount,
        payment_method: "credit_card",
        status: "completed",
        service_type: "matching",
        plan_id: selectedPlan,
      });

      if (error) throw error;

      toast({
        title: "Payment Successful",
        description: "Thank you for your payment. You can now start matching!",
      });

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

  const selectedPlanObj = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="container max-w-7xl py-10">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-miamour-gold flex items-center justify-center text-white font-bold">1</div>
            <span className="text-xs mt-1">Select Plan</span>
          </div>
          <div className="w-8 h-1 bg-miamour-gold rounded" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-miamour-burgundy flex items-center justify-center text-white font-bold">2</div>
            <span className="text-xs mt-1">Payment</span>
          </div>
          <div className="w-8 h-1 bg-miamour-blush rounded" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-miamour-blush flex items-center justify-center text-white font-bold">3</div>
            <span className="text-xs mt-1">Success</span>
          </div>
        </div>
      </div>

      {/* Currency Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full bg-miamour-blush/30 p-1">
          {(["NGN", "USD", "EUR"] as Currency[]).map((cur) => (
            <button
              key={cur}
              className={`px-4 py-1 rounded-full font-medium transition-colors
                ${currency === cur
                  ? "bg-miamour-burgundy text-white"
                  : "text-miamour-burgundy hover:bg-miamour-blush/60"}
              `}
              onClick={() => setCurrency(cur)}
              aria-pressed={currency === cur}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selectedPlan === plan.id}
            onSelect={() => setSelectedPlan(plan.id)}
            currency={currency}
          />
        ))}
      </div>

      {/* Payment Details */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-miamour-blush max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">
          Payment Details
        </h2>
        <p className="mb-6 text-miamour-charcoal">
          In a real application, this would be a secure payment form integrated with Stripe or another payment processor.
          For demo purposes, we'll simulate a payment.
        </p>

        {/* Plan Summary */}
        {selectedPlanObj && (
          <div className="mb-6 flex items-center gap-4 bg-miamour-blush/20 rounded-lg p-4">
            <div className="flex-shrink-0">{selectedPlanObj.icon}</div>
            <div>
              <div className="font-bold text-miamour-burgundy">{selectedPlanObj.name}</div>
              <div className="text-miamour-burgundy/80 text-lg font-semibold">
                {getPlanPrice(selectedPlanObj, currency)} <span className="text-base font-normal">/ {selectedPlanObj.period}</span>
              </div>
            </div>
          </div>
        )}

        {/* Fake Card UI */}
        <div className="flex items-center justify-center p-6 border border-dashed border-miamour-blush rounded-lg mb-6 bg-miamour-blush/10">
          <div className="flex flex-col items-center">
            <CreditCard className="h-16 w-16 text-miamour-burgundy opacity-60 mb-2" />
            <div className="w-56 h-10 bg-miamour-burgundy/10 rounded-lg flex items-center px-4 text-miamour-burgundy font-mono tracking-widest text-lg opacity-60">
              4242 4242 4242 4242
            </div>
            <div className="flex gap-2 mt-2">
              <div className="w-16 h-6 bg-miamour-blush/40 rounded" />
              <div className="w-10 h-6 bg-miamour-blush/40 rounded" />
            </div>
            <span className="text-xs text-miamour-charcoal mt-2">Demo only</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/match-preferences")}
            aria-label="Back to match preferences"
          >
            Back
          </Button>
          <Button
            className="bg-miamour-burgundy text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-150"
            onClick={handlePayment}
            disabled={!selectedPlan || isLoading}
            aria-disabled={!selectedPlan || isLoading}
            aria-label="Complete Payment"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Processing...
              </span>
            ) : (
              "Complete Payment"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

