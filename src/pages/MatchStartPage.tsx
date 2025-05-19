
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MatchStartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartMatching = () => {
    if (user) {
      navigate("/profile-setup");
    } else {
      navigate("/login", { state: { returnUrl: "/profile-setup" } });
    }
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-miamour-pink mb-6">
            Begin Your Love Journey
          </h1>
          <p className="text-lg text-miamour-charcoal mb-8">
            Our sophisticated matching process combines technology with human expertise
            to help you find a compatible partner who shares your values and relationship goals.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center">
              <div className="bg-miamour-blush w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-miamour-pink font-serif font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Create Your Profile</h3>
                <p className="text-sm text-miamour-charcoal">Tell us about yourself, your interests, and values.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-miamour-blush w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-miamour-pink font-serif font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Set Your Preferences</h3>
                <p className="text-sm text-miamour-charcoal">Define what you're looking for in your ideal partner.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-miamour-blush w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-miamour-pink font-serif font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Choose a Subscription</h3>
                <p className="text-sm text-miamour-charcoal">Select the right plan for your matching journey.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-miamour-blush w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-miamour-pink font-serif font-bold">4</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Meet Quality Matches</h3>
                <p className="text-sm text-miamour-charcoal">Connect with compatible partners selected just for you.</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleStartMatching}
            size="lg" 
            className="bg-miamour-pink text-white hover:bg-miamour-pink/90 px-8"
          >
            Start Matching Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-miamour-blush rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-miamour-gold/20 rounded-full z-0"></div>
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-md border border-miamour-blush/50">
              <img
                src="/lovable-uploads/ba939aa2-7c2b-45d5-a38c-c9892cc2db4f.png"
                alt="Finding love"
                className="rounded-lg w-full h-auto"
              />
              <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg">
                <Heart className="h-8 w-8 text-miamour-pink" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md border border-miamour-blush/50">
              <img
                src="/lovable-uploads/7f02a8d8-0b0a-46fd-bb7b-3d63b35e1677.png"
                alt="Happy couple"
                className="rounded-lg w-full h-32 object-cover"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-miamour-blush/50">
              <img
                src="/lovable-uploads/e21a4b76-b28b-49de-9e63-0598991a5d03.png"
                alt="Match made"
                className="rounded-lg w-full h-32 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStartPage;
