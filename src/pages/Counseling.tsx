
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Counseling = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("individual");
  
  return (
    <div className="py-8 px-4 md:px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-miamour-burgundy mb-4">
          Counseling Services
        </h1>
        <p className="text-miamour-charcoal max-w-3xl">
          Professional guidance to help you navigate relationship challenges and build a stronger foundation for your future together.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="premarital">Premarital</TabsTrigger>
          <TabsTrigger value="couples">Couples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual">
          <Card>
            <CardHeader>
              <CardTitle>Individual Relationship Counseling</CardTitle>
              <CardDescription>
                One-on-one sessions focused on personal growth and relationship readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our individual relationship counseling provides a safe space to explore your goals, 
                concerns, and personal challenges as you prepare for commitment or navigate existing relationships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-miamour-blush/10 p-4 rounded-lg">
                  <h3 className="flex items-center gap-2 font-medium mb-2">
                    <Heart className="text-miamour-pink h-5 w-5" /> 
                    What to Expect
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Personalized approach focused on your specific needs</li>
                    <li>Techniques for managing relationship anxiety</li>
                    <li>Building communication and emotional intelligence skills</li>
                  </ul>
                </div>
                <div className="bg-miamour-blush/10 p-4 rounded-lg">
                  <h3 className="flex items-center gap-2 font-medium mb-2">
                    <Calendar className="text-miamour-pink h-5 w-5" /> 
                    Session Details
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>50-minute individual sessions</li>
                    <li>Weekly sessions for 8-10 weeks</li>
                    <li>Flexible scheduling options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/appointments")}
                className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink"
              >
                Schedule a Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="premarital">
          <Card>
            <CardHeader>
              <CardTitle>Premarital Counseling</CardTitle>
              <CardDescription>
                Build a strong foundation for your marriage before you say "I do"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our premarital counseling program helps couples prepare for marriage by addressing 
                potential areas of conflict, setting realistic expectations, and providing tools for 
                a healthy, lasting relationship.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-miamour-blush/10 p-4 rounded-lg">
                  <h3 className="flex items-center gap-2 font-medium mb-2">
                    <Heart className="text-miamour-pink h-5 w-5" /> 
                    Program Topics
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Communication styles and conflict resolution</li>
                    <li>Financial planning and management</li>
                    <li>Role expectations and family planning</li>
                  </ul>
                </div>
                <div className="bg-miamour-blush/10 p-4 rounded-lg">
                  <h3 className="flex items-center gap-2 font-medium mb-2">
                    <Calendar className="text-miamour-pink h-5 w-5" /> 
                    Program Details
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>5-8 sessions (75 minutes each)</li>
                    <li>Couples sessions with guided exercises</li>
                    <li>Custom program timeline based on wedding date</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/appointments")}
                className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink"
              >
                Schedule a Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="couples">
          <Card>
            <CardHeader>
              <CardTitle>Couples Therapy</CardTitle>
              <CardDescription>
                Strengthen your bond and overcome relationship challenges together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our couples therapy sessions provide a supportive environment to work through 
                relationship difficulties, improve communication, and rediscover connection. 
                Whether you're facing a specific issue or want to strengthen your relationship, 
                our therapists can help.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-miamour-blush/10 p-4 rounded-lg">
                  <h3 className="flex items-center gap-2 font-medium mb-2">
                    <Heart className="text-miamour-pink h-5 w-5" /> 
                    Common Focus Areas
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Communication breakdowns and recurring conflicts</li>
                    <li>Trust rebuilding after challenges</li>
                    <li>Intimacy and connection issues</li>
                  </ul>
                </div>
                <div className="bg-miamour-blush/10 p-4 rounded-lg">
                  <h3 className="flex items-center gap-2 font-medium mb-2">
                    <Calendar className="text-miamour-pink h-5 w-5" /> 
                    Session Details
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>75-minute sessions</li>
                    <li>Weekly sessions (length varies by need)</li>
                    <li>Evidence-based therapy modalities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/appointments")}
                className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy text-white hover:from-miamour-burgundy hover:to-miamour-pink"
              >
                Schedule a Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-miamour-cream p-6 rounded-lg border border-miamour-blush text-center">
        <h2 className="text-xl font-serif text-miamour-burgundy mb-3">Ready to take the next step?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-4">
          Our professional counselors are here to support your relationship journey. 
          Schedule a consultation to discuss your needs and find the right counseling option for you.
        </p>
        <Button 
          onClick={() => navigate("/appointments")}
          className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy hover:from-miamour-burgundy hover:to-miamour-pink text-white font-medium"
        >
          Book Your First Session
        </Button>
      </div>
    </div>
  );
};

export default Counseling;
