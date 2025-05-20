
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Globe, Monitor, Moon, Sun, PaintBucket, Languages } from "lucide-react";

const Preferences = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/New_York");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [primaryColor, setPrimaryColor] = useState("pink");
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    matchNotifications: true,
    eventReminders: true,
    marketingEmails: false,
    activitySummary: true
  });
  
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully."
    });
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Preferences</h1>
          <p className="text-miamour-charcoal text-lg">
            Customize your miamour experience to suit your needs.
          </p>
        </div>
        
        <Tabs defaultValue="appearance" className="mb-10">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize how miamour looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium text-miamour-burgundy">Theme</Label>
                      <p className="text-sm text-gray-500">Select your preferred theme mode</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className={`p-2 rounded-lg ${theme === "light" ? "bg-miamour-blush/30" : "hover:bg-gray-100"}`}
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-5 w-5" />
                      </button>
                      <button
                        className={`p-2 rounded-lg ${theme === "system" ? "bg-miamour-blush/30" : "hover:bg-gray-100"}`}
                        onClick={() => setTheme("system")}
                      >
                        <Monitor className="h-5 w-5" />
                      </button>
                      <button
                        className={`p-2 rounded-lg ${theme === "dark" ? "bg-miamour-blush/30" : "hover:bg-gray-100"}`}
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-base font-medium text-miamour-burgundy">Color Theme</Label>
                    <p className="text-sm text-gray-500">Select your preferred accent color</p>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <button
                      className={`w-full h-12 rounded-lg bg-miamour-pink ${primaryColor === "pink" ? "ring-2 ring-miamour-burgundy" : ""}`}
                      onClick={() => setPrimaryColor("pink")}
                      aria-label="Pink"
                    />
                    <button
                      className={`w-full h-12 rounded-lg bg-miamour-burgundy ${primaryColor === "burgundy" ? "ring-2 ring-miamour-burgundy" : ""}`}
                      onClick={() => setPrimaryColor("burgundy")}
                      aria-label="Burgundy"
                    />
                    <button
                      className={`w-full h-12 rounded-lg bg-miamour-gold ${primaryColor === "gold" ? "ring-2 ring-miamour-burgundy" : ""}`}
                      onClick={() => setPrimaryColor("gold")}
                      aria-label="Gold"
                    />
                    <button
                      className={`w-full h-12 rounded-lg bg-purple-500 ${primaryColor === "purple" ? "ring-2 ring-miamour-burgundy" : ""}`}
                      onClick={() => setPrimaryColor("purple")}
                      aria-label="Purple"
                    />
                    <button
                      className={`w-full h-12 rounded-lg bg-blue-500 ${primaryColor === "blue" ? "ring-2 ring-miamour-burgundy" : ""}`}
                      onClick={() => setPrimaryColor("blue")}
                      aria-label="Blue"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium text-miamour-burgundy">Animations</Label>
                      <p className="text-sm text-gray-500">Enable or disable UI animations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium text-miamour-burgundy">Compact Mode</Label>
                      <p className="text-sm text-gray-500">Reduce spacing in the interface</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-miamour-burgundy text-white" onClick={handleSavePreferences}>
                  Save Appearance Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2 text-miamour-burgundy">
                    <Bell className="h-5 w-5" />
                    General Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleNotificationChange('emailNotifications')}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => handleNotificationChange('pushNotifications')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium text-miamour-burgundy">Notification Types</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-base">New Messages</Label>
                        <p className="text-sm text-gray-500">When someone sends you a message</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.messageNotifications}
                        onCheckedChange={() => handleNotificationChange('messageNotifications')}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-base">New Matches</Label>
                        <p className="text-sm text-gray-500">When you have a new match</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.matchNotifications}
                        onCheckedChange={() => handleNotificationChange('matchNotifications')}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-base">Event Reminders</Label>
                        <p className="text-sm text-gray-500">For upcoming appointments and events</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.eventReminders}
                        onCheckedChange={() => handleNotificationChange('eventReminders')}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">News, updates, and special offers</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={() => handleNotificationChange('marketingEmails')}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-base">Weekly Activity Summary</Label>
                        <p className="text-sm text-gray-500">Weekly recap of your activity</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.activitySummary}
                        onCheckedChange={() => handleNotificationChange('activitySummary')}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-miamour-burgundy text-white" onClick={handleSavePreferences}>
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="regional">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">
                  Regional Settings
                </CardTitle>
                <CardDescription>
                  Configure language, timezone, and formatting preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Languages className="h-5 w-5 text-miamour-burgundy" />
                    <Label className="text-base font-medium text-miamour-burgundy">Language</Label>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-5 w-5 text-miamour-burgundy" />
                    <Label className="text-base font-medium text-miamour-burgundy">Timezone</Label>
                  </div>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <PaintBucket className="h-5 w-5 text-miamour-burgundy" />
                    <Label className="text-base font-medium text-miamour-burgundy">Date Format</Label>
                  </div>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Date Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US)</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (European)</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base font-medium text-miamour-burgundy">24-Hour Time</Label>
                      <p className="text-sm text-gray-500">Use 24-hour time format (e.g. 14:00)</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-miamour-burgundy text-white" onClick={handleSavePreferences}>
                  Save Regional Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-miamour-blush/20 p-6 rounded-lg">
          <h2 className="text-xl font-serif font-medium text-miamour-burgundy mb-4">Profile Visibility</h2>
          <p className="text-miamour-charcoal mb-6">
            Control who can see your profile and how you appear in search results.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-base font-medium">Profile Visibility</Label>
                <p className="text-sm text-gray-500">Make your profile visible to other members</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-base font-medium">Show Activity Status</Label>
                <p className="text-sm text-gray-500">Show when you were last active</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-base font-medium">Appear in Search Results</Label>
                <p className="text-sm text-gray-500">Allow others to find you in searches</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
