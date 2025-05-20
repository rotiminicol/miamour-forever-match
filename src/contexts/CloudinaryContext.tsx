
import React, { createContext, useContext, ReactNode } from 'react';

// Cloudinary configuration
const CLOUDINARY_CONFIG = {
  cloudName: 'djvhlf3pe',
  apiKey: '529719449861544',
  apiSecret: 'hlWARZIrmr2a62PhHOR9L1nQNOY',
  uploadPreset: 'miamour-uploads'
};

interface CloudinaryContextType {
  uploadImage: (file: File) => Promise<string>;
  uploadVideo: (file: File) => Promise<string>;
  cloudName: string;
  apiKey: string;
}

const CloudinaryContext = createContext<CloudinaryContextType | undefined>(undefined);

export const CloudinaryProvider = ({ children }: { children: ReactNode }) => {
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
      formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  const uploadVideo = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
      formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/video/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  };
  
  const value = {
    uploadImage,
    uploadVideo,
    cloudName: CLOUDINARY_CONFIG.cloudName,
    apiKey: CLOUDINARY_CONFIG.apiKey,
  };
  
  return (
    <CloudinaryContext.Provider value={value}>
      {children}
    </CloudinaryContext.Provider>
  );
};

export const useCloudinary = () => {
  const context = useContext(CloudinaryContext);
  if (context === undefined) {
    throw new Error('useCloudinary must be used within a CloudinaryProvider');
  }
  return context;
};

export default CloudinaryProvider;
