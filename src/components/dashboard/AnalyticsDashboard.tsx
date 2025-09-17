import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Globe, 
  Zap, 
  Clock,
  Download,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Calendar
} from "lucide-react";

// Mock analytics data - replace with real data from your API
const tokenUsageData = [
  { month: "Jan", tokens: 45, generated: 2, iterations: 8 },
  { month: "Feb", tokens: 78, generated: 3, iterations: 12 },
  { month: "Mar", tokens: 92, generated: 4, iterations: 15 },
  { month: "Apr", tokens: 67, generated: 3, iterations: 10 },
  { month: "May", tokens: 125, generated: 5, iterations: 20 },
  { month: "Jun", tokens: 143, generated: 6, iterations: 25 }
];

const websitePerformanceData = [
  { name: "E-commerce Store", views: 1234, clicks: 89, conversion: 7.2 },
  { name: "Portfolio Site", views: 567, clicks: 43, conversion: 7.6 },
  { name: "Landing Page", views: 2890, clicks: 234, conversion: 8.1 },
  { name: "Blog Site", views: 445, clicks: 32, conversion: 7.2 },
  { name: "Corporate Site", views: 678, clicks: 54, conversion: 8.0 }
];

const deviceData = [
  { name: "Desktop", value: 62, color: "#3B82F6" },
  { name: "Mobile", value: 31, color: "#10B981" },
  { name: "Tablet", value: 7, color: "#F59E0B" }
];

const topCountries = [
  { country: "United States", users: 1250, flag: "🇺🇸" },
  { country: "United Kingdom", users: 890, flag: "🇬🇧" },
  { country: "Germany", users: 567, flag: "🇩🇪" },
  { country: "Canada", users: 432, flag: "🇨🇦" },
  { country: "Australia", users: 321, flag: "🇦🇺" }
];

const trafficSources = [
  { source: "Direct", visitors: 1200, percentage: 45 },
  { source: "Google Search", visitors: 800, percentage: 30 },
  { source: "Social Media", visitors: 400, percentage: 15 },
  { source: "Referrals", visitors: 267, percentage: 10 }
];

export const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const statCards = [
    {
      title: "Total Website Views",
      value: "15.2K",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Unique Visitors",
      value: "3.4K",
      change: "+8.2%", 
      trend: "up",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Tokens Used",
      value: "367",
      change: "-5.1%",
      trend: "down",
      icon: Zap,
      color: "text-purple-600"
    },
    {
      title: "Avg. Load Time",
      value: "1.2s",
      change: "+0.3s",
      trend: "down",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
          <p className="text-gray-600">Track your website performance and usage metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className={`flex items-center text-sm mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change} vs last period
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
          <TabsTrigger value="tokens">Token Usage</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Website Views Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Website Views Trend</CardTitle>
                <CardDescription>Daily views across all your websites</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={tokenUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="tokens" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>How users access your websites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: device.color }}
                        />
                        <span className="text-sm font-medium">{device.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{country.flag}</span>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={(country.users / 1250) * 100} className="w-20 h-2" />
                      <span className="text-sm font-medium w-16 text-right">{country.users}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Websites Performance Tab */}
        <TabsContent value="websites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Performance</CardTitle>
              <CardDescription>Individual website metrics and performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={websitePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3B82F6" name="Views" />
                  <Bar dataKey="clicks" fill="#10B981" name="Clicks" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Website Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Website Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-2 font-medium">Website</th>
                      <th className="pb-2 font-medium">Views</th>
                      <th className="pb-2 font-medium">Clicks</th>
                      <th className="pb-2 font-medium">Conversion</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {websitePerformanceData.map((website, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 font-medium">{website.name}</td>
                        <td className="py-3">{website.views.toLocaleString()}</td>
                        <td className="py-3">{website.clicks}</td>
                        <td className="py-3">{website.conversion}%</td>
                        <td className="py-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Token Usage Tab */}
        <TabsContent value="tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Usage Over Time</CardTitle>
              <CardDescription>Track your token consumption and website generation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={tokenUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="tokens" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="Tokens Used"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="generated" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Websites Generated"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="iterations" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Iterations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Token Usage Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Websites Generated</p>
                    <p className="text-3xl font-bold text-green-600">23</p>
                    <p className="text-sm text-gray-500">575 tokens used</p>
                  </div>
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Iterations Made</p>
                    <p className="text-3xl font-bold text-blue-600">87</p>
                    <p className="text-sm text-gray-500">435 tokens used</p>
                  </div>
                  <MousePointer className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Exports</p>
                    <p className="text-3xl font-bold text-purple-600">12</p>
                    <p className="text-sm text-gray-500">120 tokens used</p>
                  </div>
                  <Download className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age and gender breakdown of your visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">18-24</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">25-34</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={42} className="w-20 h-2" />
                      <span className="text-sm">42%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">35-44</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={28} className="w-20 h-2" />
                      <span className="text-sm">28%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">45+</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>How visitors find your websites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{source.source}</span>
                      <div className="flex items-center space-x-3">
                        <Progress value={source.percentage} className="w-20 h-2" />
                        <span className="text-sm font-medium w-16 text-right">
                          {source.visitors}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Activity</CardTitle>
              <CardDescription>Live activity on your websites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                  <p className="text-sm text-gray-500">Active visitors right now</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};