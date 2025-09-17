import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  History, 
  Clock, 
  Eye, 
  RotateCcw, 
  Download, 
  Diff,
  ChevronRight,
  Calendar,
  User
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
  updated_at: string;
}

interface WebsiteVersion {
  id: string;
  website_id: string;
  version_number: number;
  title: string;
  html_content: string;
  css_content: string;
  js_content?: string;
  change_summary: string;
  created_at: string;
  metadata?: {
    user_action?: string;
    changes_made?: string[];
    performance_metrics?: any;
  };
}

interface VersionHistoryProps {
  website: Website;
  isOpen: boolean;
  onClose: () => void;
  onRestore: (version: WebsiteVersion) => Promise<void>;
}

export const VersionHistory = ({ website, isOpen, onClose, onRestore }: VersionHistoryProps) => {
  const [versions, setVersions] = useState<WebsiteVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<WebsiteVersion | null>(null);
  const [previewVersion, setPreviewVersion] = useState<WebsiteVersion | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState<[WebsiteVersion?, WebsiteVersion?]>([undefined, undefined]);

  // Mock version data - in real app this would come from database
  useEffect(() => {
    if (isOpen) {
      loadVersionHistory();
    }
  }, [isOpen, website.id]);

  const loadVersionHistory = async () => {
    setIsLoading(true);
    try {
      // Mock version history - in real app this would be an API call
      const mockVersions: WebsiteVersion[] = [
        {
          id: '1',
          website_id: website.id,
          version_number: 3,
          title: 'Added contact form and improved mobile layout',
          html_content: website.html_content,
          css_content: website.css_content,
          js_content: website.js_content,
          change_summary: 'Added contact form, improved mobile responsiveness',
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          metadata: {
            user_action: 'AI Iteration',
            changes_made: ['Added contact form', 'Improved mobile layout', 'Updated color scheme'],
            performance_metrics: { load_time: 1.2, size_kb: 45 }
          }
        },
        {
          id: '2',
          website_id: website.id,
          version_number: 2,
          title: 'Updated header design and navigation',
          html_content: website.html_content.replace('Welcome', 'Hello'),
          css_content: website.css_content,
          js_content: website.js_content,
          change_summary: 'Redesigned header, improved navigation UX',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          metadata: {
            user_action: 'Manual Edit',
            changes_made: ['Updated header', 'Changed navigation', 'Added animations'],
            performance_metrics: { load_time: 1.1, size_kb: 42 }
          }
        },
        {
          id: '3',
          website_id: website.id,
          version_number: 1,
          title: 'Initial website creation',
          html_content: '<html><body><h1>Basic Website</h1></body></html>',
          css_content: 'body { font-family: Arial; }',
          js_content: '',
          change_summary: 'Initial website generation from AI prompt',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          metadata: {
            user_action: 'Initial Generation',
            changes_made: ['Created website structure', 'Applied base styling'],
            performance_metrics: { load_time: 0.8, size_kb: 15 }
          }
        }
      ];

      setVersions(mockVersions);
    } catch (error) {
      toast.error('Failed to load version history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (version: WebsiteVersion) => {
    try {
      await onRestore(version);
      toast.success(`Website restored to version ${version.version_number}`);
      onClose();
    } catch (error) {
      toast.error('Failed to restore version');
    }
  };

  const createPreviewContent = (version: WebsiteVersion) => {
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${version.title}</title>
        <style>
          ${version.css_content}
        </style>
      </head>
      <body>
        ${version.html_content.replace(/^<!DOCTYPE html>[\s\S]*?<body[^>]*>|<\/body>[\s\S]*$/gi, '')}
        ${version.js_content ? `<script>${version.js_content}</script>` : ''}
      </body>
      </html>
    `;
    return `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`;
  };

  const downloadVersion = (version: WebsiteVersion) => {
    const fullHtml = createPreviewContent(version);
    const blob = new Blob([decodeURIComponent(fullHtml.split(',')[1])], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${website.title}-v${version.version_number}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Version downloaded successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Version History - {website.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Version List */}
          <div className="w-1/3 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Versions ({versions.length})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompareMode(!compareMode)}
              >
                <Diff className="w-4 h-4 mr-2" />
                Compare
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-2">
                {versions.map((version, index) => (
                  <Card 
                    key={version.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedVersion?.id === version.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedVersion(version)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? 'default' : 'secondary'}>
                            v{version.version_number}
                          </Badge>
                          {index === 0 && (
                            <Badge variant="outline" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewVersion(version);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadVersion(version);
                            }}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <h4 className="font-medium text-sm mb-1">{version.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {version.change_summary}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(version.created_at), { addSuffix: true })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {version.metadata?.user_action || 'Manual'}
                        </div>
                      </div>

                      {version.metadata?.performance_metrics && (
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {version.metadata.performance_metrics.load_time}s
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {version.metadata.performance_metrics.size_kb}KB
                          </Badge>
                        </div>
                      )}

                      {index > 0 && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRestore(version);
                            }}
                            className="flex-1"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Restore
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Version Details & Preview */}
          <div className="flex-1 flex flex-col">
            {selectedVersion ? (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Version {selectedVersion.version_number}: {selectedVersion.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedVersion.created_at).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedVersion.metadata?.user_action || 'Manual Edit'}
                    </div>
                  </div>

                  {selectedVersion.metadata?.changes_made && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Changes Made:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {selectedVersion.metadata.changes_made.map((change, index) => (
                          <li key={index}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Version Preview */}
                <div className="flex-1 border rounded-lg overflow-hidden bg-white">
                  <iframe
                    src={createPreviewContent(selectedVersion)}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    title={`Version ${selectedVersion.version_number} Preview`}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Version</h3>
                  <p className="text-muted-foreground">
                    Choose a version from the list to view its details and preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};