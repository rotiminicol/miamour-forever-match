
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Calendar, AlertCircle } from "lucide-react";

const Subscriptions = () => {
  const [currentPlan, setCurrentPlan] = useState("basic");
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Your Subscriptions</h1>
          <p className="text-miamour-charcoal text-lg">
            Manage your miamour subscription plans and services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Card className={`border-2 ${currentPlan === "basic" ? "border-miamour-pink" : "border-gray-200"}`}>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">Basic Plan</CardTitle>
                {currentPlan === "basic" && (
                  <Badge className="bg-miamour-pink text-white">Current Plan</Badge>
                )}
              </div>
              <CardDescription>Essential matching services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold text-miamour-burgundy">$19.99</span>
                <span className="text-gray-500"> / month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic profile creation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Up to 5 matches per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Message with matches</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {currentPlan === "basic" ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className="w-full bg-miamour-burgundy text-white"
                  onClick={() => setCurrentPlan("basic")}
                >
                  Switch Plan
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className={`border-2 ${currentPlan === "premium" ? "border-miamour-pink" : "border-gray-200"}`}>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">Premium Plan</CardTitle>
                {currentPlan === "premium" && (
                  <Badge className="bg-miamour-pink text-white">Current Plan</Badge>
                )}
              </div>
              <CardDescription>Enhanced matching experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold text-miamour-burgundy">$39.99</span>
                <span className="text-gray-500"> / month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Enhanced profile with more photos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited matches</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Priority matching algorithm</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>1 free therapy session per month</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {currentPlan === "premium" ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className="w-full bg-miamour-burgundy text-white"
                  onClick={() => setCurrentPlan("premium")}
                >
                  Upgrade Plan
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className={`border-2 ${currentPlan === "vip" ? "border-miamour-pink" : "border-gray-200"}`}>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">VIP Plan</CardTitle>
                {currentPlan === "vip" && (
                  <Badge className="bg-miamour-pink text-white">Current Plan</Badge>
                )}
              </div>
              <CardDescription>Personalized matchmaking services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold text-miamour-burgundy">$99.99</span>
                <span className="text-gray-500"> / month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>All Premium Plan features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dedicated matchmaking specialist</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Monthly relationship coaching</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Date planning assistance</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-miamour-pink mr-2 flex-shrink-0 mt-0.5" />
                  <span>Exclusive events access</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {currentPlan === "vip" ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className="w-full bg-miamour-burgundy text-white"
                  onClick={() => setCurrentPlan("vip")}
                >
                  Upgrade Plan
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

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
                        <p className="text-sm text-gray-500 mt-1">Your {currentPlan} plan will automatically renew</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {currentPlan === "basic" && "$19.99"}
                          {currentPlan === "premium" && "$39.99"}
                          {currentPlan === "vip" && "$99.99"}
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
                        <p className="font-medium">Basic Plan Subscription</p>
                        <p className="text-sm text-gray-500">May 15, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$19.99</p>
                        <Badge variant="outline" className="text-green-600">Paid</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Basic Plan Subscription</p>
                        <p className="text-sm text-gray-500">Apr 15, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$19.99</p>
                        <Badge variant="outline" className="text-green-600">Paid</Badge>
                      </div>
                    </div>
                  </div>
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
                        <Badge variant="outline" className="text-miamour-burgundy">$49.99 per session</Badge>
                      </div>
                      <Button variant="outline">Add</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy mb-1">Profile Boost</h3>
                        <p className="text-sm text-gray-500 mb-2">Get more visibility in the matching algorithm for 7 days</p>
                        <Badge variant="outline" className="text-miamour-burgundy">$9.99</Badge>
                      </div>
                      <Button variant="outline">Add</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy mb-1">Date Planning Service</h3>
                        <p className="text-sm text-gray-500 mb-2">Let our experts plan a perfect date for you and your match</p>
                        <Badge variant="outline" className="text-miamour-burgundy">$29.99 per date</Badge>
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
