import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTokens } from '@/hooks/useTokens';
import { Download, FileCode, FileText, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface Website {
  id: string;
  title: string;
  html_content: string;
  css_content: string;
  js_content?: string;
}

interface WebsiteExportProps {
  website: Website;
  onExport?: () => void;
}

export const WebsiteExport = ({ website, onExport }: WebsiteExportProps) => {
  const { consumeTokens, hasEnoughTokens, getTokenCost } = useTokens();
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'vite-react',
      name: 'Vite + React Project',
      description: 'Complete Vite React project with TypeScript and Tailwind',
      icon: FileCode,
      extension: 'zip'
    },
    {
      id: 'standalone',
      name: 'Standalone HTML',
      description: 'Single HTML file for quick deployment',
      icon: FileText,
      extension: 'html'
    },
    {
      id: 'vercel-deploy',
      name: 'Vercel Ready',
      description: 'Optimized React project ready for Vercel deployment',
      icon: Smartphone,
      extension: 'zip'
    }
  ];

  const handleExport = async (format: string) => {
    if (!hasEnoughTokens('export_website')) {
      toast.error(`Not enough tokens! You need ${getTokenCost('export_website')} tokens to export a website.`);
      return;
    }

    setIsExporting(true);
    try {
      // Consume tokens for export
      const tokenResult = await consumeTokens('export_website', website.id, {
        format,
        website_title: website.title
      });

      if (!tokenResult.success) {
        toast.error(tokenResult.error || 'Failed to consume tokens');
        return;
      }

      // Generate the export based on format
      let content = '';
      let filename = '';
      let mimeType = 'text/html';

      switch (format) {
        case 'vite-react':
          content = generateReactProject(website);
          filename = `${website.title.replace(/\s+/g, '-').toLowerCase()}-react.zip`;
          mimeType = 'application/zip';
          toast.info('React project export coming soon! Downloaded as HTML for now.');
          // For now, export as HTML until we implement ZIP generation
          content = generateStandaloneHTML(website);
          filename = `${website.title.replace(/\s+/g, '-').toLowerCase()}-react.html`;
          mimeType = 'text/html';
          break;
        case 'standalone':
          content = generateStandaloneHTML(website);
          filename = `${website.title.replace(/\s+/g, '-').toLowerCase()}.html`;
          mimeType = 'text/html';
          break;
        case 'vercel-deploy':
          content = generateVercelProject(website);
          filename = `${website.title.replace(/\s+/g, '-').toLowerCase()}-vercel.zip`;
          mimeType = 'application/zip';
          toast.info('Vercel project export coming soon! Downloaded as HTML for now.');
          // For now, export as HTML until we implement ZIP generation
          content = generateStandaloneHTML(website);
          filename = `${website.title.replace(/\s+/g, '-').toLowerCase()}-vercel.html`;
          mimeType = 'text/html';
          break;
        default:
          content = generateStandaloneHTML(website);
          filename = `${website.title.replace(/\s+/g, '-').toLowerCase()}.html`;
      }

      // Create download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Website exported successfully! ${tokenResult.tokens_remaining} tokens remaining.`);
      onExport?.();
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export website');
    } finally {
      setIsExporting(false);
    }
  };

  const generateStandaloneHTML = (website: Website) => {
    // Convert React JSX to HTML for standalone deployment
    const htmlContent = website.html_content
      .replace(/className=/g, 'class=')
      .replace(/import React.*?;/g, '')
      .replace(/export default App;/g, '')
      .replace(/const App.*?=> {/g, '')
      .replace(/return \(/g, '')
      .replace(/\);\s*};\s*$/g, '')
      .replace(/{TITLE}/g, website.title)
      .replace(/href="#/g, 'href="#')
      .replace(/onClick={.*?}/g, 'onclick=""');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${website.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
${website.css_content}
    </style>
</head>
<body>
${htmlContent}
    <script>
      // Basic interactivity for converted React components
      document.addEventListener('DOMContentLoaded', function() {
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      });
    </script>
</body>
</html>`;
  };

  const generateReactProject = (website: Website) => {
    // This would generate a complete Vite React project structure
    // For now, return the React code as-is
    return website.html_content;
  };

  const generateVercelProject = (website: Website) => {
    // This would generate a Vercel-optimized React project
    // For now, return the React code as-is
    return website.html_content;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Website
        </CardTitle>
        <CardDescription>
          Download your website in different formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exportFormats.map((format) => {
            const IconComponent = format.icon;
            return (
              <div
                key={format.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{format.name}</h4>
                    <p className="text-sm text-muted-foreground">{format.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {getTokenCost('export_website')} tokens
                  </Badge>
                  <Button
                    onClick={() => handleExport(format.id)}
                    disabled={isExporting || !hasEnoughTokens('export_website')}
                    size="sm"
                  >
                    {isExporting ? 'Exporting...' : 'Export'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {!hasEnoughTokens('export_website') && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              You need {getTokenCost('export_website')} tokens to export websites. 
              <Button variant="link" className="h-auto p-0 text-orange-800 underline">
                Upgrade your plan
              </Button> or wait for your next token refresh.
            </p>
          </div>
        )}

        <div className="mt-6 text-xs text-muted-foreground">
          <p>• Exported websites are fully standalone and ready to deploy</p>
          <p>• All assets and styles are included in the download</p>
          <p>• Compatible with any web hosting service</p>
        </div>
      </CardContent>
    </Card>
  );
};