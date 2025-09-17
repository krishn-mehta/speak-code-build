import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ChatInterface } from "./ChatInterface";
import { LiveWebsitePreview } from "../website/LiveWebsitePreview";
import { Button } from "@/components/ui/button";
import { Grid, MessageSquare, Monitor } from "lucide-react";
import { useWebsites } from "@/hooks/useWebsites";

interface LivePreviewLayoutProps {
  conversationId?: string;
  onModeChange: (mode: "chat" | "live") => void;
}

export const LivePreviewLayout = ({ conversationId, onModeChange }: LivePreviewLayoutProps) => {
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(null);
  const { getWebsitesByConversation } = useWebsites();
  
  const conversationWebsites = conversationId ? getWebsitesByConversation(conversationId) : [];
  const selectedWebsite = selectedWebsiteId ? conversationWebsites.find(w => w.id === selectedWebsiteId) : conversationWebsites[0];

  const handleWebsiteGenerated = (websiteId: string) => {
    setSelectedWebsiteId(websiteId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with mode toggle */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          <span className="font-medium">Live Preview Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onModeChange("chat")}
            className="flex items-center gap-2"
          >
            <Grid className="h-4 w-4" />
            Gallery Mode
          </Button>
        </div>
      </div>

      {/* Resizable panels */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <ChatInterface 
                  conversationId={conversationId} 
                  isLiveMode={true}
                  onWebsiteGenerated={handleWebsiteGenerated}
                />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full bg-muted/20">
              {selectedWebsite ? (
                <LiveWebsitePreview 
                  website={selectedWebsite}
                  websites={conversationWebsites}
                  onWebsiteChange={setSelectedWebsiteId}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-center p-8">
                  <div>
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Website Generated</h3>
                    <p className="text-muted-foreground">
                      Generate a website from the chat to see the live preview here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};