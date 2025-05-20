
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, ThumbsUp, ThumbsDown, MessageCircleQuestion } from "lucide-react";

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // FAQ categories and items
  const faqCategories = [
    {
      id: "general",
      name: "General",
      items: [
        {
          question: "What is miamour?",
          answer: "miamour is a comprehensive relationship platform that combines matchmaking services with relationship counseling and support. Our mission is to help individuals find and nurture meaningful romantic connections."
        },
        {
          question: "How is miamour different from other dating apps?",
          answer: "Unlike traditional dating apps, miamour takes a holistic approach to relationships. We combine AI-powered matching with human expertise, offer relationship counseling services, and provide ongoing support throughout your journey. We focus on quality connections rather than endless swiping."
        },
        {
          question: "Is miamour available in my area?",
          answer: "miamour is currently available in major metropolitan areas across the United States, with plans to expand to more locations soon. Check our location settings to see if services are available in your area."
        },
        {
          question: "Do I need a subscription to use miamour?",
          answer: "While you can create a basic profile for free, a subscription is required to access our full range of services including messaging, viewing matches, and participating in counseling sessions. We offer various subscription tiers to meet different needs and budgets."
        }
      ]
    },
    {
      id: "account",
      name: "Account & Profile",
      items: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click the 'Sign Up' button on our homepage and follow the prompts. You'll need to provide basic information, verify your email, and complete some initial profile questions to get started."
        },
        {
          question: "Can I use miamour without sharing my personal information?",
          answer: "While we require basic information to create your account and provide our services, we take your privacy seriously. You control what information is visible to other users, and you can adjust your privacy settings at any time."
        },
        {
          question: "How do I delete my account?",
          answer: "To delete your account, go to 'Settings' > 'Privacy' > 'Delete Account'. Please note that this action is permanent and will remove all your data from our platform. If you just need a break, consider using the 'Pause Account' feature instead."
        },
        {
          question: "Can I change my email address or username?",
          answer: "Yes, you can update your email address and other account information in the 'Settings' section. Note that email changes require verification of the new email address."
        }
      ]
    },
    {
      id: "matching",
      name: "Matching System",
      items: [
        {
          question: "How does the matching system work?",
          answer: "Our matching algorithm considers multiple factors including your preferences, personality traits, relationship goals, and values. We use a combination of AI technology and human expertise to suggest compatible matches, rather than simply showing everyone in your area."
        },
        {
          question: "Why am I not getting many matches?",
          answer: "miamour focuses on quality over quantity. We carefully curate potential matches rather than showing endless profiles. Complete your profile with detailed information and preferences to improve your matching potential. Also, consider broadening your preferences if they're currently very specific."
        },
        {
          question: "Can I search for specific types of people?",
          answer: "While we don't offer a traditional search feature, you can set detailed preferences in your profile settings. Our algorithm will prioritize matches that align with your specified preferences while still considering compatibility factors."
        },
        {
          question: "How often are new matches provided?",
          answer: "Match frequency depends on your subscription level and the availability of compatible users in your area. Basic subscribers typically receive new match suggestions weekly, while premium subscribers receive more frequent updates."
        }
      ]
    },
    {
      id: "messaging",
      name: "Messaging & Communication",
      items: [
        {
          question: "Who can message me?",
          answer: "To reduce unwanted messages, only mutual matches can message each other on miamour. This ensures that conversations start on the basis of mutual interest."
        },
        {
          question: "Are messages monitored?",
          answer: "We use automated systems to detect inappropriate content, but we don't actively monitor individual conversations. We respect your privacy while maintaining community standards. You can report any concerning messages through the report feature."
        },
        {
          question: "Why can't I send messages?",
          answer: "Messaging is a premium feature available to subscribers. If you have an active subscription but still can't message, please ensure you're messaging a mutual match and check your account status in settings."
        },
        {
          question: "How do I know if someone read my message?",
          answer: "Read receipts are available for premium subscribers. Users can disable read receipts in their privacy settings if they prefer not to share when they've read messages."
        }
      ]
    },
    {
      id: "services",
      name: "Services & Features",
      items: [
        {
          question: "What therapy services does miamour offer?",
          answer: "miamour offers individual counseling, couples therapy, and relationship coaching. Our licensed therapists specialize in relationship dynamics and can help with communication issues, conflict resolution, intimacy concerns, and more."
        },
        {
          question: "How do I book a therapy session?",
          answer: "To book a therapy session, navigate to the 'Services' section and select 'Therapy Sessions.' You can browse therapist profiles, check availability, and book a session directly through our platform."
        },
        {
          question: "What is the ceremony planning service?",
          answer: "Our ceremony planning service helps couples plan meaningful relationship milestones, from engagement celebrations to wedding ceremonies. Our planners work with you to create personalized events that reflect your unique relationship."
        },
        {
          question: "How does personalized matchmaking work?",
          answer: "Personalized matchmaking is our premium service where you work directly with a professional matchmaker. They take time to understand your preferences, lifestyle, and relationship goals, then personally select and vet potential matches for you."
        }
      ]
    },
    {
      id: "billing",
      name: "Billing & Subscription",
      items: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment processor."
        },
        {
          question: "Do subscriptions auto-renew?",
          answer: "Yes, all subscriptions auto-renew by default to ensure uninterrupted service. You can disable auto-renewal in your account settings at any time before the next billing cycle."
        },
        {
          question: "What is your refund policy?",
          answer: "We offer prorated refunds for subscription cancellations within the first 14 days. After that period, you can cancel your subscription to prevent future charges, but we don't issue refunds for the current billing period."
        },
        {
          question: "Can I upgrade or downgrade my subscription?",
          answer: "Yes, you can change your subscription plan at any time in the 'Subscription' section of your account. When upgrading, you'll be charged the prorated difference immediately. When downgrading, changes take effect at the end of your current billing cycle."
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filterFAQs = (category) => {
    if (!searchQuery) return category.items;
    
    return category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Count total FAQs for display
  const totalFAQs = faqCategories.reduce((total, category) => total + category.items.length, 0);
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Frequently Asked Questions</h1>
          <p className="text-miamour-charcoal text-lg">
            Find answers to common questions about our services.
          </p>
        </div>
        
        <div className="bg-miamour-blush/30 rounded-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <MessageCircleQuestion className="h-10 w-10 text-miamour-burgundy mx-auto mb-2" />
              <h2 className="text-2xl font-serif font-medium text-miamour-burgundy">Search Our FAQ Database</h2>
              <p className="text-miamour-charcoal mb-4">Browse through {totalFAQs} frequently asked questions</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Type your question here..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue={faqCategories[0].id} className="space-y-8">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex h-auto p-1 whitespace-nowrap">
              {faqCategories.map(category => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {faqCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                    {category.name} Questions
                  </CardTitle>
                  <CardDescription>
                    Common questions about {category.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filterFAQs(category).length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filterFAQs(category).map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left font-medium text-miamour-burgundy">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-miamour-charcoal">
                            <div className="pb-4">
                              <p>{item.answer}</p>
                              <div className="flex items-center justify-end gap-4 mt-4">
                                <span className="text-sm text-gray-500">Was this helpful?</span>
                                <button className="p-1 hover:bg-gray-100 rounded-full">
                                  <ThumbsUp className="h-4 w-4 text-gray-500" />
                                </button>
                                <button className="p-1 hover:bg-gray-100 rounded-full">
                                  <ThumbsDown className="h-4 w-4 text-gray-500" />
                                </button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No matching questions found. Try a different search term.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12 bg-white p-6 rounded-lg border border-gray-100 text-center">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Still Have Questions?</h2>
          <p className="text-miamour-charcoal max-w-2xl mx-auto mb-6">
            If you couldn't find the answer you were looking for, our support team is ready to help you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-miamour-burgundy text-white">
              Contact Support
            </Button>
            <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy">
              Browse Help Center
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
