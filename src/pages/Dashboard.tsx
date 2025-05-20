
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, MessageSquare, User, PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-miamour-burgundy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="py-12 px-4 md:px-8">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-miamour-burgundy mb-4">
          Welcome to Your Love Journey
        </h1>
        <p className="text-miamour-charcoal max-w-3xl">
          Track your matches, appointments, and messages all in one place.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-miamour-burgundy flex items-center">
              <Heart className="mr-2 h-5 w-5 text-miamour-gold" />
              My Matches
            </CardTitle>
            <CardDescription>Compatible partners</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-miamour-burgundy">0</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/matches')}>
              Find Matches
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-miamour-burgundy flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-miamour-gold" />
              Messages
            </CardTitle>
            <CardDescription>Conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-miamour-burgundy">0</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/messages')}>
              Open Inbox
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-miamour-burgundy flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-miamour-gold" />
              Appointments
            </CardTitle>
            <CardDescription>Upcoming sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-miamour-burgundy">0</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/appointments')}>
              Schedule Session
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-miamour-burgundy flex items-center">
              <User className="mr-2 h-5 w-5 text-miamour-gold" />
              Profile
            </CardTitle>
            <CardDescription>Completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-miamour-burgundy">0%</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
              Complete Profile
            </Button>
          </CardFooter>
        </Card>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Recommended Matches</h2>
        <Card className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-miamour-blush/20 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-miamour-pink" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Matches Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Complete your profile and preferences to start receiving personalized match recommendations.
            </p>
            <Button onClick={() => navigate('/profile-setup')} className="bg-miamour-burgundy text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Complete Your Profile
            </Button>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Upcoming Therapy Sessions</h2>
        <Card className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-miamour-blush/20 flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-miamour-pink" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Upcoming Sessions</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              You don't have any therapy sessions scheduled. Book a session to get expert relationship guidance.
            </p>
            <Button onClick={() => navigate('/appointments')} className="bg-miamour-burgundy text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule a Session
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
