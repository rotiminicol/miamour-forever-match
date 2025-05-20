
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, CheckCircle, X, Camera, Upload } from "lucide-react";

interface FormData {
  name: string;
  age: string;
  email: string;
  profilePic: string | null;
  familyValues: string;
  religion: string;
  careerGoals: string;
  financialPriorities: string;
  lifestylePrefs: string[];
  marriageGoals: string;
  children: string;
  conflictStyle: string;
  personalityTraits: string[];
  gallery: string[];
}

interface ProfileFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const ProfileForm = ({ onSubmit, initialData = {} }: ProfileFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: initialData.name || "",
    age: initialData.age || "",
    email: initialData.email || "",
    profilePic: initialData.profilePic || null,
    familyValues: initialData.familyValues || "",
    religion: initialData.religion || "",
    careerGoals: initialData.careerGoals || "",
    financialPriorities: initialData.financialPriorities || "",
    lifestylePrefs: initialData.lifestylePrefs || [],
    marriageGoals: initialData.marriageGoals || "",
    children: initialData.children || "",
    conflictStyle: initialData.conflictStyle || "",
    personalityTraits: initialData.personalityTraits || [],
    gallery: initialData.gallery || []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const galleryRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { toast } = useToast();

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.age || parseInt(formData.age) < 18) newErrors.age = "Must be 18 or older";
      if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        newErrors.email = "Valid email is required";
      }
      if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";
    } else if (step === 2) {
      if (!formData.familyValues) newErrors.familyValues = "Please select an option";
      if (!formData.religion) newErrors.religion = "Please select an option";
      if (!formData.careerGoals) newErrors.careerGoals = "Please select an option";
      if (!formData.financialPriorities) newErrors.financialPriorities = "Please select an option";
      if (formData.lifestylePrefs.length === 0) newErrors.lifestylePrefs = "Select at least one preference";
    } else if (step === 3) {
      if (!formData.marriageGoals.trim()) newErrors.marriageGoals = "This field is required";
      if (!formData.children) newErrors.children = "Please select an option";
      if (!formData.conflictStyle) newErrors.conflictStyle = "Please select an option";
      if (formData.personalityTraits.length < 3) newErrors.personalityTraits = "Select at least three traits";
      if (formData.gallery.length < 2) newErrors.gallery = "Upload at least two photos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profilePic' | 'gallery', index: number | null = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((prev) => ({ ...prev, [type]: "Only JPG/PNG files are allowed" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [type]: "Image must be less than 5MB" }));
      return;
    }

    setUploading(true);
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      if (type === "profilePic") {
        setFormData((prev) => ({ ...prev, profilePic: url }));
      } else if (type === "gallery") {
        setFormData((prev) => ({
          ...prev,
          gallery: index !== null && prev.gallery[index]
            ? prev.gallery.map((item, i) => (i === index ? url : item))
            : [...prev.gallery, url]
        }));
      }
      setErrors((prev) => ({ ...prev, [type]: undefined }));
      setUploading(false);
    }, 1000);
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      } else {
        toast({
          title: "Profile Submitted",
          description: "Your profile information has been successfully saved.",
        });
        onSubmit(formData);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleCheckbox = (value: string, field: 'lifestylePrefs' | 'personalityTraits') => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    setFormData(prev => ({
      ...prev,
      [field]: newValues
    }));
    
    // Clear error if there is one and the field now has a value
    if (errors[field] && newValues.length > 0) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const lifestyleOptions = [
    { value: "Urban", img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390" },
    { value: "Suburban", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { value: "Rural", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { value: "Travel", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }
  ];

  const personalityTraits = ["Empathetic", "Ambitious", "Humorous", "Loyal", "Adventurous", "Calm"];

  const variants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  };

  const steps = [
    { title: "Personal Information" },
    { title: "Lifestyle & Values" },
    { title: "Relationship Goals" }
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100">
      {/* Progress Indicator */}
      <div className="flex justify-between mb-8">
        {steps.map((s, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                step >= index + 1 ? "bg-gradient-to-r from-pink-400 to-pink-600" : "bg-gray-200"
              }`}
              animate={{ scale: step === index + 1 ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {index + 1}
            </motion.div>
            <span className={`text-xs mt-2 ${step >= index + 1 ? "text-gray-800" : "text-gray-500"}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Personal Information</h2>
              
              <div>
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="mt-1 border-pink-100 focus:border-pink-400"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="age" className="text-gray-700">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Enter your age"
                  className="mt-1 border-pink-100 focus:border-pink-400"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="mt-1 border-pink-100 focus:border-pink-400"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="profilePic" className="text-gray-700">Profile Picture</Label>
                <div className="mt-1 flex items-center">
                  {!formData.profilePic ? (
                    <div className="relative">
                      <Button
                        type="button"
                        className="flex items-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-100"
                        onClick={() => profilePicRef.current?.click()}
                      >
                        <Camera className="h-4 w-4" />
                        Choose Photo
                      </Button>
                      <input
                        id="profilePic"
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleImageUpload(e, "profilePic")}
                        className="hidden"
                        ref={profilePicRef}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <motion.img
                        src={formData.profilePic}
                        alt="Profile Preview"
                        className="h-24 w-24 rounded-full object-cover border-2 border-pink-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-200"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, profilePic: null }));
                          if (profilePicRef.current) profilePicRef.current.value = '';
                        }}
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                  
                  {uploading && <p className="ml-3 text-sm text-gray-500">Uploading...</p>}
                </div>
                {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Lifestyle & Values</h2>
              
              <div>
                <Label htmlFor="familyValues" className="text-gray-700">Family Values</Label>
                <Select
                  value={formData.familyValues}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, familyValues: value }))}
                >
                  <SelectTrigger id="familyValues" className="mt-1 border-pink-100">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Traditional">Traditional (Close-knit, family-first)</SelectItem>
                    <SelectItem value="Modern">Modern (Independent, balanced with family)</SelectItem>
                    <SelectItem value="Mixed">Mixed (Blend of traditional and modern)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.familyValues && <p className="text-red-500 text-sm mt-1">{errors.familyValues}</p>}
              </div>
              
              <div>
                <Label htmlFor="religion" className="text-gray-700">Religious Beliefs</Label>
                <Select
                  value={formData.religion}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))}
                >
                  <SelectTrigger id="religion" className="mt-1 border-pink-100">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Christianity">Christianity</SelectItem>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Hinduism">Hinduism</SelectItem>
                    <SelectItem value="Buddhism">Buddhism</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
                {errors.religion && <p className="text-red-500 text-sm mt-1">{errors.religion}</p>}
              </div>
              
              <div>
                <Label htmlFor="careerGoals" className="text-gray-700">Career Goals</Label>
                <Select
                  value={formData.careerGoals}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, careerGoals: value }))}
                >
                  <SelectTrigger id="careerGoals" className="mt-1 border-pink-100">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ambitious">Ambitious (Career-driven, high aspirations)</SelectItem>
                    <SelectItem value="Balanced">Balanced (Work-life balance priority)</SelectItem>
                    <SelectItem value="Flexible">Flexible (Open to change, less career-focused)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.careerGoals && <p className="text-red-500 text-sm mt-1">{errors.careerGoals}</p>}
              </div>
              
              <div>
                <Label htmlFor="financialPriorities" className="text-gray-700">Financial Priorities</Label>
                <Select
                  value={formData.financialPriorities}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, financialPriorities: value }))}
                >
                  <SelectTrigger id="financialPriorities" className="mt-1 border-pink-100">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saving">Saving (Long-term security)</SelectItem>
                    <SelectItem value="Investing">Investing (Wealth growth)</SelectItem>
                    <SelectItem value="Spending">Spending (Enjoying life now)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.financialPriorities && (
                  <p className="text-red-500 text-sm mt-1">{errors.financialPriorities}</p>
                )}
              </div>
              
              <div>
                <Label className="text-gray-700 block mb-2">
                  Preferred Lifestyle (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {lifestyleOptions.map((pref) => (
                    <motion.div
                      key={pref.value}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer border-2 ${
                        formData.lifestylePrefs.includes(pref.value) 
                          ? "border-pink-500"
                          : "border-transparent"
                      }`}
                      onClick={() => handleCheckbox(pref.value, 'lifestylePrefs')}
                    >
                      <img 
                        src={pref.img} 
                        alt={pref.value} 
                        className="w-full h-24 object-cover" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="text-white font-medium">{pref.value}</span>
                      </div>
                      {formData.lifestylePrefs.includes(pref.value) && (
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-pink-500" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {errors.lifestylePrefs && <p className="text-red-500 text-sm mt-1">{errors.lifestylePrefs}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Relationship Goals & Personality</h2>
              
              <div>
                <Label htmlFor="marriageGoals" className="text-gray-700">Marriage Goals</Label>
                <Textarea
                  id="marriageGoals"
                  value={formData.marriageGoals}
                  onChange={(e) => setFormData(prev => ({ ...prev, marriageGoals: e.target.value }))}
                  placeholder="What are your expectations for marriage? (e.g., partnership, shared goals)"
                  className="mt-1 border-pink-100 focus:border-pink-400 min-h-[100px]"
                />
                {errors.marriageGoals && <p className="text-red-500 text-sm mt-1">{errors.marriageGoals}</p>}
              </div>
              
              <div>
                <Label htmlFor="children" className="text-gray-700">Views on Children</Label>
                <Select
                  value={formData.children}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, children: value }))}
                >
                  <SelectTrigger id="children" className="mt-1 border-pink-100">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Want">Want children</SelectItem>
                    <SelectItem value="Maybe">Open to children</SelectItem>
                    <SelectItem value="No">Do not want children</SelectItem>
                  </SelectContent>
                </Select>
                {errors.children && <p className="text-red-500 text-sm mt-1">{errors.children}</p>}
              </div>
              
              <div>
                <Label htmlFor="conflictStyle" className="text-gray-700">Conflict Resolution Style</Label>
                <Select
                  value={formData.conflictStyle}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, conflictStyle: value }))}
                >
                  <SelectTrigger id="conflictStyle" className="mt-1 border-pink-100">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Discuss">Discuss calmly and openly</SelectItem>
                    <SelectItem value="Compromise">Seek compromise quickly</SelectItem>
                    <SelectItem value="Reflect">Take time to reflect before resolving</SelectItem>
                  </SelectContent>
                </Select>
                {errors.conflictStyle && <p className="text-red-500 text-sm mt-1">{errors.conflictStyle}</p>}
              </div>
              
              <div>
                <Label className="text-gray-700 block mb-2">
                  Personality Traits (Select at least 3)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {personalityTraits.map((trait) => (
                    <div 
                      key={trait}
                      className="flex items-center space-x-2 hover:bg-pink-50 p-2 rounded-md transition-colors cursor-pointer"
                      onClick={() => handleCheckbox(trait, 'personalityTraits')}
                    >
                      <Checkbox 
                        id={`trait-${trait}`}
                        checked={formData.personalityTraits.includes(trait)}
                        className="text-pink-500 border-pink-200 data-[state=checked]:bg-pink-500 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor={`trait-${trait}`}
                        className="cursor-pointer text-gray-700"
                      >
                        {trait}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.personalityTraits && <p className="text-red-500 text-sm mt-1">{errors.personalityTraits}</p>}
              </div>
              
              <div>
                <Label className="text-gray-700 block mb-2">
                  Photo Gallery (Upload 2-4 photos)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="relative">
                      {formData.gallery[index] ? (
                        <motion.div
                          className="relative rounded-lg overflow-hidden h-36"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <img
                            src={formData.gallery[index]}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md border border-gray-200"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </motion.div>
                      ) : (
                        <div className="relative">
                          <Button
                            type="button"
                            className="w-full h-36 flex flex-col items-center justify-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-100 rounded-lg"
                            onClick={() => galleryRefs.current[index]?.click()}
                            disabled={formData.gallery.length >= 4 && !formData.gallery[index]}
                          >
                            <Upload className="h-6 w-6" />
                            <span>Upload Photo</span>
                          </Button>
                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => handleImageUpload(e, "gallery", index)}
                            className="hidden"
                            ref={(el) => (galleryRefs.current[index] = el)}
                            disabled={formData.gallery.length >= 4 && !formData.gallery[index]}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                {errors.gallery && <p className="text-red-500 text-sm mt-1">{errors.gallery}</p>}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            Back
          </motion.button>
        ) : (
          <div></div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-lg font-medium hover:from-pink-500 hover:to-pink-700 transition-colors flex items-center gap-2"
        >
          {step === 3 ? (
            <>
              Submit <Heart className="h-4 w-4" />
            </>
          ) : (
            'Next'
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileForm;
