import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Eye, 
  Code, 
  Download, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ChevronDown,
  FileArchive,
  FileText,
  Image,
  Share2,
  Copy
} from "lucide-react";
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

interface EnhancedWebsitePreviewProps {
  website: Website;
  className?: string;
}

export const EnhancedWebsitePreview = ({ website, className }: EnhancedWebsitePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('preview');
  const [isExporting, setIsExporting] = useState(false);

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px] h-[667px] mx-auto';
      case 'tablet':
        return 'w-[768px] h-[1024px] mx-auto';
      default:
        return 'w-full h-[800px]';
    }
  };

  const createPreviewContent = () => {
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

  const generateFullHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${website.title}</title>
    <meta name="description" content="${website.description || 'Generated with AI Website Builder'}">
    <style>
${website.css_content}
    </style>
</head>
<body>
${website.html_content.replace(/^<!DOCTYPE html>[\s\S]*?<body[^>]*>|<\/body>[\s\S]*$/gi, '')}
    ${website.js_content ? `<script>\n${website.js_content}\n</script>` : ''}
</body>
</html>`;
  };

  const downloadHTML = () => {
    const fullHtml = generateFullHtml();
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${website.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded successfully!');
  };

  const downloadZIP = async () => {
    setIsExporting(true);
    try {
      // Create a simple ZIP-like structure using JSZip if available, otherwise create separate files
      const files = [
        { name: 'index.html', content: generateFullHtml() },
        { name: 'styles.css', content: website.css_content },
        { name: 'script.js', content: website.js_content || '// No JavaScript content' },
        { name: 'README.md', content: `# ${website.title}\n\nGenerated with AI Website Builder\n\nDescription: ${website.description || 'No description provided'}\n\nTo use:\n1. Open index.html in your browser\n2. Upload all files to your web server\n\nCreated: ${new Date(website.created_at).toLocaleDateString()}` }
      ];

      // For now, we'll download the HTML file and show a message about the full package
      downloadHTML();
      toast.success('Website package ready! Full ZIP export coming soon.');
    } catch (error) {
      toast.error('Failed to create website package');
    } finally {
      setIsExporting(false);
    }
  };

  const copyShareLink = () => {
    // Generate a shareable blob URL (temporary)
    const fullHtml = generateFullHtml();
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Share link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(generateFullHtml());
      newWindow.document.close();
    }
  };

  const exportOptions = [
    {
      label: 'Download HTML',
      icon: FileText,
      action: downloadHTML,
      description: 'Single HTML file'
    },
    {
      label: 'Download Package',
      icon: FileArchive,
      action: downloadZIP,
      description: 'Complete website files',
      disabled: isExporting
    },
    {
      label: 'Copy Share Link',
      icon: Share2,
      action: copyShareLink,
      description: 'Temporary shareable link'
    }
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
        <div className="flex-1">
          <CardTitle className="text-xl">{website.title}</CardTitle>
          {website.description && (
            <p className="text-sm text-muted-foreground mt-1">{website.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline">{website.template_type}</Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(website.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={openInNewTab}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Open</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={isExporting}>
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {exportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={option.action}
                    disabled={option.disabled}
                    className="flex items-center gap-3 p-3"
                  >
                    <Icon className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">HTML</span>
            </TabsTrigger>
            <TabsTrigger value="css" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">CSS</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4 mt-6">
            {/* Responsive Controls */}
            <div className="flex items-center justify-center gap-2 pb-4">
              <div className="flex rounded-lg border p-1">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="flex items-center gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Desktop</span>
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className="flex items-center gap-2"
                >
                  <Tablet className="w-4 h-4" />
                  <span className="hidden sm:inline">Tablet</span>
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="hidden sm:inline">Mobile</span>
                </Button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="flex justify-center overflow-auto">
              <div className={cn(
                "border border-border rounded-lg overflow-hidden bg-white shadow-lg transition-all duration-300",
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

          <TabsContent value="html" className="mt-6">
            <ScrollArea className="h-[600px] w-full rounded-md border">
              <pre className="p-4 text-sm font-mono">
                <code>{website.html_content}</code>
              </pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="css" className="mt-6">
            <ScrollArea className="h-[600px] w-full rounded-md border">
              <pre className="p-4 text-sm font-mono">
                <code>{website.css_content}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};