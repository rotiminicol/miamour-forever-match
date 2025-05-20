
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/contexts/NotificationsContext";

interface PaymentProcessingProps {
  redirectPath?: string;
}

const PaymentProcessing = ({ redirectPath = "/dashboard" }: PaymentProcessingProps) => {
  const [processing, setProcessing] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  // Calculate progress percentage
  useEffect(() => {
    setProgress(100 - (timeLeft / 600) * 100);
  }, [timeLeft]);

  // Countdown timer
  useEffect(() => {
    if (!processing) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [processing]);

  // Auto-redirect after timer finishes
  useEffect(() => {
    if (timeLeft <= 0) {
      handleComplete();
    }
  }, [timeLeft]);

  const handleComplete = () => {
    setProcessing(false);
    
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully!",
      variant: "default",
    });
    
    addNotification({
      title: "Payment Complete",
      message: "Your subscription has been activated. Welcome to your premium matchmaking journey!",
      type: "success"
    });
    
    // Short delay before redirecting
    setTimeout(() => {
      // Navigate to specified path
      navigate(redirectPath);
    }, 1500);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white p-4">
      <div className="w-full max-w-lg">
        {/* Main card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-100">
            <div
              className="h-full bg-pink-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-8">
            {/* Status icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {processing ? (
                  <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center">
                    <div className="absolute inset-0 animate-spin">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#FCE7F3"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#EC4899"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset="188.4"
                        />
                      </svg>
                    </div>
                    <Clock className="w-8 h-8 text-pink-500" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-green-500" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Status text */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {processing ? "Processing Your Transaction" : "Transaction Complete"}
              </h2>
              <p className="text-gray-500 text-sm mb-1">
                {processing
                  ? "Your payment is being securely processed. Please don't close this window."
                  : "Your payment has been successfully processed. Redirecting you to the dashboard."}
              </p>
              {processing && (
                <p className="text-gray-400 text-xs">
                  Transaction ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              )}
            </div>

            {/* Timer */}
            {processing && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>Processing</span>
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Continue button */}
            <div className="mt-6">
              <Button
                onClick={handleComplete}
                className={`w-full py-6 px-4 flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ${
                  processing
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {processing ? (
                  <>Continue to Dashboard <ArrowRight className="w-4 h-4" /></>
                ) : (
                  <>Go to Dashboard <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Information card */}
        <div className="mt-4 bg-white rounded-xl border border-pink-100 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                <span className="text-pink-500 text-lg">ℹ️</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Your transaction is being securely processed. This typically takes less than a minute, 
                but may occasionally take longer. You'll be automatically redirected when complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
