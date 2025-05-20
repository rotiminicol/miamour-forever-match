
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Calendar, MessageSquare, X, User, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MatchingDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [potentialMatches, setPotentialMatches] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          if (profileError.code === "PGRST116") {
            // Profile not found, redirect to profile setup
            toast({
              title: "Profile Not Found",
              description: "Please complete your profile to continue.",
            });
            navigate("/profile-setup");
            return;
          } else {
            throw profileError;
          }
        }

        setProfile(profileData);

        // In a real app, we would fetch potential matches based on preferences
        // For now, we'll just show an empty state
        setPotentialMatches([]);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load matches.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, toast]);

  const handleLike = (matchId: string) => {
    toast({
      title: "Feature in development",
      description: "The matching system is being implemented.",
    });
  };

  const handleSkip = (matchId: string) => {
    toast({
      title: "Feature in development",
      description: "The matching system is being implemented.",
    });
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="w-12 h-12 border-4 border-miamour-burgundy border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-8">Your Matches</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Heart className="mr-2 h-5 w-5 text-miamour-gold" />
                Your Matching Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Matches Viewed</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mutual Matches</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Conversations</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upcoming Dates</span>
                  <Badge variant="outline">0</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/match-preferences")}
              >
                Update Preferences
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-miamour-gold" />
                Events
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <Calendar className="h-12 w-12 text-miamour-blush opacity-50 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No upcoming events</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => toast({ title: "Coming soon", description: "Event registration will be available soon." })}
              >
                Browse Events
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow border border-miamour-blush/50 mb-6">
            <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Today's Potential Matches</h2>
            <p className="text-miamour-charcoal mb-4">
              Complete your profile and preferences to receive personalized matches.
            </p>
          </div>

          {potentialMatches.length > 0 ? (
            <div className="space-y-6">
              {potentialMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="h-60 md:h-auto">
                      <div className="h-full bg-miamour-blush/50 flex items-center justify-center">
                        <User className="h-20 w-20 text-miamour-burgundy opacity-30" />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-serif font-medium text-miamour-burgundy">
                            {match.first_name} {match.last_name?.charAt(0)}.
                          </h3>
                          <p className="text-sm text-muted-foreground">{match.location}</p>
                        </div>
                        <Badge className="bg-miamour-gold text-white">
                          {match.compatibility}% Match
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {match.interests.map((interest: string, index: number) => (
                            <div 
                              key={index}
                              className="bg-miamour-blush/30 text-miamour-burgundy px-2 py-1 rounded-full text-xs"
                            >
                              {interest}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-1">Bio</p>
                        <p className="line-clamp-2">{match.bio || "No bio available"}</p>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          className="flex-1 mr-2 border-red-300 text-red-500 hover:bg-red-50"
                          onClick={() => handleSkip(match.id)}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Skip
                        </Button>
                        <Button
                          className="flex-1 ml-2 bg-miamour-burgundy text-white"
                          onClick={() => handleLike(match.id)}
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          Like
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 text-miamour-blush mx-auto mb-4" />
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">No Matches Available Yet</h3>
                <p className="text-miamour-charcoal mb-6 max-w-md mx-auto">
                  To get started with matching, please complete your profile and preferences.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="bg-miamour-burgundy text-white"
                    onClick={() => navigate("/profile-setup")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Complete Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-miamour-burgundy text-miamour-burgundy"
                    onClick={() => navigate("/match-preferences")}
                  >
                    Set Match Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Active Connections</h2>
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-miamour-blush mx-auto mb-4" />
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">No Active Connections</h3>
                <p className="text-miamour-charcoal mb-6 max-w-md mx-auto">
                  When you connect with someone, they'll appear here. Start by finding matches!
                </p>
                <Button 
                  className="bg-miamour-burgundy text-white"
                  onClick={() => navigate("/personalized-matchmaking")}
                >
                  Explore Matchmaking Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingDashboard;
