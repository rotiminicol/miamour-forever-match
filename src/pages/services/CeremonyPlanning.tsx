
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, Users, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const CeremonyPlanning = () => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Ceremony Planning</h1>
          <p className="text-miamour-charcoal text-lg">
            Let our experts help you plan the perfect ceremony that reflects your unique love story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card className="hover-3d">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Heart className="h-12 w-12 text-miamour-pink mb-4" />
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Personalized Planning</h3>
                <p className="text-miamour-charcoal">
                  Custom ceremony planning tailored to your vision, cultural background, and preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-3d">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-miamour-pink mb-4" />
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Vendor Coordination</h3>
                <p className="text-miamour-charcoal">
                  Access to our network of trusted vendors and coordination of all services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-3d">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-miamour-pink mb-4" />
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Timeline Management</h3>
                <p className="text-miamour-charcoal">
                  Detailed ceremony timeline planning and coordination on your special day.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-miamour-blush/30 p-6 md:p-8 rounded-lg mb-10">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Our Planning Packages</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-white rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-miamour-burgundy rounded-full flex items-center justify-center text-white font-serif text-2xl">1</div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Essential Planning</h3>
                <p className="text-miamour-charcoal mb-2">Perfect for couples who need guidance with the basics.</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-miamour-charcoal ml-2">
                  <li>Ceremony concept development</li>
                  <li>Vendor recommendations</li>
                  <li>Basic timeline creation</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-white rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-miamour-pink rounded-full flex items-center justify-center text-white font-serif text-2xl">2</div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Premium Planning</h3>
                <p className="text-miamour-charcoal mb-2">Comprehensive planning with hands-on coordination.</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-miamour-charcoal ml-2">
                  <li>Everything in Essential Planning</li>
                  <li>Ceremony venue selection assistance</li>
                  <li>Vendor negotiations and booking</li>
                  <li>Day-of coordination</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-white rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-miamour-gold rounded-full flex items-center justify-center text-white font-serif text-2xl">3</div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">Luxe Experience</h3>
                <p className="text-miamour-charcoal mb-2">The ultimate planning experience for a perfect ceremony.</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-miamour-charcoal ml-2">
                  <li>Everything in Premium Planning</li>
                  <li>Custom ceremony script writing</li>
                  <li>Full design and decor planning</li>
                  <li>Rehearsal coordination</li>
                  <li>Guest experience management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-6">Ready to Plan Your Perfect Ceremony?</h2>
          <Link to="/appointments">
            <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CeremonyPlanning;
