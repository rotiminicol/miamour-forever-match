
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Heart, CheckCircle, Calendar, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const WeddingMatching = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartMatching = () => {
    navigate("/start-matching");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-miamour-cream py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-miamour-pink mb-6">
                Find Your Perfect Match
              </h1>
              <p className="text-lg text-miamour-charcoal mb-8">
                Our sophisticated matching algorithm, combined with personalized consultations from our relationship experts, helps you find someone who truly complements your values, interests, and life goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-miamour-pink mr-3 h-6 w-6" />
                  <p className="text-miamour-charcoal">Comprehensive compatibility assessment</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-miamour-pink mr-3 h-6 w-6" />
                  <p className="text-miamour-charcoal">Values-based matching algorithm</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-miamour-pink mr-3 h-6 w-6" />
                  <p className="text-miamour-charcoal">Human-guided matching process</p>
                </div>
              </div>
              <div className="mt-8">
                <Button 
                  onClick={handleStartMatching} 
                  className="bg-miamour-pink text-white hover:bg-miamour-rose/90 text-lg px-8 py-6 mr-4"
                >
                  Start Matching
                </Button>
                <Link to="/pricing">
                  <Button variant="outline" className="border-miamour-pink text-miamour-pink hover:bg-miamour-blush/30">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-miamour-blush rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-miamour-gold/20 rounded-full z-0"></div>
                <div className="relative z-10 bg-white p-6 rounded-lg shadow-md border border-miamour-blush/50">
                  <img
                    src="/lovable-uploads/ba939aa2-7c2b-45d5-a38c-c9892cc2db4f.png"
                    alt="Happy couple"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-pink mb-4">
              How Our Matching Works
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              Our comprehensive matching process combines technology and human expertise
              to help you find a compatible partner who shares your values and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-miamour-cream rounded-lg p-8 text-center">
              <div className="bg-miamour-blush w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-miamour-pink font-serif font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-miamour-pink mb-4">
                Complete Your Profile
              </h3>
              <p className="text-miamour-charcoal">
                Answer our in-depth questionnaire about your values, interests, lifestyle, and what you're looking for in a partner.
              </p>
            </div>
            
            <div className="bg-miamour-cream rounded-lg p-8 text-center">
              <div className="bg-miamour-blush w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-miamour-pink font-serif font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-miamour-pink mb-4">
                Receive Quality Matches
              </h3>
              <p className="text-miamour-charcoal">
                Our algorithm analyzes your profile and preferences to suggest highly compatible potential partners.
              </p>
            </div>
            
            <div className="bg-miamour-cream rounded-lg p-8 text-center">
              <div className="bg-miamour-blush w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-miamour-pink font-serif font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-miamour-pink mb-4">
                Connect & Build Relationships
              </h3>
              <p className="text-miamour-charcoal">
                Engage with your matches through our guided communication platform, with support from our relationship experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-miamour-cream">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-pink mb-4">
              Premium Matching Features
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              MiAmour offers exclusive features to enhance your journey to finding love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex">
              <div className="mr-6 text-miamour-pink">
                <Heart className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-miamour-pink mb-2">
                  Personalized Matching Analysis
                </h3>
                <p className="text-miamour-charcoal">
                  Receive detailed compatibility reports explaining why we matched you with specific individuals, highlighting shared values and complementary traits.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-6 text-miamour-pink">
                <Calendar className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-miamour-pink mb-2">
                  Guided Communication
                </h3>
                <p className="text-miamour-charcoal">
                  Our structured communication process helps you get to know your matches on a deeper level, with meaningful questions and conversation starters.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-6 text-miamour-pink">
                <Settings className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-miamour-pink mb-2">
                  Relationship Coaching
                </h3>
                <p className="text-miamour-charcoal">
                  Get one-on-one advice from our experts on how to navigate your connections and build strong foundations for lasting relationships.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-6 text-miamour-pink">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium text-miamour-pink mb-2">
                  Video Introduction
                </h3>
                <p className="text-miamour-charcoal">
                  Create a video profile to showcase your personality and connect with matches on a more personal level before meeting in person.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/pricing">
              <Button className="bg-miamour-pink text-white hover:bg-miamour-pink/90 text-lg px-8 py-6">
                View All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-miamour-pink text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8">
            Start Your Journey to Finding Love
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join MiAmour today and connect with compatible partners who share your values and vision for the future.
          </p>
          <Link to="/register">
            <Button className="bg-white text-miamour-pink hover:bg-miamour-blush text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default WeddingMatching;
