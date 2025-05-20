
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { format, addHours, isSameDay, isBefore, addDays } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/contexts/NotificationsContext";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Users, 
  Heart, 
  Phone, 
  Star, 
  ChevronRight, 
  Check,
  X, // Added the missing X icon import
} from "lucide-react";

// Types
interface TherapistType {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  price: string;
  bio: string;
  availability: string[];
}

interface AppointmentType {
  id: string;
  therapistId: string;
  date: Date;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

// Sample Data
const THERAPISTS: TherapistType[] = [
  {
    id: "t1",
    name: "Dr. Sarah Thompson",
    specialty: "Couples Therapy",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    price: "₦25,000",
    bio: "Dr. Thompson specializes in helping couples build stronger communication patterns and resolve conflicts. She has 15 years of experience in relationship counseling.",
    availability: ["10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  {
    id: "t2",
    name: "Dr. Michael Chen",
    specialty: "Marriage Counseling",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    price: "₦30,000",
    bio: "With over 20 years of experience, Dr. Chen helps couples navigate complex relationship challenges and build lasting bonds through evidence-based approaches.",
    availability: ["09:00", "11:30", "13:30", "16:30"]
  },
  {
    id: "t3",
    name: "Dr. Jessica Roberts",
    specialty: "Premarital Counseling",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    price: "₦20,000",
    bio: "Dr. Roberts specializes in preparing couples for marriage through personalized guidance addressing communication, finances, intimacy, and future planning.",
    availability: ["10:30", "12:00", "13:00", "15:30", "17:00"]
  },
  {
    id: "t4",
    name: "Dr. David Wilson",
    specialty: "Family Therapy",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    price: "₦22,000",
    bio: "Dr. Wilson works with couples and families to improve relationship dynamics and create healthier patterns of interaction across family systems.",
    availability: ["09:30", "10:30", "14:30", "16:00", "17:30"]
  }
];

const SAMPLE_APPOINTMENTS: AppointmentType[] = [
  {
    id: "a1",
    therapistId: "t1",
    date: addHours(new Date(), 48),
    type: "Video Session",
    status: 'upcoming'
  },
  {
    id: "a2",
    therapistId: "t2",
    date: addDays(new Date(), -7),
    type: "In-person Session",
    status: 'completed'
  },
  {
    id: "a3",
    therapistId: "t3",
    date: addDays(new Date(), -14),
    type: "Phone Session",
    status: 'completed'
  }
];

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTherapist, setSelectedTherapist] = useState<TherapistType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("video");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentType[]>(SAMPLE_APPOINTMENTS);
  const [activeTab, setActiveTab] = useState("upcoming");
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  
  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter(appointment => appointment.status === activeTab);
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!date || !selectedTherapist || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select a date, therapist and time slot.",
        variant: "destructive"
      });
      return;
    }
    
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes);
    
    const newAppointment: AppointmentType = {
      id: `a${appointments.length + 1}`,
      therapistId: selectedTherapist.id,
      date: appointmentDate,
      type: selectedType === "video" ? "Video Session" : selectedType === "phone" ? "Phone Session" : "In-person Session",
      status: 'upcoming'
    };
    
    setAppointments([...appointments, newAppointment]);
    setBookingOpen(false);
    
    // Reset form
    setSelectedTherapist(null);
    setSelectedTime("");
    
    // Show toast and notification
    toast({
      title: "Appointment booked",
      description: `Your appointment with ${selectedTherapist.name} on ${format(appointmentDate, "MMMM d, yyyy 'at' h:mm a")} has been confirmed.`,
    });
    
    addNotification({
      title: "Appointment Confirmed",
      message: `Your appointment with ${selectedTherapist.name} has been scheduled for ${format(appointmentDate, "MMMM d, yyyy 'at' h:mm a")}`,
      type: "success"
    });
  };
  
  // Function to cancel appointment
  const cancelAppointment = (id: string) => {
    setAppointments(
      appointments.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: 'cancelled' } 
          : appointment
      )
    );
    
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
    
    addNotification({
      title: "Appointment Cancelled",
      message: "Your appointment has been cancelled. You can book a new one anytime.",
      type: "info"
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800">Appointments</h1>
        
        <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700">
              Book New Appointment
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Book Therapy Session</DialogTitle>
              <DialogDescription>
                Schedule your session with one of our certified relationship therapists.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Session Type Selection */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Session Type</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className={`flex gap-2 ${selectedType === "video" ? "bg-pink-50 border-pink-200 text-pink-700" : ""}`}
                    onClick={() => setSelectedType("video")}
                  >
                    <Video className="h-4 w-4" />
                    Video Call
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex gap-2 ${selectedType === "phone" ? "bg-pink-50 border-pink-200 text-pink-700" : ""}`}
                    onClick={() => setSelectedType("phone")}
                  >
                    <Phone className="h-4 w-4" />
                    Phone Call
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex gap-2 ${selectedType === "inperson" ? "bg-pink-50 border-pink-200 text-pink-700" : ""}`}
                    onClick={() => setSelectedType("inperson")}
                  >
                    <Users className="h-4 w-4" />
                    In Person
                  </Button>
                </div>
              </div>
              
              {/* Date Selection */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Session Date</h3>
                <Card>
                  <CardContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => isBefore(date, new Date()) && !isSameDay(date, new Date())}
                      className="border-0"
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Therapist Selection */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Select Therapist</h3>
                <Select 
                  value={selectedTherapist?.id || ""} 
                  onValueChange={(value) => {
                    const therapist = THERAPISTS.find(t => t.id === value);
                    setSelectedTherapist(therapist || null);
                    setSelectedTime("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a therapist" />
                  </SelectTrigger>
                  <SelectContent>
                    {THERAPISTS.map((therapist) => (
                      <SelectItem key={therapist.id} value={therapist.id}>
                        {therapist.name} - {therapist.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Therapist Details */}
              {selectedTherapist && (
                <div className="flex gap-4 items-center p-4 border rounded-lg bg-gray-50">
                  <img 
                    src={selectedTherapist.image} 
                    alt={selectedTherapist.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-pink-100" 
                  />
                  <div>
                    <h4 className="text-lg font-medium">{selectedTherapist.name}</h4>
                    <p className="text-sm text-gray-500">{selectedTherapist.specialty}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">{selectedTherapist.rating}</span>
                      <span className="text-sm ml-auto text-pink-600">{selectedTherapist.price} / session</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Time Selection */}
              {selectedTherapist && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Available Time Slots</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedTherapist.availability.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className={`${selectedTime === time ? "bg-pink-50 border-pink-300 text-pink-700" : ""}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setBookingOpen(false)}
                className="border-gray-200"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmBooking}
                disabled={!date || !selectedTherapist || !selectedTime}
                className="bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700"
              >
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Tabs for filtering appointments */}
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            Completed
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            Cancelled
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="min-h-[400px]">
          {filteredAppointments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => {
                const therapist = THERAPISTS.find(t => t.id === appointment.therapistId) as TherapistType;
                return (
                  <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-600 h-2"></div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{appointment.type}</CardTitle>
                        <div className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
                          Upcoming
                        </div>
                      </div>
                      <CardDescription className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {format(appointment.date, "MMMM d, yyyy")}
                        <span className="mx-2">•</span>
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {format(appointment.date, "h:mm a")}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="flex items-center">
                        <img 
                          src={therapist.image} 
                          alt={therapist.name}
                          className="h-10 w-10 rounded-full object-cover mr-3" 
                        />
                        <div>
                          <p className="font-medium">{therapist.name}</p>
                          <p className="text-sm text-gray-500">{therapist.specialty}</p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between border-t pt-3 bg-gray-50">
                      <Button variant="ghost" size="sm" onClick={() => cancelAppointment(appointment.id)}>
                        Cancel
                      </Button>
                      <Button size="sm" variant="outline" className="border-pink-200 text-pink-700">
                        <Video className="h-4 w-4 mr-1" /> Join Session
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="mb-4 bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">No upcoming appointments</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                You don't have any scheduled appointments. Book a session with one of our therapists.
              </p>
              <Button 
                onClick={() => setBookingOpen(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                Book An Appointment
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="min-h-[400px]">
          {filteredAppointments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => {
                const therapist = THERAPISTS.find(t => t.id === appointment.therapistId) as TherapistType;
                return (
                  <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2"></div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{appointment.type}</CardTitle>
                        <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Completed
                        </div>
                      </div>
                      <CardDescription className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {format(appointment.date, "MMMM d, yyyy")}
                        <span className="mx-2">•</span>
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {format(appointment.date, "h:mm a")}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="flex items-center">
                        <img 
                          src={therapist.image} 
                          alt={therapist.name}
                          className="h-10 w-10 rounded-full object-cover mr-3" 
                        />
                        <div>
                          <p className="font-medium">{therapist.name}</p>
                          <p className="text-sm text-gray-500">{therapist.specialty}</p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between border-t pt-3 bg-gray-50">
                      <Button variant="ghost" size="sm">
                        Session Notes
                      </Button>
                      <Button size="sm" variant="outline" className="border-pink-200 text-pink-700">
                        Book Follow-up
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="mb-4 bg-gray-200 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">No completed sessions</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                You haven't completed any therapy sessions yet.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="min-h-[400px]">
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <div className="mb-4 bg-gray-200 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
              <X className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No cancelled appointments</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              You don't have any cancelled appointments.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Featured Therapists */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Our Therapy Specialists</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {THERAPISTS.map((therapist) => (
            <motion.div
              key={therapist.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <div className="h-48 relative">
                <img 
                  src={therapist.image} 
                  alt={therapist.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 right-0 m-2 bg-white text-yellow-500 rounded-full px-2 py-1 text-sm font-medium flex items-center">
                  <Star className="h-3 w-3 fill-yellow-500 mr-1" />
                  {therapist.rating}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg">{therapist.name}</h3>
                <p className="text-sm text-gray-500">{therapist.specialty}</p>
                
                <div className="mt-3 border-t pt-3 flex justify-between items-center">
                  <p className="text-pink-600 font-medium">{therapist.price}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => {
                      setSelectedTherapist(therapist);
                      setBookingOpen(true);
                    }}
                  >
                    Book Session
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
