
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

const BillingProcess = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate("/payment-success");
    }, 1500);
  };

  return (
    <div className="py-8 px-4 md:px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-miamour-burgundy mb-4">
          Payment Methods
        </h1>
        <p className="text-miamour-charcoal max-w-3xl">
          Manage your payment methods securely and conveniently
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Payment Methods</CardTitle>
              <CardDescription>Manage your stored payment methods or add a new one</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Bank Transfer</Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Smith" required />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <ShieldCheck className="h-4 w-4 text-green-500 mt-1" />
                      <p className="text-xs text-gray-500">
                        Your payment information is encrypted and secure. We never store your full card details.
                      </p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Bank Transfer Instructions</p>
                          <p className="text-xs text-blue-700 mt-1">
                            Please use the following details to make your bank transfer. Include your
                            username or email in the reference field to help us identify your payment.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 ml-7">
                        <p className="text-xs text-blue-700"><span className="font-medium">Bank:</span> Providus Bank</p>
                        <p className="text-xs text-blue-700"><span className="font-medium">Account Name:</span> MiAmour Services Ltd</p>
                        <p className="text-xs text-blue-700"><span className="font-medium">Account Number:</span> 5400881912</p>
                        <p className="text-xs text-blue-700"><span className="font-medium">Reference:</span> {user.email}</p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="referenceNumber">Reference Number (from your bank transfer)</Label>
                      <Input id="referenceNumber" placeholder="e.g., TRF123456789" />
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-1" />
                      <p className="text-xs text-gray-500">
                        Bank transfers can take 1-3 business days to process. Your account will be updated once the payment is confirmed.
                      </p>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    paymentMethod === "card" ? "Save Card" : "Confirm Bank Transfer"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Secure Encryption</h3>
                  <p className="text-sm text-gray-600">
                    All payment information is encrypted using industry-standard SSL technology.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">PCI Compliant</h3>
                  <p className="text-sm text-gray-600">
                    We adhere to all Payment Card Industry Data Security Standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                If you have any questions about payments or billing, our support team is here to help.
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/contact-us")}
                className="w-full border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-burgundy/10"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingProcess;
