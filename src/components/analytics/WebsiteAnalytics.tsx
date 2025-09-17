import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Eye, 
  Clock, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Zap,
  Globe,
  Users,
  MousePointer,
  Download
} from "lucide-react";

interface Website {
  id: string;
  title: string;
  created_at: string;
}

interface WebsiteAnalyticsProps {
  website: Website;
}

interface AnalyticsData {
  views: number;
  uniqueVisitors: number;
  avgLoadTime: number;
  bounceRate: number;
  mobileUsers: number;
  desktopUsers: number;
  topPages: Array<{ page: string; views: number; }>;
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  weeklyViews: Array<{ day: string; views: number; }>;
  deviceBreakdown: Array<{ name: string; value: number; color: string; }>;
}

export const WebsiteAnalytics = ({ website }: WebsiteAnalyticsProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    loadAnalytics();
  }, [website.id, timeRange]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    
    // Mock analytics data - in real app this would come from analytics service
    setTimeout(() => {
      const mockData: AnalyticsData = {
        views: 2847,
        uniqueVisitors: 1923,
        avgLoadTime: 1.24,
        bounceRate: 23.5,
        mobileUsers: 1245,
        desktopUsers: 678,
        performanceScore: 94,
        seoScore: 87,
        accessibilityScore: 91,
        topPages: [
          { page: '/', views: 1523 },
          { page: '/about', views: 567 },
          { page: '/contact', views: 234 },
          { page: '/services', views: 523 }
        ],
        weeklyViews: [
          { day: 'Mon', views: 245 },
          { day: 'Tue', views: 387 },
          { day: 'Wed', views: 456 },
          { day: 'Thu', views: 623 },
          { day: 'Fri', views: 534 },
          { day: 'Sat', views: 345 },
          { day: 'Sun', views: 257 }
        ],
        deviceBreakdown: [
          { name: 'Mobile', value: 65, color: '#8884d8' },
          { name: 'Desktop', value: 30, color: '#82ca9d' },
          { name: 'Tablet', value: 5, color: '#ffc658' }
        ]
      };
      
      setAnalytics(mockData);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!analytics) return null;

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">{website.title}</p>
        </div>
        
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{analytics.views.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Load Time</p>
                <p className="text-2xl font-bold">{analytics.avgLoadTime}s</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">Excellent</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold">{analytics.bounceRate}%</p>
              </div>
              <MousePointer className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">Good</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.weeklyViews}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">Performance</span>
                  </div>
                  <Badge variant={getScoreVariant(analytics.performanceScore)}>
                    {analytics.performanceScore}
                  </Badge>
                </div>
                <Progress value={analytics.performanceScore} className="mb-2" />
                <p className={`text-sm font-medium ${getScoreColor(analytics.performanceScore)}`}>
                  Excellent
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">SEO</span>
                  </div>
                  <Badge variant={getScoreVariant(analytics.seoScore)}>
                    {analytics.seoScore}
                  </Badge>
                </div>
                <Progress value={analytics.seoScore} className="mb-2" />
                <p className={`text-sm font-medium ${getScoreColor(analytics.seoScore)}`}>
                  Good
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Accessibility</span>
                  </div>
                  <Badge variant={getScoreVariant(analytics.accessibilityScore)}>
                    {analytics.accessibilityScore}
                  </Badge>
                </div>
                <Progress value={analytics.accessibilityScore} className="mb-2" />
                <p className={`text-sm font-medium ${getScoreColor(analytics.accessibilityScore)}`}>
                  Excellent
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.deviceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analytics.deviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Mobile Users</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{analytics.mobileUsers.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">65%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Desktop Users</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{analytics.desktopUsers.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">30%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.topPages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="page" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{page.page === '/' ? 'Home' : page.page}</p>
                      <p className="text-sm text-muted-foreground">{page.page}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{page.views.toLocaleString()} views</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-500">
                          +{(Math.random() * 20 + 5).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};