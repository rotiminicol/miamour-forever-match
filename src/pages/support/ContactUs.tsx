
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, topic: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.topic || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        topic: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Contact Us</h1>
          <p className="text-miamour-charcoal text-lg">
            We're here to help and answer any questions you might have.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-6">Get In Touch</h2>
            
            <div className="prose max-w-none text-miamour-charcoal mb-8">
              <p>
                Whether you have a question about our services, need help with your account, or want to provide feedback, 
                our team is ready to assist you. Fill out the form, and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-miamour-blush/20 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-miamour-burgundy" />
                </div>
                <div>
                  <h3 className="font-medium text-miamour-burgundy">Phone</h3>
                  <p className="text-miamour-charcoal">1-800-MIAMOUR (642-6687)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-miamour-blush/20 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-miamour-burgundy" />
                </div>
                <div>
                  <h3 className="font-medium text-miamour-burgundy">Email</h3>
                  <p className="text-miamour-charcoal">contact@miamour.me</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-miamour-blush/20 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-miamour-burgundy" />
                </div>
                <div>
                  <h3 className="font-medium text-miamour-burgundy">Main Office</h3>
                  <p className="text-miamour-charcoal">
                    123 Love Lane<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-miamour-blush/20 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-miamour-burgundy" />
                </div>
                <div>
                  <h3 className="font-medium text-miamour-burgundy">Hours</h3>
                  <p className="text-miamour-charcoal">
                    Monday - Friday: 9:00 AM - 7:00 PM EST<br />
                    Saturday: 10:00 AM - 5:00 PM EST<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      name="name" 
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      name="email" 
                      type="email"
                      placeholder="Your email address" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="topic">What can we help you with?</Label>
                    <Select value={formData.topic} onValueChange={handleSelectChange}>
                      <SelectTrigger id="topic">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="matches">Matching System</SelectItem>
                        <SelectItem value="therapy">Therapy Services</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Please describe how we can help you..."
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit"
                      className="w-full bg-miamour-burgundy text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-miamour-blush/20 rounded-lg p-6 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">Looking for Immediate Help?</h2>
            <p className="text-miamour-charcoal mb-6">
              Our help center contains detailed information about our services, FAQs, and helpful guides.
            </p>
            <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy">
              <span>Visit Help Center</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-6 text-center">Find Us</h2>
          <div className="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-miamour-charcoal">Interactive Map Will Be Displayed Here</p>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">We Value Your Feedback</h2>
          <p className="text-miamour-charcoal mb-6">
            At MiAmour, we're constantly striving to improve our services. Your feedback helps us create
            a better experience for everyone in our community.
          </p>
          <Button className="bg-miamour-burgundy text-white">
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
