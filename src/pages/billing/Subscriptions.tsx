

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Calendar, AlertCircle, Star, Heart } from "lucide-react";

const matchmakingPlans = [
  {
    id: 'blossom',
    name: 'Blossom Package',
    price: '₦75,000',
    priceUSD: '$20',
    priceEUR: '€18',
    period: '1 month',
    features: [
      'Exclusive matchmaking within your country',
      'Access to live sessions',
      'Basic profile verification',
      'Standard customer support'
    ],
    icon: <Star className="w-6 h-6 text-pink-600" />,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'harmony',
    name: 'Harmony Package',
    price: '₦125,000',
    priceUSD: '$33',
    priceEUR: '€30',
    period: '3 months',
    features: [
      'Exclusive matchmaking within and outside your country',
      'Access to live sessions',
      'Priority profile verification',
      'Premium customer support',
      'Advanced matching algorithms'
    ],
    icon: <Star className="w-6 h-6 text-purple-600" />,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'forever',
    name: 'My Forever Package',
    price: '₦225,000',
    priceUSD: '$66',
    priceEUR: '€60',
    period: '6 months',
    features: [
      'Personal matches',
      'Private sessions',
      'Access to high-profile members',
      'Matches within and outside Nigeria',
      'VIP customer support',
      'Exclusive events access'
    ],
    icon: <Star className="w-6 h-6 text-amber-500" />,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'personalized',
    name: 'Personalized Matching',
    price: '₦475,000',
    priceUSD: '$125',
    priceEUR: '€115',
    period: '1 year',
    features: [
      'Dedicated matchmaker',
      'Customized matching strategy',
      'Unlimited private sessions',
      'Global elite network access',
      '24/7 VIP support',
      'Premium event invitations'
    ],
    icon: <Heart className="w-6 h-6 text-red-500" />,
    color: 'from-red-500 to-pink-500'
  }
];

const therapyPlans = [
  {
    id: 1,
    name: "Reset Package",
    description: "For those needing a fresh start",
    sessions: 5,
    priceNGN: 250000,
    priceUSD: 156.25,
    save: "15%",
    features: [
      "Comprehensive assessment",
      "New perspective techniques",
      "Goal setting",
      "Action plan development"
    ]
  },
  {
    id: 2,
    name: "Healing Plan",
    description: "Deep emotional work and recovery",
    sessions: 5,
    priceNGN: 350000,
    priceUSD: 218.75,
    save: "25%",
    popular: true,
    features: [
      "Emotional healing",
      "Trauma recovery",
      "Mind-body connection",
      "Resilience building"
    ]
  },
  {
    id: 3,
    name: "Mindful Living",
    description: "Focus on stress and anxiety reduction",
    sessions: 5,
    priceNGN: 300000,
    priceUSD: 156.25,
    save: "15%",
    features: [
      "Mindfulness practices",
      "Stress management",
      "Relaxation techniques",
      "Coping strategies"
    ]
  },
  {
    id: 4,
    name: "Inner Peace",
    description: "Managing depression and finding balance",
    sessions: 5,
    priceNGN: 400000,
    priceUSD: 250.00,
    save: "35%",
    features: [
      "Depression management",
      "Mood regulation",
      "Mindfulness training",
      "Life balance"
    ]
  },
  {
    id: 5,
    name: "Confidence Package",
    description: "Self-esteem and personal growth",
    sessions: 5,
    priceNGN: 450000,
    priceUSD: 187.50,
    save: "20%",
    features: [
      "Self-esteem building",
      "Personal growth",
      "Boundary setting",
      "Empowerment techniques"
    ]
  }
];

const Subscriptions = () => {
  // Track selected plan type and id
  const [selectedPlanType, setSelectedPlanType] = useState<"matchmaking" | "therapy">("matchmaking");
  const [currentPlanId, setCurrentPlanId] = useState<string | number>("blossom");

  // Helper for current plan display
  const getCurrentPlan = () => {
    if (selectedPlanType === "matchmaking") {
      return matchmakingPlans.find((p) => p.id === currentPlanId);
    }
    return therapyPlans.find((p) => p.id === currentPlanId);
  };

  // Helper for price display
  const getCurrentPlanPrice = () => {
    const plan = getCurrentPlan();
    if (!plan) return "";
    if (selectedPlanType === "matchmaking") {
      // Type guard: plan is a matchmaking plan
      if ("price" in plan) {
        return plan.price;
      }
      return "";
    } else {
      // plan is a therapy plan
      return `₦${plan.priceNGN?.toLocaleString()}`;
    }
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Your Subscriptions</h1>
          <p className="text-miamour-charcoal text-lg">
            Manage your miamour subscription plans and services.
          </p>
        </div>

        {/* Plan Type Switcher */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={selectedPlanType === "matchmaking" ? "default" : "outline"}
            className={selectedPlanType === "matchmaking" ? "bg-miamour-pink text-white" : ""}
            onClick={() => setSelectedPlanType("matchmaking")}
          >
            Matchmaking Plans
          </Button>
          <Button
            variant={selectedPlanType === "therapy" ? "default" : "outline"}
            className={selectedPlanType === "therapy" ? "bg-miamour-pink text-white" : ""}
            onClick={() => setSelectedPlanType("therapy")}
          >
            Therapy Plans
          </Button>
        </div>

        {/* Plans Section */}
        {selectedPlanType === "matchmaking" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {matchmakingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-2 transition-all ${currentPlanId === plan.id ? "border-miamour-pink shadow-lg" : "border-gray-200"}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {plan.icon}
                    <CardTitle className="text-lg font-serif font-medium text-miamour-burgundy">{plan.name}</CardTitle>
                  </div>
                  <CardDescription>{plan.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-miamour-burgundy">{plan.price}</span>
                    <span className="ml-2 text-gray-500 text-sm">{plan.priceUSD} / {plan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {currentPlanId === plan.id ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-miamour-burgundy text-white"
                      onClick={() => setCurrentPlanId(plan.id)}
                    >
                      Choose Plan
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {therapyPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-2 transition-all ${currentPlanId === plan.id ? "border-miamour-pink shadow-lg" : "border-gray-200"}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg font-serif font-medium text-miamour-burgundy">{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge className="bg-miamour-pink text-white">Most Popular</Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-2xl font-bold text-miamour-burgundy">₦{plan.priceNGN.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">/ {plan.sessions} sessions</span>
                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{plan.save} off</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {currentPlanId === plan.id ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-miamour-burgundy text-white"
                      onClick={() => setCurrentPlanId(plan.id)}
                    >
                      Choose Plan
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Tabs Section */}
        <Tabs defaultValue="billing" className="mb-10">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="billing">Billing Info</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
          </TabsList>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">Billing Information</CardTitle>
                <CardDescription>Manage your payment methods and billing details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded">
                          <CreditCard className="h-6 w-6 text-miamour-burgundy" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy mb-1">Next Payment</h3>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <span>June 15, 2025</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Your {getCurrentPlan()?.name || "selected"} plan will automatically renew
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {getCurrentPlanPrice()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Add Payment Method</Button>
                <Button className="bg-miamour-burgundy text-white">Update Billing Info</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">Payment History</CardTitle>
                <CardDescription>View your recent payments and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{getCurrentPlan()?.name || "Plan"} Subscription</p>
                        <p className="text-sm text-gray-500">May 15, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {getCurrentPlanPrice()}
                        </p>
                        <Badge variant="outline" className="text-green-600">Paid</Badge>
                      </div>
                    </div>
                  </div>
                  {/* Add more payment history as needed */}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Transactions</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="addons">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">Available Add-ons</CardTitle>
                <CardDescription>Enhance your experience with additional services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy mb-1">Additional Therapy Sessions</h3>
                        <p className="text-sm text-gray-500 mb-2">Book extra therapy sessions beyond your plan allocation</p>
                        <Badge variant="outline" className="text-miamour-burgundy">₦50,000 per session</Badge>
                      </div>
                      <Button variant="outline">Add</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy mb-1">Profile Boost</h3>
                        <p className="text-sm text-gray-500 mb-2">Get more visibility in the matching algorithm for 7 days</p>
                        <Badge variant="outline" className="text-miamour-burgundy">₦10,000</Badge>
                      </div>
                      <Button variant="outline">Add</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy mb-1">Date Planning Service</h3>
                        <p className="text-sm text-gray-500 mb-2">Let our experts plan a perfect date for you and your match</p>
                        <Badge variant="outline" className="text-miamour-burgundy">₦25,000 per date</Badge>
                      </div>
                      <Button variant="outline">Add</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-miamour-blush/20 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <AlertCircle className="h-6 w-6 text-miamour-burgundy flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-2">Need Help with Your Subscription?</h3>
              <p className="text-miamour-charcoal mb-4">
                Our customer support team is here to assist you with any questions about your subscription, 
                billing issues, or plan changes.
              </p>
              <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
