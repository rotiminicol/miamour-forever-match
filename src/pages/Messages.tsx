
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Send, Search, Phone, Video, MoreHorizontal, Image, Smile, Paperclip, MessageSquare, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Active conversation details based on ID
  const activeConversationDetails = activeConversation
    ? conversations.find((conv) => conv.id === activeConversation)
    : null;

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // This would be replaced with actual API call to send message
    toast({
      title: "Feature in development",
      description: "Message sending will be available soon.",
    });

    setNewMessage("");
  };

  // Open chat drawer on mobile when a conversation is selected
  useEffect(() => {
    if (activeConversation && window.innerWidth < 768) {
      setMobileChatOpen(true);
    }
  }, [activeConversation]);

  // Close chat drawer on mobile back
  const handleMobileBack = () => {
    setMobileChatOpen(false);
    setTimeout(() => setActiveConversation(null), 300); // Wait for animation
  };

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 py-4 sm:py-8">
      <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4 sm:mb-8 px-4 sm:px-0">Messages</h1>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-[calc(100vh-120px)] flex flex-col md:flex-row">
        {/* Conversations sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-gray-50 border-gray-100 focus:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredConversations.length > 0 ? (
            <div className="flex-grow overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  whileHover={{ backgroundColor: "rgba(249, 168, 212, 0.05)" }}
                  className={`p-4 cursor-pointer border-b border-gray-50 ${
                    activeConversation === conversation.id
                      ? "bg-pink-50"
                      : "hover:bg-pink-50/30"
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation.id);
                    if (window.innerWidth < 768) setMobileChatOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback className="bg-pink-200 text-pink-800">
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>

                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800 truncate">{conversation.name}</p>
                        <p className="text-xs text-gray-400">{conversation.time}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center p-6">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No conversations</p>
                <p className="text-sm text-gray-400 mt-1 mb-4">
                  Start connecting with your matches
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-burgundy/10"
                  onClick={() => navigate("/matches")}
                >
                  Find Matches
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Chat area */}
        {activeConversation && activeConversationDetails ? (
          <div className="hidden md:flex flex-col flex-grow">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={activeConversationDetails?.avatar} alt={activeConversationDetails?.name} />
                  <AvatarFallback className="bg-pink-200 text-pink-800">
                    {activeConversationDetails?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">{activeConversationDetails?.name}</p>
                  <p className="text-xs text-gray-500">
                    {activeConversationDetails?.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.senderId === "me" ? "flex justify-end" : "flex justify-start"
                  }`}
                >
                  {message.senderId !== "me" && (
                    <Avatar className="mr-2">
                      <AvatarImage src={activeConversationDetails?.avatar} />
                      <AvatarFallback className="bg-pink-200 text-pink-800">
                        {activeConversationDetails?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-[70%] ${
                      message.senderId === "me"
                        ? "bg-pink-500 text-white rounded-br-none"
                        : "bg-white shadow-sm rounded-bl-none"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === "me" ? "text-pink-50" : "text-gray-400"
                      } text-right`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                  {message.senderId === "me" && (
                    <Avatar className="ml-2">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-pink-500 text-white">
                        {user?.email?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-500">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-500">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-500">
                  <Image className="h-5 w-5" />
                </Button>

                <Input
                  placeholder="Type a message..."
                  className="mx-2 border-gray-200 focus:border-pink-300"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`bg-pink-500 hover:bg-pink-600 text-white ${!newMessage.trim() ? "opacity-50" : ""}`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-col justify-center items-center flex-grow bg-gray-50">
            <Card className="text-center p-8 max-w-md">
              <div className="mb-4 bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-pink-500" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your Messages</h2>
              <p className="text-gray-500 max-w-sm mb-6">
                Connect with matches to start conversations. Your messages will appear here.
              </p>
              <Button
                onClick={() => navigate("/matches")}
                className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy hover:from-miamour-burgundy hover:to-miamour-pink text-white"
              >
                Find Matches
              </Button>
            </Card>
          </div>
        )}

        {/* Mobile Chat Drawer */}
        <AnimatePresence>
          {mobileChatOpen && activeConversationDetails && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-40 bg-white flex flex-col md:hidden"
              style={{ boxShadow: "0 0 24px 0 rgba(0,0,0,0.10)" }}
            >
              {/* Chat header */}
              <div className="p-4 border-b border-gray-100 flex items-center bg-white sticky top-0 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 text-gray-500 hover:text-pink-500"
                  onClick={handleMobileBack}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Avatar>
                  <AvatarImage src={activeConversationDetails?.avatar} alt={activeConversationDetails?.name} />
                  <AvatarFallback className="bg-pink-200 text-pink-800">
                    {activeConversationDetails?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">{activeConversationDetails?.name}</p>
                  <p className="text-xs text-gray-500">
                    {activeConversationDetails?.online ? "Online" : "Offline"}
                  </p>
                </div>
                <div className="flex space-x-2 ml-auto">
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500">
                    <Video className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.senderId === "me" ? "flex justify-end" : "flex justify-start"
                    }`}
                  >
                    {message.senderId !== "me" && (
                      <Avatar className="mr-2">
                        <AvatarImage src={activeConversationDetails?.avatar} />
                        <AvatarFallback className="bg-pink-200 text-pink-800">
                          {activeConversationDetails?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`p-3 rounded-lg max-w-[80vw] ${
                        message.senderId === "me"
                          ? "bg-pink-500 text-white rounded-br-none"
                          : "bg-white shadow-sm rounded-bl-none"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === "me" ? "text-pink-50" : "text-gray-400"
                        } text-right`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                    {message.senderId === "me" && (
                      <Avatar className="ml-2">
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-pink-500 text-white">
                          {user?.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
              {/* Message input - sticky on mobile */}
              <div className="p-3 border-t border-gray-100 bg-white sticky bottom-0 z-10">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-500">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-500">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-pink-500">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    className="mx-2 border-gray-200 focus:border-pink-300"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`bg-pink-500 hover:bg-pink-600 text-white ${!newMessage.trim() ? "opacity-50" : ""}`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile empty state - show when no conversation is selected */}
        {!mobileChatOpen && (
          <div className="md:hidden flex flex-col justify-center items-center flex-grow bg-gray-50">
            <Card className="text-center p-8">
              <div className="mb-4 bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-pink-500" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your Messages</h2>
              <p className="text-gray-500 mb-6">
                Connect with matches to start conversations.
              </p>
              <Button
                onClick={() => navigate("/matches")}
                className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy hover:from-miamour-burgundy hover:to-miamour-pink text-white"
              >
                Find Matches
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
