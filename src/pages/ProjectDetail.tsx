import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWebsites } from "@/hooks/useWebsites";
import { LivePreviewLayout } from "@/components/chat/LivePreviewLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { websites, isLoading } = useWebsites();
  const [website, setWebsite] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (id && websites.length > 0) {
      const foundWebsite = websites.find(w => w.id === id);
      if (foundWebsite) {
        setWebsite(foundWebsite);
      } else if (!isLoading) {
        toast.error("Website not found");
        navigate("/dashboard");
      }
    }
  }, [id, websites, user, authLoading, isLoading, navigate]);

  const handleModeChange = (mode: "chat" | "live") => {
    if (mode === "chat") {
      navigate("/dashboard");
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm px-4 py-3 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold truncate">{website.title}</h1>
          <p className="text-sm text-muted-foreground truncate">
            {website.description || `${website.template_type} website`}
          </p>
        </div>
      </header>

      {/* Live Preview Layout */}
      <div className="flex-1">
        <LivePreviewLayout 
          conversationId={website.conversation_id}
          onModeChange={handleModeChange}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;