import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send, Clock, CheckCircle, Circle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ChatInterfaceProps {
  projectId?: string;
  recipientId?: string;
  currentUserId: string;
}

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  projectId?: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender?: {
    id: string;
    fullName: string;
    profileImage?: string;
  };
}

export default function ChatInterface({ projectId, recipientId, currentUserId }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: projectId 
      ? ["/api/messages", { projectId }]
      : ["/api/messages", { userId1: currentUserId, userId2: recipientId }],
    enabled: !!(projectId || (currentUserId && recipientId)),
    refetchInterval: 5000, // Poll for new messages every 5 seconds
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          senderId: currentUserId,
          recipientId,
          projectId,
          content,
        }),
      });
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ 
        queryKey: projectId 
          ? ["/api/messages", { projectId }]
          : ["/api/messages", { userId1: currentUserId, userId2: recipientId }]
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      return await apiRequest(`/api/messages/${messageId}/read`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: projectId 
          ? ["/api/messages", { projectId }]
          : ["/api/messages", { userId1: currentUserId, userId2: recipientId }]
      });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Mark unread messages as read
    const unreadMessages = messages.filter(
      (msg: Message) => !msg.isRead && msg.senderId !== currentUserId
    );
    
    unreadMessages.forEach((msg: Message) => {
      markAsReadMutation.mutate(msg.id);
    });
  }, [messages, currentUserId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessageMutation.mutate(newMessage.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="animate-pulse">Loading messages...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          {projectId ? "Project Messages" : "Direct Messages"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message: Message) => {
                const isOwnMessage = message.senderId === currentUserId;
                
                return (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
                    data-testid={`message-${message.id}`}
                  >
                    {!isOwnMessage && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.sender?.profileImage} />
                        <AvatarFallback>
                          {message.sender?.fullName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? "order-first" : ""}`}>
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          isOwnMessage
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(message.createdAt)}</span>
                        {isOwnMessage && (
                          <>
                            {message.isRead ? (
                              <CheckCircle className="w-3 h-3 text-blue-500" />
                            ) : (
                              <Circle className="w-3 h-3" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    {isOwnMessage && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={sendMessageMutation.isPending}
              data-testid="input-message"
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sendMessageMutation.isPending}
              size="sm"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}