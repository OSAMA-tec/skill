import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, Phone, Video, MoreVertical } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  createdAt: Date;
  isRead: boolean;
  sender?: {
    fullName: string;
    profileImage?: string;
  };
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    fullName: string;
    title?: string;
    profileImage?: string;
    isOnline: boolean;
  };
  lastMessage: {
    content: string;
    createdAt: Date;
    isRead: boolean;
  };
  unreadCount: number;
  projectTitle?: string;
}

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participant: {
      id: "user-2",
      fullName: "Marcus Rodriguez",
      title: "React Developer",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      isOnline: true
    },
    lastMessage: {
      content: "The wireframes look great! I'll start working on the React components today.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false
    },
    unreadCount: 2,
    projectTitle: "Mobile App UI ↔ React Development"
  },
  {
    id: "conv-2", 
    participant: {
      id: "user-3",
      fullName: "Emma Thompson",
      title: "Content Strategist",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      isOnline: false
    },
    lastMessage: {
      content: "Thanks for the video editing! The final cut looks professional.",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true
    },
    unreadCount: 0,
    projectTitle: "Content Strategy ↔ Video Editing"
  },
  {
    id: "conv-3",
    participant: {
      id: "user-4", 
      fullName: "David Kim",
      title: "Video Editor",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      isOnline: true
    },
    lastMessage: {
      content: "Can we schedule a quick call to discuss the project requirements?",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isRead: true
    },
    unreadCount: 0,
    projectTitle: "Logo Design ↔ Video Editing"
  }
];

const mockMessages: Message[] = [
  {
    id: "msg-1",
    content: "Hi Sarah! I'm excited to start working on this project with you.",
    senderId: "user-2",
    recipientId: "user-1",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    sender: {
      fullName: "Marcus Rodriguez",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    }
  },
  {
    id: "msg-2",
    content: "Great! I've prepared some initial wireframes and design concepts. Let me share them with you.",
    senderId: "user-1",
    recipientId: "user-2", 
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isRead: true,
    sender: {
      fullName: "Sarah Chen",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face"
    }
  },
  {
    id: "msg-3",
    content: "The wireframes look great! I'll start working on the React components today.",
    senderId: "user-2",
    recipientId: "user-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), 
    isRead: false,
    sender: {
      fullName: "Marcus Rodriguez",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    }
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would make an API call
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${Math.floor(hours)}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Messages</h1>
          <p className="text-xl text-muted-foreground">
            Communicate with your swap partners and manage project discussions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-conversations"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-accent/20 transition-colors border-r-2 ${
                        selectedConversation?.id === conversation.id 
                          ? "bg-accent/20 border-primary" 
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                      data-testid={`conversation-${conversation.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.participant.profileImage} />
                            <AvatarFallback>
                              {conversation.participant.fullName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.participant.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">
                              {conversation.participant.fullName}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(conversation.lastMessage.createdAt)}
                            </span>
                          </div>
                          
                          {conversation.projectTitle && (
                            <p className="text-xs text-primary mb-1">{conversation.projectTitle}</p>
                          )}
                          
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.content}
                          </p>
                          
                          {conversation.unreadCount > 0 && (
                            <Badge className="mt-2 h-5 px-2 text-xs bg-primary">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConversation.participant.profileImage} />
                          <AvatarFallback>
                            {selectedConversation.participant.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConversation.participant.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold" data-testid="text-chat-partner-name">
                          {selectedConversation.participant.fullName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.participant.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" data-testid="button-voice-call">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid="button-video-call">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid="button-chat-options">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {selectedConversation.projectTitle && (
                    <div className="pt-2 border-t border-border">
                      <Badge variant="outline" className="text-xs">
                        Project: {selectedConversation.projectTitle}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {mockMessages.map((message) => {
                        const isOwnMessage = message.senderId === "user-1";
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                            data-testid={`message-${message.id}`}
                          >
                            <div className={`flex gap-2 max-w-[80%] ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                              {!isOwnMessage && (
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={message.sender?.profileImage} />
                                  <AvatarFallback>
                                    {message.sender?.fullName.split(' ').map(n => n[0]).join('') || 'U'}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div
                                className={`p-3 rounded-lg ${
                                  isOwnMessage 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <span className={`text-xs mt-1 block ${
                                  isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
                                }`}>
                                  {formatTime(message.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                        data-testid="input-new-message"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        data-testid="button-send-message"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}