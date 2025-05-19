
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Define the form schema using Zod
const preferencesFormSchema = z.object({
  minAge: z.number().min(18, { message: "Minimum age must be at least 18." }).max(100),
  maxAge: z.number().min(18, { message: "Maximum age must be at least 18." }).max(100),
  preferredGender: z.string({ required_error: "Please select a preferred gender." }),
  locationPreference: z.string().min(2, { message: "Location preference must be at least 2 characters." }),
  relationshipGoals: z.string({ required_error: "Please select your relationship goals." }),
  interests: z.array(z.string()).min(1, { message: "Please add at least one interest." }),
  dealBreakers: z.array(z.string()),
});

const MatchPreferences = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [newDealBreaker, setNewDealBreaker] = useState("");

  // Initialize the form
  const form = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      minAge: 18,
      maxAge: 45,
      preferredGender: "",
      locationPreference: "",
      relationshipGoals: "",
      interests: [],
      dealBreakers: [],
    },
  });

  const interests = form.watch("interests");
  const dealBreakers = form.watch("dealBreakers");
  const minAge = form.watch("minAge");
  const maxAge = form.watch("maxAge");

  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      form.setValue("interests", [...interests, newInterest]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    form.setValue(
      "interests",
      interests.filter((i) => i !== interest)
    );
  };

  const addDealBreaker = () => {
    if (newDealBreaker && !dealBreakers.includes(newDealBreaker)) {
      form.setValue("dealBreakers", [...dealBreakers, newDealBreaker]);
      setNewDealBreaker("");
    }
  };

  const removeDealBreaker = (dealBreaker: string) => {
    form.setValue(
      "dealBreakers",
      dealBreakers.filter((d) => d !== dealBreaker)
    );
  };

  const onSubmit = async (values: z.infer<typeof preferencesFormSchema>) => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please log in to continue.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      // First get the user profile id
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (!profileData) {
        toast({
          title: "Profile not found",
          description: "Please complete your profile first.",
          variant: "destructive",
        });
        navigate("/profile-setup");
        return;
      }

      // Insert the match preferences data
      const { error } = await supabase.from("match_preferences").upsert({
        user_id: profileData.id,
        min_age: values.minAge,
        max_age: values.maxAge,
        preferred_gender: values.preferredGender,
        location_preference: values.locationPreference,
        relationship_goals: values.relationshipGoals,
        interests: values.interests,
        deal_breakers: values.dealBreakers,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Preferences Saved",
        description: "Your match preferences have been successfully saved!",
      });
      
      // Navigate to payment page
      navigate("/payment");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-2">Match Preferences</h1>
        <p className="text-miamour-charcoal">Tell us what you're looking for in a partner.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow border border-miamour-blush">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="preferredGender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Age Range</FormLabel>
              <div className="flex justify-between items-center">
                <span>{minAge} years</span>
                <span>{maxAge} years</span>
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="minAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Age</FormLabel>
                      <FormControl>
                        <Slider
                          min={18}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => {
                            field.onChange(value[0]);
                            if (value[0] > maxAge) {
                              form.setValue("maxAge", value[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Age</FormLabel>
                      <FormControl>
                        <Slider
                          min={18}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => {
                            field.onChange(value[0]);
                            if (value[0] < minAge) {
                              form.setValue("minAge", value[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="locationPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State or 'Anywhere'" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a city, state, or "Anywhere" if location doesn't matter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationshipGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship Goals</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your relationship goals" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="marriage">Marriage</SelectItem>
                      <SelectItem value="long-term">Long-term Relationship</SelectItem>
                      <SelectItem value="casual">Casual Dating</SelectItem>
                      <SelectItem value="friendship">Friendship First</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <div className="flex">
                    <Input
                      placeholder="Add interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addInterest();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addInterest}
                      className="ml-2 bg-miamour-burgundy text-white"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interests.map((interest) => (
                      <Badge key={interest} className="bg-miamour-blush text-miamour-burgundy">
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-1 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    Add at least 3 interests to help us find compatible matches.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dealBreakers"
              render={() => (
                <FormItem>
                  <FormLabel>Deal Breakers</FormLabel>
                  <div className="flex">
                    <Input
                      placeholder="Add deal breaker"
                      value={newDealBreaker}
                      onChange={(e) => setNewDealBreaker(e.target.value)}
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addDealBreaker();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addDealBreaker}
                      className="ml-2 bg-miamour-burgundy text-white"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dealBreakers.map((dealBreaker) => (
                      <Badge key={dealBreaker} variant="secondary">
                        {dealBreaker}
                        <button
                          type="button"
                          onClick={() => removeDealBreaker(dealBreaker)}
                          className="ml-1 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    Optional: List any absolute deal breakers in a potential match.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile-setup")}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-miamour-burgundy text-white"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Continue to Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MatchPreferences;
