import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWebsites } from "@/hooks/useWebsites";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { LivePreviewLayout } from "@/components/chat/LivePreviewLayout";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { TokenDisplay } from "@/components/tokens/TokenDisplay";
import {
  Grid,
  MessageSquare,
  Monitor,
  Settings,
  User,
  Sparkles,
  Plus,
  MoreHorizontal
} from "lucide-react";

const LovableApp = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { websites } = useWebsites();
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"chat" | "live">("chat");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleWebsiteGenerated = (websiteId: string) => {
    setSelectedWebsiteId(websiteId);
  };

  const handleNewConversation = () => {
    setSelectedConversationId(null);
    setSelectedWebsiteId(null);
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setSelectedWebsiteId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Cyblick...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Live preview mode (like Lovable.dev)
  if (viewMode === "live") {
    return (
      <LivePreviewLayout 
        conversationId={selectedConversationId || undefined}
        onModeChange={setViewMode}
      />
    );
  }

  // Main dashboard with sidebar
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Sidebar */}
      <ChatSidebar
        currentConversationId={selectedConversationId || undefined}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-14 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold">Cyblick</span>
            </div>
            
            {selectedConversationId && (
              <div className="flex items-center gap-2">
                <div className="h-4 w-px bg-border" />
                <Badge variant="secondary" className="text-xs">
                  Active Chat
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <TokenDisplay />
            
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "chat" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("chat")}
                className="h-7 px-3 text-xs"
              >
                <Grid className="h-3 w-3 mr-1" />
                Gallery
              </Button>
              <Button
                variant={viewMode === "live" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("live")}
                className="h-7 px-3 text-xs"
              >
                <Monitor className="h-3 w-3 mr-1" />
                Live
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface 
            conversationId={selectedConversationId || undefined}
            onWebsiteGenerated={handleWebsiteGenerated}
          />
        </div>
      </div>
    </div>
  );
};

export default LovableApp;