
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Process the OAuth callback
        const { error } = await supabase.auth.getUser();
        
        if (error) {
          toast({
            title: "Authentication error",
            description: error.message,
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        // Check the hash fragment for session info
        const hashFragment = window.location.hash;
        const isPasswordRecovery = hashFragment.includes("type=recovery");
        
        if (isPasswordRecovery) {
          navigate("/reset-password");
          return;
        }
        
        toast({
          title: "Authentication successful",
          description: "You have successfully logged in.",
        });
        
        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Auth callback error:", error);
        toast({
          title: "Authentication error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return <Loader />;
};

export default AuthCallback;
