
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
  Phone, 
  Star, 
  ChevronRight, 
  Check,
  X,
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
  planId?: number;
}

interface TherapyPlanType {
  id: number;
  name: string;
  description: string;
  sessions: number;
  priceNGN: number;
  priceUSD: number;
  save: string;
  features: string[];
  popular?: boolean;
}

// Nigerian Therapists Data
const THERAPISTS: TherapistType[] = [
  {
    id: "t1",
    name: "Miss Esther",
    specialty: "Couples Therapy",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    price: "₦25,000",
    bio: "Miss Esther specializes in helping couples build stronger communication patterns and resolve conflicts. She has 10 years of experience in relationship counseling.",
    availability: ["10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  {
    id: "t2",
    name: "Rachael",
    specialty: "Marriage Counseling",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    price: "₦30,000",
    bio: "Rachael helps couples navigate complex relationship challenges and build lasting bonds through evidence-based approaches.",
    availability: ["09:00", "11:30", "13:30", "16:30"]
  },
  {
    id: "t3",
    name: "Florence",
    specialty: "Premarital Counseling",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    price: "₦20,000",
    bio: "Florence specializes in preparing couples for marriage through personalized guidance addressing communication, finances, intimacy, and future planning.",
    availability: ["10:30", "12:00", "13:00", "15:30", "17:00"]
  },
  {
    id: "t4",
    name: "Odi",
    specialty: "Family Therapy",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    price: "₦22,000",
    bio: "Odi works with couples and families to improve relationship dynamics and create healthier patterns of interaction across family systems.",
    availability: ["09:30", "10:30", "14:30", "16:00", "17:30"]
  },
  {
    id: "t5",
    name: "Sonya",
    specialty: "Individual Therapy",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    price: "₦28,000",
    bio: "Sonya provides individual therapy focused on personal growth, self-esteem, and emotional well-being.",
    availability: ["09:00", "11:00", "13:00", "15:00", "17:00"]
  },
  {
    id: "t6",
    name: "Mr Joseph",
    specialty: "Stress Management",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    price: "₦24,000",
    bio: "Mr Joseph helps clients manage stress and anxiety through mindfulness and relaxation techniques.",
    availability: ["08:30", "10:00", "12:30", "14:00", "16:30"]
  }
];

// Therapy Plans Data
const THERAPY_PLANS: TherapyPlanType[] = [
  {
    id: 1,
    name: "Reset Package",
    description: "For those needing a fresh start",
    sessions: 5,
    priceNGN: 250000,
    priceUSD: 156.25,
    save: "15%",
    features: [
      "Comprehensive assessment",
      "New perspective techniques",
      "Goal setting",
      "Action plan development"
    ]
  },
  {
    id: 2,
    name: "Healing Plan",
    description: "Deep emotional work and recovery",
    sessions: 5,
    priceNGN: 350000,
    priceUSD: 218.75,
    save: "25%",
    popular: true,
    features: [
      "Emotional healing",
      "Trauma recovery",
      "Mind-body connection",
      "Resilience building"
    ]
  },
  {
    id: 3,
    name: "Mindful Living",
    description: "Focus on stress and anxiety reduction",
    sessions: 5,
    priceNGN: 300000,
    priceUSD: 156.25,
    save: "15%",
    features: [
      "Mindfulness practices",
      "Stress management",
      "Relaxation techniques",
      "Coping strategies"
    ]
  },
  {
    id: 4,
    name: "Inner Peace",
    description: "Managing depression and finding balance",
    sessions: 5,
    priceNGN: 400000,
    priceUSD: 250.00,
    save: "35%",
    features: [
      "Depression management",
      "Mood regulation",
      "Mindfulness training",
      "Life balance"
    ]
  },
  {
    id: 5,
    name: "Confidence Package",
    description: "Self-esteem and personal growth",
    sessions: 5,
    priceNGN: 450000,
    priceUSD: 187.50,
    save: "20%",
    features: [
      "Self-esteem building",
      "Personal growth",
      "Boundary setting",
      "Empowerment techniques"
    ]
  }
];

// Sample Appointments
const SAMPLE_APPOINTMENTS: AppointmentType[] = [
  {
    id: "a1",
    therapistId: "t1",
    date: addHours(new Date(), 48),
    type: "Video Session",
    status: 'upcoming',
    planId: 1
  },
  {
    id: "a2",
    therapistId: "t2",
    date: addDays(new Date(), -7),
    type: "In-person Session",
    status: 'completed',
    planId: 2
  },
  {
    id: "a3",
    therapistId: "t3",
    date: addDays(new Date(), -14),
    type: "Phone Session",
    status: 'completed',
    planId: 3
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
  const [selectedPlan, setSelectedPlan] = useState<TherapyPlanType | null>(null);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter(appointment => appointment.status === activeTab);

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!date || !selectedTherapist || !selectedTime || !selectedPlan) {
      toast({
        title: "Missing information",
        description: "Please select a plan, date, therapist and time slot.",
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
      status: 'upcoming',
      planId: selectedPlan.id
    };

    setAppointments([...appointments, newAppointment]);
    setBookingOpen(false);

    // Reset form
    setSelectedTherapist(null);
    setSelectedTime("");
    setSelectedPlan(null);

    // Show toast and notification
    toast({
      title: "Appointment booked",
      description: `Your appointment with ${selectedTherapist.name} on ${format(appointmentDate, "MMMM d, yyyy 'at' h:mm a")} for the ${selectedPlan.name} has been confirmed.`,
    });

    addNotification({
      title: "Appointment Confirmed",
      message: `Your appointment with ${selectedTherapist.name} for the ${selectedPlan.name} has been scheduled for ${format(appointmentDate, "MMMM d, yyyy 'at' h:mm a")}`,
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
      {/* Therapy Plans Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Therapy Plans</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {THERAPY_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative border-2 ${selectedPlan?.id === plan.id ? "border-pink-500 shadow-lg" : "border-gray-200"} transition-all`}
              onClick={() => setSelectedPlan(plan)}
              style={{ cursor: "pointer" }}
            >
              {plan.popular && (
                <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Most Popular
                </span>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold text-pink-600 mr-2">₦{plan.priceNGN.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">/ {plan.sessions} sessions</span>
                  <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{plan.save} off</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  size="sm"
                  variant={selectedPlan?.id === plan.id ? "default" : "outline"}
                  className={selectedPlan?.id === plan.id ? "bg-pink-500 text-white" : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(plan);
                    setBookingOpen(true);
                  }}
                >
                  {selectedPlan?.id === plan.id ? "Selected" : "Choose Plan"}
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

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
  {/* Make the main content scrollable */}
  <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
    {/* Plan Selection */}
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Therapy Plan</h3>
      <Select
        value={selectedPlan?.id ? String(selectedPlan.id) : ""}
        onValueChange={(value) => {
          const plan = THERAPY_PLANS.find(p => String(p.id) === value);
          setSelectedPlan(plan || null);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose a plan" />
        </SelectTrigger>
        <SelectContent>
          {THERAPY_PLANS.map((plan) => (
            <SelectItem key={plan.id} value={String(plan.id)}>
              {plan.name} ({plan.sessions} sessions) - ₦{plan.priceNGN.toLocaleString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedPlan && (
        <div className="mt-2 p-3 bg-pink-50 rounded border text-sm">
          <div className="font-semibold">{selectedPlan.name}</div>
          <div className="text-xs text-gray-500">{selectedPlan.description}</div>
          <ul className="list-disc pl-5 mt-1">
            {selectedPlan.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
    </div>
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
                disabled={!date || !selectedTherapist || !selectedTime || !selectedPlan}
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
                const plan = THERAPY_PLANS.find(p => p.id === appointment.planId);
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
                      {plan && (
                        <div className="mt-2 text-xs text-pink-700 font-semibold">
                          Plan: {plan.name}
                        </div>
                      )}
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
                const plan = THERAPY_PLANS.find(p => p.id === appointment.planId);
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
                      {plan && (
                        <div className="mt-2 text-xs text-green-700 font-semibold">
                          Plan: {plan.name}
                        </div>
                      )}
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
