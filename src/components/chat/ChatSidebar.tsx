import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Plus, MessageSquare, Settings, LogOut, Globe, Sparkles, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWebsites } from "@/hooks/useWebsites";
import { WebsiteGallery } from "@/components/website/WebsiteGallery";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
    <div className="w-80 border-r bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
          Cyblick
        </h2>
        <p className="text-sm text-muted-foreground">
          Welcome, {user?.email}
        </p>
      </div>

      <div className="p-4">
        <Button 
          onClick={onNewConversation}
          className="w-full justify-start"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      <Tabs defaultValue="conversations" className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conversations" className="text-xs">
              <MessageSquare className="w-3 h-3 mr-1" />
              Chats
            </TabsTrigger>
            <TabsTrigger value="websites" className="text-xs">
              <Globe className="w-3 h-3 mr-1" />
              Sites ({websites.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="conversations" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {loading ? (
                <div className="p-4 text-center text-muted-foreground">
                  Loading chats...
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                  <p>No chats yet</p>
                  <p className="text-xs">Start a new conversation above</p>
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
                            "w-full text-left p-2 rounded-lg transition-colors hover:bg-muted",
                            currentConversationId === conversation.id 
                              ? "bg-secondary text-secondary-foreground" 
                              : "text-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-medium flex-1">
                                  {conversation.title || "New Website"}
                                </p>
                                {conversationWebsites.length > 0 && (
                                  <Badge variant="secondary" className="text-xs px-1 py-0">
                                    <Sparkles className="w-2 h-2 mr-1" />
                                    {conversationWebsites.length}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs opacity-70">
                                {formatDate(conversation.updated_at)}
                              </p>
                            </div>
                          </div>
                        </button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
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
        </TabsContent>

        <TabsContent value="websites" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <WebsiteGallery />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};