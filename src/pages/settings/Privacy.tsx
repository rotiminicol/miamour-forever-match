
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { LockIcon, Eye, EyeOff, UserRound, Layers, Settings, UserX, Download } from "lucide-react";

const Privacy = () => {
  const { toast } = useToast();
  const [privacyDistance, setPrivacyDistance] = useState([10]);
  
  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Saved",
      description: "Your privacy preferences have been updated successfully."
    });
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Privacy Settings</h1>
          <p className="text-miamour-charcoal text-lg">
            Control your privacy and data sharing preferences.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <LockIcon className="h-5 w-5 text-miamour-burgundy" />
              <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                Privacy Controls
              </CardTitle>
            </div>
            <CardDescription>
              Manage who can see your information and how it's shared
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-medium">Profile Visibility</Label>
                  <p className="text-sm text-gray-500">Control who can view your complete profile</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">Limited</span>
                  <Switch defaultChecked />
                  <span className="text-sm">Full</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-medium">Location Sharing</Label>
                  <p className="text-sm text-gray-500">Show your general location to potential matches</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">Off</span>
                  <Switch defaultChecked />
                  <span className="text-sm">On</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-base font-medium">Location Privacy Distance</Label>
                  <p className="text-sm text-gray-500">Only show city when users are further than this distance (miles)</p>
                </div>
                <div className="pt-2 px-1">
                  <Slider
                    defaultValue={[10]}
                    max={50}
                    step={5}
                    value={privacyDistance}
                    onValueChange={setPrivacyDistance}
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>5</span>
                    <span>{privacyDistance[0]} miles</span>
                    <span>50</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-medium">Online Status</Label>
                  <p className="text-sm text-gray-500">Show when you're active on the platform</p>
                </div>
                <div className="flex items-center gap-3">
                  <EyeOff className="h-4 w-4 text-gray-400" />
                  <Switch defaultChecked />
                  <Eye className="h-4 w-4 text-gray-800" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-medium">Read Receipts</Label>
                  <p className="text-sm text-gray-500">Let others know when you've read their messages</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-medium">Profile Photo Privacy</Label>
                  <p className="text-sm text-gray-500">Only show photos to your matches</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-miamour-burgundy text-white ml-auto" onClick={handleSavePrivacy}>
              Save Privacy Settings
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-miamour-burgundy" />
              <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                Profile Visibility Controls
              </CardTitle>
            </div>
            <CardDescription>
              Control which parts of your profile are visible to others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium text-miamour-burgundy">Personal Information Visibility</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center">
                    <Label>Full Name</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Age</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Education</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Occupation</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Religion</Label>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Political Views</Label>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-miamour-burgundy text-white ml-auto" onClick={handleSavePrivacy}>
              Save Visibility Settings
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-miamour-burgundy" />
              <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                Data & Cookies
              </CardTitle>
            </div>
            <CardDescription>
              Manage how we use your data and cookies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Cookie Preferences</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Essential Cookies</Label>
                      <p className="text-sm text-gray-500">Required for basic site functionality</p>
                    </div>
                    <Switch defaultChecked disabled />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Performance Cookies</Label>
                      <p className="text-sm text-gray-500">Help us improve site performance and experience</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Functional Cookies</Label>
                      <p className="text-sm text-gray-500">Enable enhanced features and personalization</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Targeting/Advertising Cookies</Label>
                      <p className="text-sm text-gray-500">Allow personalized advertisements</p>
                    </div>
                    <Switch />
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Data Usage Preferences</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Service Improvement</Label>
                      <p className="text-sm text-gray-500">Use your data to improve our services</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Personalized Experience</Label>
                      <p className="text-sm text-gray-500">Customize your experience based on usage</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Marketing Analytics</Label>
                      <p className="text-sm text-gray-500">Analyze usage for marketing purposes</p>
                    </div>
                    <Switch />
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Data Sharing</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Share with Partners</Label>
                      <p className="text-sm text-gray-500">Share data with trusted partners</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium">Third-Party Analytics</Label>
                      <p className="text-sm text-gray-500">Allow third-party analytics services</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button className="bg-miamour-burgundy text-white ml-auto" onClick={handleSavePrivacy}>
              Save Data Settings
            </Button>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-miamour-burgundy" />
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                  Download Your Data
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Request a copy of all your personal data that we store. This includes your profile information,
                messages, preferences, and activity.
              </p>
              <Button variant="outline" className="w-full">
                Request Data Download
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserX className="h-5 w-5 text-red-500" />
                <CardTitle className="text-xl font-serif font-medium text-red-600">
                  Delete Account
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
