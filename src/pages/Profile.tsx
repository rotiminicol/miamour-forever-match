
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, User, Calendar, Settings } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [preferences, setPreferences] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfileData = async () => {
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

        if (profileData) {
          // Fetch match preferences
          const { data: preferencesData, error: preferencesError } = await supabase
            .from("match_preferences")
            .select("*")
            .eq("user_id", profileData.id)
            .single();

          if (preferencesError && preferencesError.code !== "PGRST116") {
            throw preferencesError;
          }

          setPreferences(preferencesData || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user, navigate, toast]);

  const handleEditProfile = () => {
    navigate("/profile-setup");
  };

  const handleEditPreferences = () => {
    navigate("/match-preferences");
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
      <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="relative mx-auto w-32 h-32 rounded-full bg-miamour-blush mb-4 flex items-center justify-center">
                {profile?.profile_image ? (
                  <img 
                    src={profile.profile_image} 
                    alt={`${profile.first_name}`} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="h-16 w-16 text-miamour-burgundy" />
                )}
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={() => toast({ title: "Coming soon", description: "Photo upload will be available soon." })}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle>{profile?.first_name} {profile?.last_name}</CardTitle>
              <CardDescription>{profile?.location}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                className="w-full mb-2"
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleEditPreferences}
              >
                Edit Preferences
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5 text-miamour-gold" />
                Match Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Subscription</p>
                  <p>Premium Plan</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Matches Viewed</p>
                  <p>12 of 15 this month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Refresh</p>
                  <p>June 19, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="preferences">My Preferences</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="mr-2 h-5 w-5 text-miamour-gold" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p>{profile?.first_name} {profile?.last_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Gender</p>
                      <p>{profile?.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Birth Date</p>
                      <p>
                        {profile?.birth_date 
                          ? format(new Date(profile.birth_date), "MMMM d, yyyy") 
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p>{profile?.location || "Not specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{profile?.bio || "No bio added yet."}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              {preferences ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="mr-2 h-5 w-5 text-miamour-gold" />
                        Match Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Age Range</p>
                          <p>{preferences.min_age} - {preferences.max_age} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Preferred Gender</p>
                          <p>{preferences.preferred_gender ? preferences.preferred_gender.charAt(0).toUpperCase() + preferences.preferred_gender.slice(1) : "Any"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Location Preference</p>
                          <p>{preferences.location_preference}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Relationship Goals</p>
                          <p>{preferences.relationship_goals ? preferences.relationship_goals.charAt(0).toUpperCase() + preferences.relationship_goals.slice(1) : "Not specified"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Interests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {preferences.interests && preferences.interests.length > 0 ? (
                          preferences.interests.map((interest: string, index: number) => (
                            <div 
                              key={index} 
                              className="bg-miamour-blush text-miamour-burgundy px-3 py-1 rounded-full text-sm"
                            >
                              {interest}
                            </div>
                          ))
                        ) : (
                          <p>No interests specified</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Deal Breakers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {preferences.deal_breakers && preferences.deal_breakers.length > 0 ? (
                          preferences.deal_breakers.map((dealBreaker: string, index: number) => (
                            <div 
                              key={index} 
                              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                              {dealBreaker}
                            </div>
                          ))
                        ) : (
                          <p>No deal breakers specified</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="py-6">
                    <div className="text-center">
                      <p className="mb-4">You haven't set your match preferences yet.</p>
                      <Button 
                        className="bg-miamour-burgundy text-white"
                        onClick={handleEditPreferences}
                      >
                        Set Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardContent className="py-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-miamour-blush/50 flex items-center justify-center mr-4">
                        <Calendar className="h-5 w-5 text-miamour-burgundy" />
                      </div>
                      <div>
                        <p className="font-medium">Profile Updated</p>
                        <p className="text-sm text-muted-foreground">
                          {profile?.updated_at 
                            ? format(new Date(profile.updated_at), "MMMM d, yyyy 'at' h:mm a")
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>

                    {preferences && (
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-miamour-blush/50 flex items-center justify-center mr-4">
                          <Heart className="h-5 w-5 text-miamour-burgundy" />
                        </div>
                        <div>
                          <p className="font-medium">Preferences Updated</p>
                          <p className="text-sm text-muted-foreground">
                            {preferences.updated_at 
                              ? format(new Date(preferences.updated_at), "MMMM d, yyyy 'at' h:mm a")
                              : "Unknown date"}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-miamour-blush/50 flex items-center justify-center mr-4">
                        <User className="h-5 w-5 text-miamour-burgundy" />
                      </div>
                      <div>
                        <p className="font-medium">Account Created</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.created_at 
                            ? format(new Date(user.created_at), "MMMM d, yyyy 'at' h:mm a")
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
