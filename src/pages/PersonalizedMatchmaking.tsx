
import { motion } from "framer-motion";
import { Heart, Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PersonalizedMatchmaking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("process");
  
  const matchmakingSteps = [
    {
      number: "01",
      title: "In-Depth Consultation",
      description: "Personal meeting with your dedicated matchmaker to understand your preferences, goals, and values"
    },
    {
      number: "02",
      title: "Profile Creation",
      description: "Development of your comprehensive matchmaking profile with professional photos and personal story"
    },
    {
      number: "03",
      title: "Curated Matching",
      description: "Expert matchmakers handpick compatible matches from our exclusive network of quality singles"
    },
    {
      number: "04",
      title: "Date Arrangement",
      description: "Full coordination of your first meeting with personalized recommendations for the perfect date"
    }
  ];

  const plans = [
    {
      id: 'blossom',
      title: 'Blossom Package',
      price: '₦75,000',
      period: '1 month',
      features: [
        'Exclusive matchmaking within your country',
        'Access to live sessions',
        'Basic profile verification',
        'Standard customer support'
      ]
    },
    {
      id: 'harmony',
      title: 'Harmony Package',
      price: '₦125,000',
      period: '3 months',
      features: [
        'Exclusive matchmaking within and outside your country',
        'Access to live sessions',
        'Priority profile verification',
        'Premium customer support',
        'Advanced matching algorithms'
      ],
      popular: true
    },
    {
      id: 'forever',
      title: 'My Forever Package',
      price: '₦225,000',
      period: '6 months',
      features: [
        'Personal matches',
        'Private sessions',
        'Access to high-profile members',
        'Matches within and outside Nigeria',
        'VIP customer support',
        'Exclusive events access'
      ]
    }
  ];

  return (
    <div className="py-8 px-4 md:px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-miamour-burgundy mb-4">
          Personalized Matchmaking
        </h1>
        <p className="text-miamour-charcoal max-w-3xl">
          Experience the art of curated introductions with our high-touch, personalized matchmaking service designed for serious relationship seekers.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6">
          <TabsTrigger value="process">Our Process</TabsTrigger>
          <TabsTrigger value="packages">Matchmaking Packages</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="process">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>The Art of Matchmaking</CardTitle>
              <CardDescription>
                Our personalized approach combines human expertise with sophisticated matching technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                Our personalized matchmaking service combines traditional matchmaking wisdom with modern 
                relationship science to create meaningful connections between compatible individuals.
                Unlike dating apps that leave you sorting through endless profiles, our expert matchmakers 
                carefully select potential matches based on compatibility, shared values, and relationship goals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {matchmakingSteps.map((step, index) => (
                  <div key={index} className="bg-miamour-cream rounded-lg p-5 border border-miamour-blush/30 text-center">
                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-miamour-pink font-bold shadow-sm">
                      {step.number}
                    </div>
                    <h3 className="font-medium mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/appointments")}
                className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink"
              >
                Schedule Matchmaker Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="packages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-miamour-pink shadow-md' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-miamour-pink text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className={plan.popular ? 'pt-6' : ''}>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>
                    <span className="text-xl font-bold text-miamour-burgundy">{plan.price}</span>
                    <span className="text-gray-500"> / {plan.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => navigate("/payment")}
                    className="w-full bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink"
                  >
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="bg-miamour-cream border-miamour-blush/20">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy rounded-full p-3 text-white">
                <Star className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Luxury Custom Matchmaking</h3>
                <p className="mb-4">
                  For clients seeking the ultimate in personalized matchmaking, our luxury service offers 
                  a bespoke experience with unlimited access to our most exclusive network and concierge-level service.
                </p>
              </div>
              <Button 
                onClick={() => navigate("/contact-us")}
                variant="outline"
                className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-burgundy/10"
              >
                Inquire About Custom Service
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="success">
          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
              <CardDescription>Real couples who found lasting love through our personalized matchmaking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-miamour-blush/10 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-miamour-pink rounded-full p-2 text-white">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Amara & David</h3>
                    <p className="text-xs text-gray-500">Lagos, Nigeria</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-sm italic">
                  "Working with miamour's matchmakers was life-changing. They understood exactly what we were 
                  both looking for and created a connection that felt natural from the very first meeting."
                </blockquote>
              </div>
              
              <div className="bg-miamour-blush/10 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-miamour-pink rounded-full p-2 text-white">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Jennifer & Michael</h3>
                    <p className="text-xs text-gray-500">London, UK</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-sm italic">
                  "After years of disappointing dating experiences, miamour introduced me to someone who truly 
                  complements my personality and shares my values. The personalized approach made all the difference."
                </blockquote>
              </div>
              
              <div className="bg-miamour-blush/10 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-miamour-pink rounded-full p-2 text-white">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chidi & Nneka</h3>
                    <p className="text-xs text-gray-500">Abuja, Nigeria</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-sm italic">
                  "The matchmakers took time to understand our cultural backgrounds and what was important to us. 
                  We're now planning our wedding thanks to their thoughtful introduction!"
                </blockquote>
              </div>
              
              <div className="bg-miamour-cream p-4 rounded-lg border border-miamour-blush/20 text-center">
                <div className="flex justify-center gap-8 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-miamour-pink">87%</p>
                    <p className="text-xs text-gray-600">find a significant relationship</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-miamour-pink">72%</p>
                    <p className="text-xs text-gray-600">lead to second dates</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-miamour-pink">100+</p>
                    <p className="text-xs text-gray-600">marriages from our introductions</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/profile-setup")}
                className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink"
              >
                Start Your Matching Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalizedMatchmaking;
