import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // Changed from FormLabel to Label
import { useToast } from "@/components/ui/use-toast";
import { Search, MessageSquare, LifeBuoy, HelpCircle, ChevronRight, MailQuestion, Phone, Video } from "lucide-react";

const HelpSupport = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactSubject || !contactMessage) {
      toast({
        title: "Please complete all fields",
        description: "Both subject and message are required.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, send this to the backend
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });

    setContactSubject("");
    setContactMessage("");
  };

  // Icon components
  const User = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="5"></circle>
      <path d="M20 21a8 8 0 0 0-16 0"></path>
    </svg>
  );

  const Heart = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
  );

  const CreditCard = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
      <line x1="2" x2="22" y1="10" y2="10"></line>
    </svg>
  );

  const Lock = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const Calendar = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
      <line x1="16" x2="16" y1="2" y2="6"></line>
      <line x1="8" x2="8" y1="2" y2="6"></line>
      <line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
  );

  // Popular help topics
  const popularTopics = [
    {
      id: "account",
      icon: <User className="h-5 w-5 text-miamour-burgundy" />,
      title: "Account Settings",
      description: "Manage your account details, password, and security",
    },
    {
      id: "matches",
      icon: <Heart className="h-5 w-5 text-miamour-burgundy" />,
      title: "Matching System",
      description: "How our matching algorithm works and tips for better matches",
    },
    {
      id: "billing",
      icon: <CreditCard className="h-5 w-5 text-miamour-burgundy" />,
      title: "Billing & Payments",
      description: "Subscription management, payment methods, and refunds",
    },
    {
      id: "privacy",
      icon: <Lock className="h-5 w-5 text-miamour-burgundy" />,
      title: "Privacy & Safety",
      description: "Learn how we protect your data and privacy",
    },
    {
      id: "appointments",
      icon: <Calendar className="h-5 w-5 text-miamour-burgundy" />,
      title: "Appointments & Services",
      description: "Information about our therapy and matchmaking services",
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How does the matching system work?",
      answer:
        "Our matching system uses a sophisticated algorithm that considers your preferences, interests, values, and personality traits to find compatible matches. The more information you provide in your profile and preferences, the better matches we can suggest for you.",
    },
    {
      question: "Can I change my subscription plan?",
      answer:
        "Yes, you can change your subscription plan at any time. Go to 'Subscriptions' in your account settings to view available options. When upgrading, you'll immediately gain access to new features. When downgrading, changes will take effect at the end of your current billing period.",
    },
    {
      question: "How can I schedule a therapy session?",
      answer:
        "To schedule a therapy session, navigate to the 'Appointments' section from your dashboard. Select 'Therapy Sessions' from the services menu, choose a therapist, and pick an available time slot that works for you. You'll receive a confirmation email with session details.",
    },
    {
      question: "What is the cancellation policy for appointments?",
      answer:
        "Appointments can be cancelled or rescheduled up to 24 hours before the scheduled time without any penalty. For cancellations made with less than 24 hours notice, a cancellation fee equal to 50% of the session cost may apply.",
    },
    {
      question: "How do I update my preferences?",
      answer:
        "To update your match preferences, go to the 'Preferences' section in your account settings. There, you can modify attributes like age range, location preferences, and important values or interests you're looking for in a potential match.",
    },
  ];

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Help & Support</h1>
          <p className="text-miamour-charcoal text-lg">
            Get the help you need with our comprehensive support resources.
          </p>
        </div>

        <div className="bg-miamour-blush/30 rounded-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4 text-center">How can we help you?</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search for help topics..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="help-center" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="help-center" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Help Center</span>
            </TabsTrigger>
            <TabsTrigger value="faqs" className="gap-2">
              <LifeBuoy className="h-4 w-4" />
              <span>FAQs</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Us</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="help-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-medium text-miamour-burgundy">Popular Topics</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularTopics.map((topic) => (
                  <Card key={topic.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-miamour-blush/30 p-3 rounded-full">{topic.icon}</div>
                        <div>
                          <h3 className="font-medium text-miamour-burgundy mb-1">{topic.title}</h3>
                          <p className="text-sm text-gray-600">{topic.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <h2 className="text-xl font-serif font-medium text-miamour-burgundy mb-4">Recent Help Articles</h2>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-md transition-colors">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy">Getting Started with miamour</h3>
                        <p className="text-sm text-gray-600">A comprehensive guide for new members</p>
                      </div>
                      <Badge className="bg-miamour-pink text-white">New</Badge>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-md transition-colors">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy">How to Set Up Your Perfect Profile</h3>
                        <p className="text-sm text-gray-600">Tips for creating an attractive profile</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-md transition-colors">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy">Understanding the Matching Algorithm</h3>
                        <p className="text-sm text-gray-600">How we find your perfect match</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-md transition-colors">
                      <div>
                        <h3 className="font-medium text-miamour-burgundy">Guide to Therapy Services</h3>
                        <p className="text-sm text-gray-600">What to expect from our counseling options</p>
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy">
                    View All Help Articles
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faqs">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Quick answers to common questions about our services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-miamour-burgundy mb-2">{item.question}</h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">Can't find what you're looking for?</p>
                <Button className="bg-miamour-burgundy text-white">View All FAQs</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                      Contact Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-miamour-blush/30 p-2 rounded-full">
                        <MailQuestion className="h-5 w-5 text-miamour-burgundy" />
                      </div>
                      <div>
                        <h3 className="font-medium text-miamour-burgundy">Email Support</h3>
                        <p className="text-sm text-gray-600">support@miamour.me</p>
                        <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-miamour-blush/30 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-miamour-burgundy" />
                      </div>
                      <div>
                        <h3 className="font-medium text-miamour-burgundy">Phone Support</h3>
                        <p className="text-sm text-gray-600">1-800-miamour</p>
                        <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am-7pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-miamour-blush/30 p-2 rounded-full">
                        <Video className="h-5 w-5 text-miamour-burgundy" />
                      </div>
                      <div>
                        <h3 className="font-medium text-miamour-burgundy">Virtual Meeting</h3>
                        <p className="text-sm text-gray-600">Schedule a video call</p>
                        <p className="text-xs text-gray-500 mt-1">For complex issues</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-miamour-burgundy mb-3">Support Hours</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 7:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 5:00 PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>12:00 PM - 4:00 PM EST</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription>We'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitMessage} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Input
                        placeholder="What is your question about?"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea
                        placeholder="Please describe your issue or question in detail..."
                        className="min-h-[150px]"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-miamour-burgundy text-white">
                      Submit Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpSupport;