import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Website } from "@/hooks/useWebsites";
import {
  Monitor,
  Tablet,
  Smartphone,
  Code,
  Eye,
  ExternalLink,
  Download,
  Settings,
  RefreshCw
} from "lucide-react";

interface LovablePreviewProps {
  website?: Website;
  websites?: Website[];
  onWebsiteChange?: (websiteId: string) => void;
}

export const LovablePreview = ({ website, websites = [], onWebsiteChange }: LovablePreviewProps) => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const getViewportClass = () => {
    switch (viewMode) {
      case "tablet":
        return "w-[768px] h-[1024px]";
      case "mobile":
        return "w-[375px] h-[812px]";
      default:
        return "w-full h-full";
    }
  };

  const createPreviewContent = () => {
    if (!website) return "";

    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${website.title}</title>
        <style>${website.css_content}</style>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        ${website.html_content}
        ${website.js_content ? `<script>${website.js_content}</script>` : ''}
      </body>
      </html>
    `;

    return `data:text/html;charset=utf-8,${encodeURIComponent(fullHTML)}`;
  };

  const openInNewTab = () => {
    if (!website) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${website.title}</title>
          <style>${website.css_content}</style>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${website.html_content}
          ${website.js_content ? `<script>${website.js_content}</script>` : ''}
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  if (!website) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/30">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Website Selected</h3>
          <p className="text-muted-foreground mb-6">
            Start a conversation in the chat to generate your first website, 
            or select an existing one to preview.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary">React + TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Responsive Design</Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {websites.length > 1 && onWebsiteChange && (
              <Select value={website.id} onValueChange={onWebsiteChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {websites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {websites.length <= 1 && (
              <div>
                <h3 className="font-semibold">{website.title}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {website.template_type} website
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={openInNewTab}>
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "preview" | "code")} className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="h-10">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="flex-1 flex flex-col m-0">
          {/* Viewport Controls */}
          <div className="border-b p-2 flex items-center justify-center gap-2">
            <Button
              variant={viewMode === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            
            <div className="mx-4 h-6 w-px bg-border" />
            
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 p-4 bg-muted/30 overflow-auto">
            <div className="flex justify-center items-start min-h-full">
              <div className={`${getViewportClass()} bg-white rounded-lg shadow-lg overflow-hidden border`}>
                <iframe
                  src={createPreviewContent()}
                  className="w-full h-full border-0"
                  title="Website Preview"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="flex-1 flex flex-col m-0">
          <div className="flex-1 overflow-auto">
            <Tabs defaultValue="html" className="h-full flex flex-col">
              <div className="border-b px-4">
                <TabsList>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  {website.js_content && <TabsTrigger value="js">JavaScript</TabsTrigger>}
                </TabsList>
              </div>
              
              <TabsContent value="html" className="flex-1 m-0">
                <pre className="p-4 text-sm bg-muted/30 h-full overflow-auto">
                  <code>{website.html_content}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="css" className="flex-1 m-0">
                <pre className="p-4 text-sm bg-muted/30 h-full overflow-auto">
                  <code>{website.css_content}</code>
                </pre>
              </TabsContent>
              
              {website.js_content && (
                <TabsContent value="js" className="flex-1 m-0">
                  <pre className="p-4 text-sm bg-muted/30 h-full overflow-auto">
                    <code>{website.js_content}</code>
                  </pre>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};