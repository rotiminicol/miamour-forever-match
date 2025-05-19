
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, MessageSquare, User } from "lucide-react";
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
            <p className="text-3xl font-bold text-miamour-burgundy">3</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/matches')}>
              View Matches
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
            <p className="text-3xl font-bold text-miamour-burgundy">5</p>
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
            <p className="text-3xl font-bold text-miamour-burgundy">1</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/appointments')}>
              Manage Calendar
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
            <p className="text-3xl font-bold text-miamour-burgundy">70%</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/lovable-uploads/7f02a8d8-0b0a-46fd-bb7b-3d63b35e1677.png" 
                alt="Match" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Emma, 28</CardTitle>
              <CardDescription>Compatibility: 85%</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-miamour-charcoal">
              <p>Interests: Photography, Hiking, Reading</p>
              <p className="mt-2">Location: New York, NY</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-miamour-burgundy text-white">View Profile</Button>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/lovable-uploads/ba939aa2-7c2b-45d5-a38c-c9892cc2db4f.png" 
                alt="Match" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Michael, 31</CardTitle>
              <CardDescription>Compatibility: 82%</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-miamour-charcoal">
              <p>Interests: Cooking, Travel, Music</p>
              <p className="mt-2">Location: San Francisco, CA</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-miamour-burgundy text-white">View Profile</Button>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/lovable-uploads/e21a4b76-b28b-49de-9e63-0598991a5d03.png" 
                alt="Match" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Sophia, 26</CardTitle>
              <CardDescription>Compatibility: 78%</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-miamour-charcoal">
              <p>Interests: Yoga, Art, Film</p>
              <p className="mt-2">Location: Chicago, IL</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-miamour-burgundy text-white">View Profile</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Upcoming Therapy Session</h2>
        <div className="bg-miamour-cream p-6 rounded-lg border border-miamour-blush">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-lg font-medium text-miamour-burgundy">Couple's Communication Workshop</h3>
              <p className="text-miamour-charcoal">Therapist: Dr. Sarah Johnson</p>
              <p className="text-miamour-charcoal">Friday, May 22, 2024 • 3:00 PM EST</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy">
                Reschedule
              </Button>
              <Button className="bg-miamour-burgundy text-white">
                Join Session
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
