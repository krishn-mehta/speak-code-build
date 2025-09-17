import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { LiveWebsitePreview } from "@/components/website/LiveWebsitePreview";
import { useWebsites } from "@/hooks/useWebsites";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTokens } from "@/hooks/useTokens";
import { 
  Sparkles, 
  User, 
  Settings, 
  LogOut,
  Zap,
  Globe
} from "lucide-react";

const MainInterface = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { websites } = useWebsites();
  const { userTokens, userSubscription } = useTokens();
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(null);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleWebsiteGenerated = (websiteId: string) => {
    setSelectedWebsiteId(websiteId);
  };

  // Get the selected website or the latest one
  const selectedWebsite = selectedWebsiteId 
    ? websites.find(w => w.id === selectedWebsiteId) 
    : websites[0];

  // Get websites for current conversation
  const conversationWebsites = currentConversationId 
    ? websites.filter(w => w.conversation_id === currentConversationId)
    : [];

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

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Cyblick</h1>
            <p className="text-xs text-muted-foreground">AI Website Builder</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Token Display */}
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{userTokens?.current_tokens || 0}</span>
            <span className="text-xs text-muted-foreground">tokens</span>
          </div>

          {/* Website Selector */}
          {conversationWebsites.length > 0 && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedWebsiteId || ""}
                onChange={(e) => setSelectedWebsiteId(e.target.value || null)}
                className="text-sm bg-transparent border border-border rounded px-2 py-1"
              >
                <option value="">Latest Website</option>
                {conversationWebsites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                {user.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Chat Panel */}
          <ResizablePanel defaultSize={45} minSize={30}>
            <div className="h-full border-r bg-background">
              <ChatInterface
                conversationId={currentConversationId}
                isLiveMode={true}
                onWebsiteGenerated={handleWebsiteGenerated}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <div className="h-full bg-muted/30">
              {selectedWebsite ? (
                <LiveWebsitePreview
                  website={selectedWebsite}
                  websites={conversationWebsites}
                  onWebsiteChange={setSelectedWebsiteId}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md px-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Globe className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Website Generated Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start a conversation in the chat to generate your first website. 
                      Describe what you want to build and I'll create it for you!
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary" className="text-xs">
                        React + TypeScript
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Tailwind CSS
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Vite
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom Status Bar */}
      <footer className="border-t bg-background/80 backdrop-blur-sm px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Ready to build amazing websites</span>
            {websites.length > 0 && (
              <span>{websites.length} website{websites.length !== 1 ? 's' : ''} created</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>{userSubscription?.plan_id || 'free'} plan</span>
            <span>Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainInterface;