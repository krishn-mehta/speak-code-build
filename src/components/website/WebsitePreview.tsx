import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Code, Download, ExternalLink, Smartphone, Monitor, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

interface Website {
  id: string;
  title: string;
  description?: string;
  html_content: string;
  css_content: string;
  js_content?: string;
  template_type: string;
  metadata?: any;
  created_at: string;
}

interface WebsitePreviewProps {
  website: Website;
  className?: string;
}

export const WebsitePreview = ({ website, className }: WebsitePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('preview');

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-[800px]';
    }
  };

  const createPreviewContent = () => {
    // Combine HTML and CSS for iframe preview
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${website.title}</title>
        <style>
          ${website.css_content}
        </style>
      </head>
      <body>
        ${website.html_content.replace(/^<!DOCTYPE html>[\s\S]*?<body[^>]*>|<\/body>[\s\S]*$/gi, '')}
        ${website.js_content ? `<script>${website.js_content}</script>` : ''}
      </body>
      </html>
    `;
    return `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`;
  };

  const downloadWebsite = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${website.title}</title>
    <style>
${website.css_content}
    </style>
</head>
<body>
${website.html_content.replace(/^<!DOCTYPE html>[\s\S]*?<body[^>]*>|<\/body>[\s\S]*$/gi, '')}
    ${website.js_content ? `<script>\n${website.js_content}\n</script>` : ''}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${website.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openInNewTab = () => {
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
        </head>
        <body>
            ${website.html_content.replace(/^<!DOCTYPE html>[\s\S]*?<body[^>]*>|<\/body>[\s\S]*$/gi, '')}
            ${website.js_content ? `<script>${website.js_content}</script>` : ''}
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl">{website.title}</CardTitle>
          {website.description && (
            <p className="text-sm text-muted-foreground mt-1">{website.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{website.template_type}</Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(website.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadWebsite}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openInNewTab}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="html">
              <Code className="w-4 h-4 mr-2" />
              HTML
            </TabsTrigger>
            <TabsTrigger value="css">
              <Code className="w-4 h-4 mr-2" />
              CSS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="flex items-center justify-center gap-2 pb-4">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="w-4 h-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>

            <div className="flex justify-center">
              <div className={cn(
                "border border-border rounded-lg overflow-hidden bg-white transition-all duration-300",
                getViewportClass()
              )}>
                <iframe
                  src={createPreviewContent()}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  title="Website Preview"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="html">
            <ScrollArea className="h-[600px] w-full rounded-md border">
              <pre className="p-4 text-sm">
                <code>{website.html_content}</code>
              </pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="css">
            <ScrollArea className="h-[600px] w-full rounded-md border">
              <pre className="p-4 text-sm">
                <code>{website.css_content}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};