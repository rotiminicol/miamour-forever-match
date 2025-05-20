
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Send, Search, Phone, Video, MoreHorizontal, Image, Smile, Paperclip } from "lucide-react";

// Sample data - in a real app this would come from an API
const SAMPLE_CONVERSATIONS = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Looking forward to our date!",
    time: "2m ago",
    unread: 2,
    online: true
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Thanks for the match recommendation",
    time: "1h ago",
    unread: 0,
    online: true
  },
  {
    id: "3",
    name: "Jessica Smith",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    lastMessage: "Do you have time to chat tomorrow?",
    time: "2h ago",
    unread: 0,
    online: false
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    lastMessage: "I enjoyed our conversation yesterday",
    time: "1d ago",
    unread: 0,
    online: false
  }
];

// Sample messages for a conversation
const SAMPLE_MESSAGES = [
  {
    id: "1",
    senderId: "other",
    content: "Hi there! I saw we were matched. I'm excited to get to know you better!",
    timestamp: "10:30 AM"
  },
  {
    id: "2",
    senderId: "me",
    content: "Hello! Yes, I'm excited too. I noticed we both enjoy hiking. What's your favorite trail?",
    timestamp: "10:32 AM"
  },
  {
    id: "3",
    senderId: "other",
    content: "I love the Mountain Ridge Trail! Have you been there? The views are absolutely stunning, especially at sunrise.",
    timestamp: "10:35 AM"
  },
  {
    id: "4",
    senderId: "me",
    content: "I haven't been there yet, but it's on my list! I usually hike at Riverside Park. Maybe we could go together sometime?",
    timestamp: "10:38 AM"
  },
  {
    id: "5",
    senderId: "other",
    content: "That would be wonderful! I'd love to explore a new trail. Are you free this weekend?",
    timestamp: "10:40 AM"
  }
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>("1"); // Default to first conversation
  const [conversations, setConversations] = useState(SAMPLE_CONVERSATIONS);
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get active conversation details
  const activeConversationDetails = conversations.find(conv => conv.id === activeConversation);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMessageObj = {
      id: Date.now().toString(),
      senderId: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
    
    // Simulate response after delay (only in the first conversation)
    if (activeConversation === "1") {
      setTimeout(() => {
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          senderId: "other",
          content: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, responseMessage]);
        
        // Show notification
        addNotification({
          title: "New Message",
          message: `${activeConversationDetails?.name}: Thanks for your message! I'll get back to you soon.`,
          type: "info"
        });
        
      }, 3000);
    }
  };
  
  // Mark conversation as read when selected
  useEffect(() => {
    if (activeConversation) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, unread: 0 } 
            : conv
        )
      );
    }
  }, [activeConversation]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Messages</h1>
      
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-[calc(100vh-240px)] flex">
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
          
          <div className="flex-grow overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <motion.div
                  key={conversation.id}
                  whileHover={{ backgroundColor: "rgba(249, 168, 212, 0.05)" }}
                  className={`p-4 cursor-pointer border-b border-gray-50 ${
                    activeConversation === conversation.id
                      ? "bg-pink-50"
                      : "hover:bg-pink-50/30"
                  }`}
                  onClick={() => setActiveConversation(conversation.id)}
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
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No conversations match your search
              </div>
            )}
          </div>
        </div>
        
        {/* Chat area */}
        {activeConversation ? (
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
                    {activeConversationDetails?.online ? 'Online' : 'Offline'}
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
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`bg-pink-500 hover:bg-pink-600 text-white ${!newMessage.trim() ? 'opacity-50' : ''}`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-col justify-center items-center flex-grow bg-gray-50">
            <div className="text-center p-8">
              <div className="mb-4 bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <Send className="h-8 w-8 text-pink-500" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your Messages</h2>
              <p className="text-gray-500 max-w-sm">
                Select a conversation to start chatting or connect with a new match.
              </p>
            </div>
          </div>
        )}
        
        {/* Mobile empty state - show when no conversation is selected */}
        <div className="md:hidden flex flex-col justify-center items-center flex-grow bg-gray-50">
          <div className="text-center p-8">
            <div className="mb-4 bg-pink-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-8 w-8 text-pink-500" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your Messages</h2>
            <p className="text-gray-500">
              Select a conversation to start chatting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
