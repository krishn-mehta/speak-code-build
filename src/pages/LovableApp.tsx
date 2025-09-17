import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWebsites } from "@/hooks/useWebsites";
import { AppSidebar } from "@/components/AppSidebar";
import { LovableChatInterface } from "@/components/LovableChatInterface";
import { LovablePreview } from "@/components/LovablePreview";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import {
  Menu,
  Play,
  Square,
  RotateCcw,
  Share,
  MoreHorizontal
} from "lucide-react";

const LovableApp = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { websites } = useWebsites();
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(null);

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-12 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              
              {selectedWebsite && (
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm font-medium">{selectedWebsite.title}</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Publish
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Chat Panel */}
              <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
                <LovableChatInterface onWebsiteGenerated={handleWebsiteGenerated} />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Preview Panel */}
              <ResizablePanel defaultSize={60} minSize={40}>
                <LovablePreview
                  website={selectedWebsite}
                  websites={websites}
                  onWebsiteChange={setSelectedWebsiteId}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LovableApp;