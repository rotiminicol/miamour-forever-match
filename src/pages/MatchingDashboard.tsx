
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Calendar, MessageSquare, X, User } from "lucide-react";
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

        // For demo purposes, we'll just fetch some random profiles as potential matches
        // In a real app, you would use the user's preferences to find suitable matches
        const { data: matchesData, error: matchesError } = await supabase
          .from("user_profiles")
          .select("*")
          .neq("id", user.id)
          .limit(5);

        if (matchesError) {
          throw matchesError;
        }

        // Add some demo interests to the matches
        const interestsList = [
          ["Reading", "Travel", "Photography"],
          ["Cooking", "Hiking", "Movies"],
          ["Music", "Art", "Dancing"],
          ["Sports", "Yoga", "Meditation"],
          ["Technology", "Science", "Gaming"],
        ];

        const enhancedMatches = matchesData.map((match, index) => ({
          ...match,
          compatibility: Math.floor(Math.random() * 30) + 70, // Random compatibility 70-99%
          interests: interestsList[index % interestsList.length],
        }));

        setPotentialMatches(enhancedMatches);
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
    // In a real app, this would create a match in the database
    toast({
      title: "Match Liked",
      description: "You've expressed interest in this match!",
    });

    // Remove from potential matches
    setPotentialMatches(potentialMatches.filter(match => match.id !== matchId));
  };

  const handleSkip = (matchId: string) => {
    // In a real app, this would mark the profile as skipped
    toast({
      title: "Match Skipped",
      description: "This profile has been skipped.",
    });

    // Remove from potential matches
    setPotentialMatches(potentialMatches.filter(match => match.id !== matchId));
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
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mutual Matches</span>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Conversations</span>
                  <Badge variant="outline">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upcoming Dates</span>
                  <Badge variant="outline">1</Badge>
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
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-miamour-burgundy pl-4 py-1">
                  <p className="font-medium">Virtual Dating Workshop</p>
                  <p className="text-sm text-muted-foreground">May 25, 2025 • 7:00 PM</p>
                </div>
                <div className="border-l-2 border-miamour-blush pl-4 py-1">
                  <p className="font-medium">Singles Mixer</p>
                  <p className="text-sm text-muted-foreground">June 5, 2025 • 6:30 PM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => toast({ title: "Coming soon", description: "Event registration will be available soon." })}
              >
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow border border-miamour-blush/50 mb-6">
            <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Today's Top Matches</h2>
            <p className="text-miamour-charcoal mb-4">
              Based on your preferences, we've selected the following matches for you.
              Take your time to review each profile and let us know if you're interested.
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
                <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-2">No More Matches Today</h3>
                <p className="text-miamour-charcoal mb-6 max-w-md mx-auto">
                  You've gone through all your potential matches for today. Check back tomorrow for new matches!
                </p>
                <Button 
                  variant="outline" 
                  className="mx-auto"
                  onClick={() => navigate("/match-preferences")}
                >
                  Update Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Active Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Emma J.</CardTitle>
                    <Badge className="bg-miamour-burgundy">New Message</Badge>
                  </div>
                  <CardDescription>Last message: 2 hours ago</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-miamour-blush mr-3 flex items-center justify-center">
                        <User className="h-5 w-5 text-miamour-burgundy" />
                      </div>
                      <div>
                        <p className="text-sm truncate w-36">That sounds wonderful! I'd...</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-miamour-burgundy">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Michael R.</CardTitle>
                  </div>
                  <CardDescription>Last message: Yesterday</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-miamour-blush mr-3 flex items-center justify-center">
                        <User className="h-5 w-5 text-miamour-burgundy" />
                      </div>
                      <div>
                        <p className="text-sm truncate w-36">Looking forward to our coffee...</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-miamour-burgundy">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingDashboard;
