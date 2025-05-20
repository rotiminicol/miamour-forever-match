
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CloudinaryContextType {
  uploadImage: (file: File) => Promise<string | null>;
  isUploading: boolean;
}

const CloudinaryContext = createContext<CloudinaryContextType | undefined>(undefined);

export function useCloudinary() {
  const context = useContext(CloudinaryContext);
  if (context === undefined) {
    throw new Error("useCloudinary must be used within a CloudinaryProvider");
  }
  return context;
}

interface CloudinaryProviderProps {
  children: React.ReactNode;
}

const CloudinaryProvider: React.FC<CloudinaryProviderProps> = ({ children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Cloudinary upload preset should be set to 'unsigned' for client-side uploads
  const cloudName = "djvhlf3pe";
  
  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;
    
    setIsUploading(true);
    
    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "miamour_uploads");
    formData.append("api_key", "529719449861544");
    
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <CloudinaryContext.Provider value={{ uploadImage, isUploading }}>
      {children}
    </CloudinaryContext.Provider>
  );
};

export default CloudinaryProvider;
