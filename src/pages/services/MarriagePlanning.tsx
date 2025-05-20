
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Compass, Home, Coins, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const MarriagePlanning = () => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Marriage Planning</h1>
          <p className="text-miamour-charcoal text-lg">
            Comprehensive services to help you build a strong foundation for your married life.
          </p>
        </div>

        <div className="bg-miamour-blush/20 p-6 md:p-8 rounded-lg mb-10">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">What is Marriage Planning?</h2>
          <p className="text-miamour-charcoal mb-4">
            Marriage planning goes beyond the wedding day. It's about preparing for a successful life
            together by addressing key aspects of married life - from financial planning and home
            selection to communication strategies and future goal alignment.
          </p>
          <p className="text-miamour-charcoal">
            Our expert consultants help you navigate these important decisions to build a strong
            foundation for your future together.
          </p>
        </div>

        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-6">Our Marriage Planning Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="hover-3d">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <Compass className="h-10 w-10 text-miamour-pink" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Life Vision Planning</h3>
                  <p className="text-miamour-charcoal mb-4">
                    Work with our experts to align your goals, values, and dreams for the future.
                  </p>
                  <ul className="space-y-2 text-sm text-miamour-charcoal">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Career and personal development goals</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Family planning discussions</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Lifestyle and location preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-3d">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <Coins className="h-10 w-10 text-miamour-pink" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Financial Planning</h3>
                  <p className="text-miamour-charcoal mb-4">
                    Create a solid financial foundation with guidance from our financial advisors.
                  </p>
                  <ul className="space-y-2 text-sm text-miamour-charcoal">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Budget creation and management</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Joint account strategies</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Saving and investment planning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-3d">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <Home className="h-10 w-10 text-miamour-pink" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Home Selection Assistance</h3>
                  <p className="text-miamour-charcoal mb-4">
                    Find the perfect home to start your married life with our real estate partners.
                  </p>
                  <ul className="space-y-2 text-sm text-miamour-charcoal">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Needs assessment and location scouting</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Property tours and evaluations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Negotiation support and closing assistance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-3d">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <FileText className="h-10 w-10 text-miamour-pink" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Legal Considerations</h3>
                  <p className="text-miamour-charcoal mb-4">
                    Navigate the legal aspects of marriage with guidance from our legal experts.
                  </p>
                  <ul className="space-y-2 text-sm text-miamour-charcoal">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Prenuptial agreement consultation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Name change assistance</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-miamour-pink rounded-full mr-2"></div>
                      <span>Estate planning basics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/30 mb-10">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Our Planning Process</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-miamour-burgundy rounded-full flex items-center justify-center text-white font-serif">1</div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-1">Initial Consultation</h3>
                <p className="text-miamour-charcoal">
                  We meet with both of you to understand your vision, concerns, and priorities for married life.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-miamour-burgundy rounded-full flex items-center justify-center text-white font-serif">2</div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-1">Custom Plan Development</h3>
                <p className="text-miamour-charcoal">
                  Our team creates a tailored marriage planning roadmap based on your specific needs.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-miamour-burgundy rounded-full flex items-center justify-center text-white font-serif">3</div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-1">Expert Sessions</h3>
                <p className="text-miamour-charcoal">
                  Meet with specialists in different areas (financial, legal, etc.) to address specific aspects of your plan.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-miamour-burgundy rounded-full flex items-center justify-center text-white font-serif">4</div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-1">Implementation Support</h3>
                <p className="text-miamour-charcoal">
                  We help you execute your plan with ongoing guidance and support through your first year of marriage.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-6">Begin Your Marriage Journey with Confidence</h2>
          <Link to="/appointments">
            <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90">
              Schedule a Planning Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarriagePlanning;
