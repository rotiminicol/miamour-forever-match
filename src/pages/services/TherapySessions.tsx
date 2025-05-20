
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MessageSquare, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TherapySessions = () => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Therapy Sessions</h1>
          <p className="text-miamour-charcoal text-lg">
            Professional therapy to help you navigate relationships and personal growth.
          </p>
        </div>

        <Tabs defaultValue="individual" className="mb-10">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="individual">Individual Therapy</TabsTrigger>
            <TabsTrigger value="couples">Couples Therapy</TabsTrigger>
            <TabsTrigger value="premarital">Premarital Counseling</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/30">
              <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Individual Therapy</h2>
              <p className="text-miamour-charcoal mb-6">
                One-on-one sessions focused on personal growth, understanding relationship patterns, 
                and developing healthy coping mechanisms. Our therapists create a safe space for you
                to explore your feelings and work towards your goals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="mr-3 bg-miamour-blush/30 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-miamour-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-medium text-miamour-burgundy">Self-Discovery</h3>
                    <p className="text-sm text-miamour-charcoal">Understand your needs, values, and desires</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 bg-miamour-blush/30 p-2 rounded-full">
                    <Users className="h-5 w-5 text-miamour-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-medium text-miamour-burgundy">Relationship Patterns</h3>
                    <p className="text-sm text-miamour-charcoal">Identify and change unhealthy patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="couples" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/30">
              <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Couples Therapy</h2>
              <p className="text-miamour-charcoal mb-6">
                Work together with your partner to strengthen your relationship, improve communication,
                and resolve conflicts. Our experienced therapists provide a balanced environment where
                both partners feel heard and validated.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="mr-3 bg-miamour-blush/30 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-miamour-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-medium text-miamour-burgundy">Communication Skills</h3>
                    <p className="text-sm text-miamour-charcoal">Learn effective ways to express needs and listen</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 bg-miamour-blush/30 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-miamour-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-medium text-miamour-burgundy">Emotional Connection</h3>
                    <p className="text-sm text-miamour-charcoal">Rebuild intimacy and strengthen bonds</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="premarital" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/30">
              <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Premarital Counseling</h2>
              <p className="text-miamour-charcoal mb-6">
                Prepare for a successful marriage by addressing important topics and developing skills
                that will help you navigate life together. Our structured approach helps you build a
                strong foundation for your future.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="mr-3 bg-miamour-blush/30 p-2 rounded-full">
                    <ShieldCheck className="h-5 w-5 text-miamour-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-medium text-miamour-burgundy">Conflict Resolution</h3>
                    <p className="text-sm text-miamour-charcoal">Learn healthy ways to manage disagreements</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 bg-miamour-blush/30 p-2 rounded-full">
                    <Users className="h-5 w-5 text-miamour-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-medium text-miamour-burgundy">Expectations & Goals</h3>
                    <p className="text-sm text-miamour-charcoal">Align your visions for the future</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-3">Session Format</h3>
              <ul className="space-y-2 text-miamour-charcoal">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>50-minute individual sessions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>80-minute couples sessions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Virtual or in-person options</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Flexible scheduling</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-3">Our Approach</h3>
              <ul className="space-y-2 text-miamour-charcoal">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Evidence-based techniques</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Personalized treatment plans</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Compassionate, non-judgmental care</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Progress tracking</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-3">Our Therapists</h3>
              <ul className="space-y-2 text-miamour-charcoal">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Licensed professionals</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Specialized relationship training</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Cultural competence</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                  <span>Ongoing professional development</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-6">Ready to Begin Your Therapy Journey?</h2>
          <Link to="/appointments">
            <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90">
              Book Your First Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TherapySessions;
