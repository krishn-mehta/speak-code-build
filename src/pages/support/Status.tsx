import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle, XCircle, Clock, TrendingUp, Zap, Database, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Status = () => {
  const overallStatus = "operational"; // operational, degraded, major_outage

  const services = [
    {
      name: "AI Website Generation",
      status: "operational",
      uptime: 99.98,
      responseTime: "1.2s",
      lastIncident: "None in the last 30 days",
      description: "Core AI website generation service"
    },
    {
      name: "User Dashboard",
      status: "operational", 
      uptime: 99.95,
      responseTime: "450ms",
      lastIncident: "None in the last 30 days",
      description: "User interface and account management"
    },
    {
      name: "Authentication",
      status: "operational",
      uptime: 99.99,
      responseTime: "200ms", 
      lastIncident: "None in the last 30 days",
      description: "User login and registration system"
    },
    {
      name: "Website Export",
      status: "operational",
      uptime: 99.92,
      responseTime: "800ms",
      lastIncident: "None in the last 30 days", 
      description: "Code export and download functionality"
    },
    {
      name: "Token System",
      status: "operational",
      uptime: 99.97,
      responseTime: "150ms",
      lastIncident: "None in the last 30 days",
      description: "Token management and billing"
    },
    {
      name: "Live Editor",
      status: "operational",
      uptime: 99.89,
      responseTime: "600ms",
      lastIncident: "None in the last 30 days",
      description: "Real-time website editing features"
    }
  ];

  const incidents = [
    {
      title: "Scheduled Maintenance - AI Model Updates",
      status: "completed",
      impact: "minor",
      date: "January 15, 2025",
      time: "2:00 AM - 2:30 AM EST",
      description: "Routine AI model updates to improve generation quality. All services remained available during this maintenance window.",
      updates: [
        {
          time: "2:30 AM EST",
          message: "Maintenance completed successfully. All systems operating normally.",
          status: "resolved"
        },
        {
          time: "2:00 AM EST", 
          message: "Scheduled maintenance in progress. No service interruption expected.",
          status: "investigating"
        }
      ]
    },
    {
      title: "Brief Authentication Delays",
      status: "resolved",
      impact: "minor",
      date: "January 10, 2025", 
      time: "11:15 AM - 11:45 AM EST",
      description: "Some users experienced slower than normal login times due to increased traffic. Issue was resolved by scaling authentication infrastructure.",
      updates: [
        {
          time: "11:45 AM EST",
          message: "Authentication delays have been resolved. All systems operating normally.",
          status: "resolved"
        },
        {
          time: "11:30 AM EST",
          message: "We've implemented additional scaling measures and are seeing improvement in response times.",
          status: "monitoring"
        },
        {
          time: "11:15 AM EST",
          message: "We're investigating reports of slower authentication response times.",
          status: "investigating"
        }
      ]
    }
  ];

  const metrics = [
    {
      name: "API Response Time",
      value: "284ms",
      trend: "down",
      change: "-12ms from yesterday",
      icon: Zap,
      color: "text-green-600"
    },
    {
      name: "Success Rate",
      value: "99.97%",
      trend: "up", 
      change: "+0.02% from yesterday",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      name: "Database Performance",
      value: "98.5ms",
      trend: "stable",
      change: "No change",
      icon: Database, 
      color: "text-blue-600"
    },
    {
      name: "Global CDN",
      value: "145ms",
      trend: "down",
      change: "-8ms from yesterday",
      icon: Globe,
      color: "text-green-600"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "major_outage":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50 dark:bg-green-950";
      case "degraded": 
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
      case "major_outage":
        return "text-red-600 bg-red-50 dark:bg-red-950";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Cyblick Status
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Real-time status and performance metrics for all Cyblick services. 
            Subscribe to updates to stay informed about any incidents or maintenance.
          </p>
        </div>

        {/* Overall Status */}
        <section className="mb-12">
          <Card className={`${getStatusColor(overallStatus)} border-l-4 ${
            overallStatus === 'operational' ? 'border-l-green-500' : 
            overallStatus === 'degraded' ? 'border-l-yellow-500' : 'border-l-red-500'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(overallStatus)}
                  <div>
                    <CardTitle className="text-2xl">All Systems Operational</CardTitle>
                    <CardDescription>
                      All Cyblick services are running smoothly with no known issues
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">99.98%</div>
                  <div className="text-sm text-muted-foreground">30-day uptime</div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>

        {/* Performance Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Performance Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    <TrendingUp className={`h-4 w-4 ${
                      metric.trend === 'up' ? 'text-green-500' :
                      metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm font-medium mb-1">{metric.name}</div>
                  <div className="text-xs text-muted-foreground">{metric.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Service Status</h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={service.status === 'operational' ? 'default' : 'destructive'}>
                        {service.status === 'operational' ? 'Operational' : 'Issues'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">Uptime (30d)</div>
                      <div className="font-semibold">{service.uptime}%</div>
                      <Progress value={service.uptime} className="mt-1" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Avg Response</div>
                      <div className="font-semibold">{service.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Last Incident</div>
                      <div className="font-semibold text-green-600">{service.lastIncident}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Incidents</h2>
          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {incident.status === 'resolved' || incident.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                        {incident.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {incident.date} • {incident.time}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={incident.status === 'resolved' || incident.status === 'completed' ? 'default' : 'secondary'}>
                        {incident.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant={incident.impact === 'minor' ? 'secondary' : 'destructive'}>
                        {incident.impact.toUpperCase()} IMPACT
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{incident.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Updates:</h4>
                    {incident.updates.map((update, updateIndex) => (
                      <div key={updateIndex} className="flex gap-3 text-sm">
                        <div className="flex-shrink-0 w-20 text-muted-foreground">
                          {update.time}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {update.status === 'resolved' ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : update.status === 'monitoring' ? (
                              <AlertCircle className="h-3 w-3 text-yellow-500" />
                            ) : (
                              <Clock className="h-3 w-3 text-gray-500" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {update.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p>{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Security & Compliance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">SOC 2 Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  Annual security audits and compliance monitoring
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">99.9% SLA</h3>
                <p className="text-sm text-muted-foreground">
                  Guaranteed uptime with service level agreements
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Database className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Data Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Encrypted storage and secure data handling
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Stay Informed</CardTitle>
              <CardDescription className="max-w-2xl mx-auto">
                Subscribe to status updates and be the first to know about any incidents, 
                maintenance, or service improvements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-border rounded-md"
                />
                <Button>
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get notified via email about incidents and maintenance • Unsubscribe anytime
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <Button variant="outline" size="sm">
                  RSS Feed
                </Button>
                <Button variant="outline" size="sm">
                  Webhook API
                </Button>
                <Button variant="outline" size="sm">
                  Slack Integration
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Status;