import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  Save, 
  Undo, 
  Redo, 
  Eye, 
  Code2, 
  Palette, 
  Type, 
  Layout,
  Smartphone,
  Monitor,
  Tablet
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

interface WebsiteEditorProps {
  website: Website;
  onSave: (updates: Partial<Website>) => Promise<void>;
  onClose: () => void;
}

export const WebsiteEditor = ({ website, onSave, onClose }: WebsiteEditorProps) => {
  const [htmlContent, setHtmlContent] = useState(website.html_content);
  const [cssContent, setCssContent] = useState(website.css_content);
  const [jsContent, setJsContent] = useState(website.js_content || '');
  const [activeTab, setActiveTab] = useState('preview');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  
  // History management
  const [history, setHistory] = useState([{
    html: website.html_content,
    css: website.css_content,
    js: website.js_content || '',
    timestamp: Date.now()
  }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(async () => {
        await handleAutoSave();
      }, 2000); // Auto-save after 2 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [htmlContent, cssContent, jsContent, hasUnsavedChanges]);

  // Track changes
  useEffect(() => {
    const hasChanges = 
      htmlContent !== website.html_content ||
      cssContent !== website.css_content ||
      jsContent !== (website.js_content || '');
    
    setHasUnsavedChanges(hasChanges);
  }, [htmlContent, cssContent, jsContent, website]);

  const handleAutoSave = async () => {
    if (!hasUnsavedChanges) return;
    
    setIsAutoSaving(true);
    try {
      await onSave({
        html_content: htmlContent,
        css_content: cssContent,
        js_content: jsContent
      });
      setHasUnsavedChanges(false);
      toast.success('Changes auto-saved');
    } catch (error) {
      toast.error('Auto-save failed');
    } finally {
      setIsAutoSaving(false);
    }
  };

  const addToHistory = () => {
    const newEntry = {
      html: htmlContent,
      css: cssContent,
      js: jsContent,
      timestamp: Date.now()
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newEntry);
      // Keep only last 50 entries
      return newHistory.slice(-50);
    });
    setHistoryIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const entry = history[newIndex];
      setHtmlContent(entry.html);
      setCssContent(entry.css);
      setJsContent(entry.js);
      setHistoryIndex(newIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const entry = history[newIndex];
      setHtmlContent(entry.html);
      setCssContent(entry.css);
      setJsContent(entry.js);
      setHistoryIndex(newIndex);
    }
  };

  const handleSave = async () => {
    try {
      await onSave({
        html_content: htmlContent,
        css_content: cssContent,
        js_content: jsContent
      });
      addToHistory();
      setHasUnsavedChanges(false);
      toast.success('Website saved successfully!');
    } catch (error) {
      toast.error('Failed to save website');
    }
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px] h-[667px] mx-auto';
      case 'tablet':
        return 'w-[768px] h-[1024px] mx-auto';
      default:
        return 'w-full h-[600px]';
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
          ${cssContent}
        </style>
      </head>
      <body>
        ${htmlContent.replace(/^<!DOCTYPE html>[\s\S]*?<body[^>]*>|<\/body>[\s\S]*$/gi, '')}
        ${jsContent ? `<script>${jsContent}</script>` : ''}
      </body>
      </html>
    `;
    return `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`;
  };

  // Real-time preview updates
  useEffect(() => {
    if (activeTab === 'preview' && iframeRef.current) {
      iframeRef.current.src = createPreviewContent();
    }
  }, [htmlContent, cssContent, jsContent, activeTab]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Editing: {website.title}</h2>
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                {isAutoSaving ? 'Auto-saving...' : 'Unsaved changes'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="w-1/2 border-r flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
              <TabsTrigger value="preview">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="html">
                <Code2 className="w-4 h-4 mr-2" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css">
                <Palette className="w-4 h-4 mr-2" />
                CSS
              </TabsTrigger>
              <TabsTrigger value="js">
                <Type className="w-4 h-4 mr-2" />
                JS
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 m-4 mt-0">
              <TabsContent value="preview" className="h-full">
                <div className="space-y-4 h-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex rounded-lg border p-1">
                      <Button
                        variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('desktop')}
                      >
                        <Monitor className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('tablet')}
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('mobile')}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-center flex-1">
                    <div className={cn(
                      "border border-border rounded-lg overflow-hidden bg-white",
                      getViewportClass()
                    )}>
                      <iframe
                        ref={iframeRef}
                        src={createPreviewContent()}
                        className="w-full h-full"
                        style={{ border: 'none' }}
                        title="Live Preview"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="html" className="h-full">
                <Textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="h-full font-mono text-sm resize-none"
                  placeholder="Enter HTML content..."
                />
              </TabsContent>

              <TabsContent value="css" className="h-full">
                <Textarea
                  value={cssContent}
                  onChange={(e) => setCssContent(e.target.value)}
                  className="h-full font-mono text-sm resize-none"
                  placeholder="Enter CSS styles..."
                />
              </TabsContent>

              <TabsContent value="js" className="h-full">
                <Textarea
                  value={jsContent}
                  onChange={(e) => setJsContent(e.target.value)}
                  className="h-full font-mono text-sm resize-none"
                  placeholder="Enter JavaScript code..."
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="w-1/2 p-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full border rounded-lg overflow-hidden bg-white">
                <iframe
                  src={createPreviewContent()}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  title="Live Preview"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
