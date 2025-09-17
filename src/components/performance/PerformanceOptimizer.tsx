import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Zap, 
  ImageIcon, 
  FileText, 
  Smartphone, 
  Monitor, 
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Settings
} from "lucide-react";

interface Website {
  id: string;
  title: string;
  html_content: string;
  css_content: string;
  js_content?: string;
}

interface PerformanceIssue {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'images' | 'css' | 'js' | 'html' | 'seo';
  title: string;
  description: string;
  impact: string;
  solution: string;
  canAutoFix: boolean;
}

interface PerformanceOptimizerProps {
  website: Website;
  onOptimize: (optimizedWebsite: Partial<Website>) => Promise<void>;
}

export const PerformanceOptimizer = ({ website, onOptimize }: PerformanceOptimizerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [issues, setIssues] = useState<PerformanceIssue[]>([]);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  useEffect(() => {
    analyzePerformance();
  }, [website]);

  const analyzePerformance = async () => {
    setIsAnalyzing(true);
    
    // Simulate performance analysis
    setTimeout(() => {
      const mockIssues: PerformanceIssue[] = [
        {
          id: '1',
          type: 'critical',
          category: 'images',
          title: 'Unoptimized Images',
          description: 'Large images without compression detected',
          impact: 'Page load time increased by 2.3s',
          solution: 'Compress images and use modern formats (WebP, AVIF)',
          canAutoFix: true
        },
        {
          id: '2',
          type: 'warning',
          category: 'css',
          title: 'Unused CSS Rules',
          description: '23% of CSS rules are not being used',
          impact: 'CSS file size increased by 45KB',
          solution: 'Remove unused CSS rules and minify stylesheet',
          canAutoFix: true
        },
        {
          id: '3',
          type: 'info',
          category: 'html',
          title: 'Missing Meta Tags',
          description: 'Some SEO meta tags are missing',
          impact: 'Reduced search engine visibility',
          solution: 'Add description, keywords, and Open Graph tags',
          canAutoFix: true
        },
        {
          id: '4',
          type: 'warning',
          category: 'js',
          title: 'Render Blocking JavaScript',
          description: 'JavaScript blocks initial page rendering',
          impact: 'First Contentful Paint delayed by 0.8s',
          solution: 'Move JavaScript to bottom or use async/defer',
          canAutoFix: true
        }
      ];

      setIssues(mockIssues);
      
      // Calculate performance score based on issues
      const criticalCount = mockIssues.filter(i => i.type === 'critical').length;
      const warningCount = mockIssues.filter(i => i.type === 'warning').length;
      const score = Math.max(0, 100 - (criticalCount * 25) - (warningCount * 10));
      setPerformanceScore(score);
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const optimizeWebsite = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    const totalSteps = issues.filter(i => i.canAutoFix).length;
    let completedSteps = 0;

    // Simulate optimization process
    for (const issue of issues.filter(i => i.canAutoFix)) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      completedSteps++;
      setOptimizationProgress((completedSteps / totalSteps) * 100);
    }

    // Apply optimizations
    let optimizedHtml = website.html_content;
    let optimizedCss = website.css_content;
    let optimizedJs = website.js_content || '';

    // Mock optimizations
    if (issues.some(i => i.category === 'html')) {
      optimizedHtml = optimizedHtml.replace('<head>', 
        `<head>
        <meta name="description" content="Optimized website generated with AI">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:title" content="${website.title}">
        <meta property="og:description" content="Optimized website generated with AI">`
      );
    }

    if (issues.some(i => i.category === 'css')) {
      // Simulate CSS minification
      optimizedCss = optimizedCss.replace(/\s+/g, ' ').trim();
    }

    if (issues.some(i => i.category === 'js' && website.js_content)) {
      // Add defer attribute simulation
      optimizedJs = `// Optimized JavaScript\n${optimizedJs}`;
    }

    try {
      await onOptimize({
        html_content: optimizedHtml,
        css_content: optimizedCss,
        js_content: optimizedJs
      });

      // Update performance score after optimization
      setPerformanceScore(Math.min(100, performanceScore + 30));
      
      // Remove auto-fixed issues
      setIssues(prev => prev.filter(i => !i.canAutoFix));
      
      toast.success('Website optimized successfully!');
    } catch (error) {
      toast.error('Optimization failed');
    } finally {
      setIsOptimizing(false);
      setOptimizationProgress(0);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'images':
        return <ImageIcon className="w-4 h-4" />;
      case 'css':
        return <FileText className="w-4 h-4" />;
      case 'js':
        return <FileText className="w-4 h-4" />;
      case 'html':
        return <Globe className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Performance Score
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Analyzing...</span>
              </div>
            ) : (
              <Badge variant={getScoreVariant(performanceScore)} className="text-lg px-4 py-2">
                {performanceScore}/100
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={performanceScore} className="h-3" />
            <p className={`text-center font-medium ${getScoreColor(performanceScore)}`}>
              {performanceScore >= 90 ? 'Excellent' : 
               performanceScore >= 70 ? 'Good' : 
               performanceScore >= 50 ? 'Needs Improvement' : 'Poor'}
            </p>
            
            {!isAnalyzing && issues.length > 0 && (
              <div className="flex justify-center">
                <Button 
                  onClick={optimizeWebsite} 
                  disabled={isOptimizing}
                  className="flex items-center gap-2"
                >
                  {isOptimizing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Settings className="w-4 h-4" />
                  )}
                  {isOptimizing ? 'Optimizing...' : 'Auto-Optimize Website'}
                </Button>
              </div>
            )}

            {isOptimizing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Optimization Progress</span>
                  <span>{Math.round(optimizationProgress)}%</span>
                </div>
                <Progress value={optimizationProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      {!isAnalyzing && (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Issues ({issues.length})</TabsTrigger>
            <TabsTrigger value="critical">
              Critical ({issues.filter(i => i.type === 'critical').length})
            </TabsTrigger>
            <TabsTrigger value="warning">
              Warnings ({issues.filter(i => i.type === 'warning').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {issues.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Great Job!</h3>
                  <p className="text-muted-foreground">
                    No performance issues detected. Your website is well optimized!
                  </p>
                </CardContent>
              </Card>
            ) : (
              issues.map((issue) => (
                <Card key={issue.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(issue.category)}
                          <h4 className="font-semibold">{issue.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {issue.category.toUpperCase()}
                          </Badge>
                          {issue.canAutoFix && (
                            <Badge variant="secondary" className="text-xs">
                              Auto-fixable
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {issue.description}
                        </p>
                        <div className="space-y-2">
                          <Alert>
                            <AlertTriangle className="w-4 h-4" />
                            <AlertDescription>
                              <strong>Impact:</strong> {issue.impact}
                            </AlertDescription>
                          </Alert>
                          <Alert>
                            <CheckCircle className="w-4 h-4" />
                            <AlertDescription>
                              <strong>Solution:</strong> {issue.solution}
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="critical">
            {issues.filter(i => i.type === 'critical').map((issue) => (
              <Card key={issue.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(issue.category)}
                        <h4 className="font-semibold">{issue.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {issue.category.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {issue.description}
                      </p>
                      <Alert>
                        <AlertTriangle className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Impact:</strong> {issue.impact}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="warning">
            {issues.filter(i => i.type === 'warning').map((issue) => (
              <Card key={issue.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(issue.category)}
                        <h4 className="font-semibold">{issue.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {issue.category.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {issue.description}
                      </p>
                      <Alert>
                        <CheckCircle className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Solution:</strong> {issue.solution}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};