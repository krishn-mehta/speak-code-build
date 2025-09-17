import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Plus, MessageSquare, Settings, LogOut, Globe, Sparkles, Trash2, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWebsites } from "@/hooks/useWebsites";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Conversation {
  id: string;
  title: string | null;
  updated_at: string;
}

interface ChatSidebarProps {
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const ChatSidebar = ({ 
  currentConversationId, 
  onSelectConversation, 
  onNewConversation 
}: ChatSidebarProps) => {
  const { user, signOut } = useAuth();
  const { websites, getWebsitesByConversation } = useWebsites();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('id, title, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      // Remove from local state
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      // If this was the current conversation, clear selection
      if (currentConversationId === conversationId) {
        onNewConversation();
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-72 border-r bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Cyblick</h2>
            <p className="text-xs text-muted-foreground">AI Website Builder</p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button 
          onClick={onNewConversation}
          className="w-full justify-start bg-primary hover:bg-primary/90"
          size="default"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>
      
      {/* Conversations List */}
      <div className="flex-1 flex flex-col">
        <div className="px-3 py-2 border-b">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="w-4 h-4" />
            <span>Recent Conversations</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                Loading conversations...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="mb-1">No conversations yet</p>
                <p className="text-xs opacity-70">Start building your first website</p>
              </div>
            ) : (
              <div className="space-y-1">
                {conversations.map((conversation) => {
                  const conversationWebsites = getWebsitesByConversation(conversation.id);
                  return (
                    <div key={conversation.id} className="group relative">
                      <button
                        onClick={() => onSelectConversation(conversation.id)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg transition-all hover:bg-muted/50",
                          currentConversationId === conversation.id 
                            ? "bg-primary/10 border border-primary/20" 
                            : "hover:bg-muted/30"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="truncate text-sm font-medium flex-1">
                                {conversation.title || "New Website Project"}
                              </p>
                              {conversationWebsites.length > 0 && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                  {conversationWebsites.length}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(conversation.updated_at)}
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(conversation.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom User Section */}
      <div className="p-3 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.email || 'User'}
            </p>
            <p className="text-xs text-muted-foreground">Free Plan</p>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 text-xs"
          >
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex-1 h-8 text-xs"
          >
            <LogOut className="w-3 h-3 mr-1" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};