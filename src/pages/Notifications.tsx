
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck, Trash2, MessageSquare, CalendarClock, CreditCard, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearNotifications } = useNotifications();
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toast } = useToast();
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });
  
  // Get counts for tabs
  const unreadCount = notifications.filter(n => !n.read).length;
  const infoCount = notifications.filter(n => n.type === "info").length;
  const successCount = notifications.filter(n => n.type === "success").length;
  const warningCount = notifications.filter(n => n.type === "warning").length;
  
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!"
    });
  };
  
  const handleClearAll = () => {
    clearNotifications();
    toast({
      title: "All notifications cleared",
      description: "Your notification list has been cleared."
    });
  };
  
  // Helper to get notification icon based on title content
  const getNotificationIcon = (notification: any) => {
    const { title, type } = notification;
    
    if (title.includes("Message") || title.includes("message")) {
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    } else if (title.includes("Appointment") || title.includes("appointment")) {
      return <CalendarClock className="h-5 w-5 text-green-500" />;
    } else if (title.includes("Payment") || title.includes("payment")) {
      return <CreditCard className="h-5 w-5 text-purple-500" />;
    } else if (title.includes("Match") || title.includes("match")) {
      return <Heart className="h-5 w-5 text-pink-500" />;
    } else {
      // Default icon based on notification type
      switch (type) {
        case "success":
          return <CheckCheck className="h-5 w-5 text-green-500" />;
        case "warning":
          return <Bell className="h-5 w-5 text-yellow-500" />;
        case "error":
          return <Bell className="h-5 w-5 text-red-500" />;
        default:
          return <Bell className="h-5 w-5 text-blue-500" />;
      }
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with your activity</p>
        </div>
        
        <div className="flex gap-3 mt-4 sm:mt-0">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-sm border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearAll}
              className="text-sm border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            All
            {notifications.length > 0 && (
              <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-px rounded-full text-xs">
                {notifications.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 bg-pink-200 text-pink-700 px-2 py-px rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="info" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            Info
            {infoCount > 0 && (
              <span className="ml-2 bg-blue-200 text-blue-700 px-2 py-px rounded-full text-xs">
                {infoCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="success" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            Success
            {successCount > 0 && (
              <span className="ml-2 bg-green-200 text-green-700 px-2 py-px rounded-full text-xs">
                {successCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="warning" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800">
            Warnings
            {warningCount > 0 && (
              <span className="ml-2 bg-yellow-200 text-yellow-700 px-2 py-px rounded-full text-xs">
                {warningCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  layout
                  className={`p-4 border rounded-lg flex ${
                    notification.read ? "bg-white" : "bg-pink-50 border-pink-200"
                  }`}
                >
                  <div className="mr-4 mt-1">
                    <div className={`p-2 rounded-full ${
                      notification.type === 'success' ? 'bg-green-100' :
                      notification.type === 'error' ? 'bg-red-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {getNotificationIcon(notification)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">{notification.title}</h3>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    
                    <div className="flex justify-between mt-3">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                        >
                          <CheckCheck className="h-3 w-3 mr-1" />
                          Mark as read
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeNotification(notification.id)}
                        className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 ml-auto"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="mb-4 bg-gray-200 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <Bell className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">No notifications</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {activeTab === "all"
                  ? "You don't have any notifications at the moment."
                  : activeTab === "unread"
                  ? "You've read all your notifications."
                  : `You don't have any ${activeTab} notifications.`}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
