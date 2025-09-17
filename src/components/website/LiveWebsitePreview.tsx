import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  ExternalLink, 
  Code, 
  Palette,
  Calendar,
  Globe,
  ChevronDown
} from "lucide-react";
import { Website } from "@/hooks/useWebsites";

interface LiveWebsitePreviewProps {
  website: Website;
  websites: Website[];
  onWebsiteChange: (websiteId: string) => void;
}

export const LiveWebsitePreview = ({ 
  website, 
  websites, 
  onWebsiteChange 
}: LiveWebsitePreviewProps) => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"preview" | "html" | "css">("preview");

  const getViewportClass = () => {
    switch (viewMode) {
      case "desktop":
        return "w-full h-full";
      case "tablet":
        return "w-[768px] h-[1024px] mx-auto";
      case "mobile":
        return "w-[375px] h-[667px] mx-auto";
      default:
        return "w-full h-full";
    }
  };

  const createPreviewContent = () => {
    const combinedContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${website.title}</title>
        <style>${website.css_content || ""}</style>
      </head>
      <body>
        ${website.html_content || ""}
        <script>${website.js_content || ""}</script>
      </body>
      </html>
    `;
    return `data:text/html;charset=utf-8,${encodeURIComponent(combinedContent)}`;
  };

  const openInNewTab = () => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${website.title}</title>
          <style>${website.css_content || ""}</style>
        </head>
        <body>
          ${website.html_content || ""}
          <script>${website.js_content || ""}</script>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Live Preview</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={openInNewTab}
            className="h-8 px-2"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>

        {/* Website selector */}
        {websites.length > 1 && (
          <Select value={website.id} onValueChange={onWebsiteChange}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {websites.map((w) => (
                <SelectItem key={w.id} value={w.id}>
                  <div className="flex items-center gap-2">
                    <span className="truncate">{w.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(w.created_at)}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Website info */}
        <div className="flex items-center gap-2 mt-2">
          <h3 className="font-medium text-sm truncate">{website.title}</h3>
          {website.template_type && (
            <Badge variant="secondary" className="text-xs">
              {website.template_type}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(website.created_at)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
          <div className="border-b px-4">
            <TabsList className="h-9 grid grid-cols-3 w-full">
              <TabsTrigger value="preview" className="text-xs">
                <Monitor className="h-3 w-3 mr-1" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="html" className="text-xs">
                <Code className="h-3 w-3 mr-1" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                CSS
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="preview" className="h-full m-0">
              <div className="p-4 border-b">
                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("desktop")}
                    className="h-7 px-2"
                  >
                    <Monitor className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={viewMode === "tablet" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("tablet")}
                    className="h-7 px-2"
                  >
                    <Tablet className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={viewMode === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("mobile")}
                    className="h-7 px-2"
                  >
                    <Smartphone className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <div className={getViewportClass()}>
                  <iframe
                    src={createPreviewContent()}
                    className="w-full h-full border rounded-lg shadow-sm"
                    title={`Preview of ${website.title}`}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="html" className="h-full m-0">
              <ScrollArea className="h-full">
                <pre className="p-4 text-xs font-mono bg-muted/50">
                  <code>{website.html_content}</code>
                </pre>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="css" className="h-full m-0">
              <ScrollArea className="h-full">
                <pre className="p-4 text-xs font-mono bg-muted/50">
                  <code>{website.css_content}</code>
                </pre>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};