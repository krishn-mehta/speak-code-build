import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Server, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Security = () => {
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
            Security at Cyblick
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Your security and privacy are our top priorities. We implement industry-leading 
            security measures to protect your data and ensure the integrity of our platform.
          </p>
        </div>

        {/* Security Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <CardTitle>99.9% Uptime</CardTitle>
              <CardDescription>
                Reliable service with enterprise-grade infrastructure
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Lock className="h-12 w-12 mx-auto text-blue-500 mb-4" />
              <CardTitle>End-to-End Encryption</CardTitle>
              <CardDescription>
                All data encrypted in transit and at rest
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Eye className="h-12 w-12 mx-auto text-purple-500 mb-4" />
              <CardTitle>SOC 2 Compliant</CardTitle>
              <CardDescription>
                Audited security controls and procedures
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Detailed Security Sections */}
        <div className="space-y-12">
          
          {/* Data Protection */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="h-8 w-8 text-primary" />
              Data Protection
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Encryption Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-muted-foreground">
                    <p className="font-semibold text-foreground">Data in Transit:</p>
                    <p>TLS 1.3 encryption for all communications</p>
                  </div>
                  <div className="text-muted-foreground">
                    <p className="font-semibold text-foreground">Data at Rest:</p>
                    <p>AES-256 encryption for database storage</p>
                  </div>
                  <div className="text-muted-foreground">
                    <p className="font-semibold text-foreground">API Security:</p>
                    <p>JWT tokens with short expiration times</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Data Storage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-muted-foreground">
                    <p className="font-semibold text-foreground">Infrastructure:</p>
                    <p>Hosted on secure AWS and Supabase infrastructure</p>
                  </div>
                  <div className="text-muted-foreground">
                    <p className="font-semibold text-foreground">Backups:</p>
                    <p>Automated daily backups with 30-day retention</p>
                  </div>
                  <div className="text-muted-foreground">
                    <p className="font-semibold text-foreground">Geographic Distribution:</p>
                    <p>Data centers in multiple regions for redundancy</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Authentication & Access */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Authentication & Access Control
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Secure password requirements with complexity rules</li>
                    <li>• Email verification for account activation</li>
                    <li>• Session management with automatic timeout</li>
                    <li>• Password reset with secure token validation</li>
                    <li>• Account lockout after failed login attempts</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Access Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Row-level security (RLS) in database</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• API rate limiting and throttling</li>
                    <li>• Principle of least privilege access</li>
                    <li>• Regular access reviews and audits</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Infrastructure Security */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="h-8 w-8 text-primary" />
              Infrastructure Security
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Secure Hosting & Monitoring</CardTitle>
                <CardDescription>
                  Enterprise-grade infrastructure with 24/7 monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Cloud Security</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AWS/Supabase security controls</li>
                      <li>• Network isolation and firewalls</li>
                      <li>• DDoS protection</li>
                      <li>• Intrusion detection systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Monitoring</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 24/7 security monitoring</li>
                      <li>• Automated threat detection</li>
                      <li>• Real-time alerts</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Compliance</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SOC 2 Type II audited</li>
                      <li>• GDPR compliance</li>
                      <li>• CCPA compliance</li>
                      <li>• Regular security assessments</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Development Security */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Development Security
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Secure Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Security code reviews for all changes</li>
                    <li>• Automated security scanning in CI/CD</li>
                    <li>• Dependency vulnerability monitoring</li>
                    <li>• Input validation and sanitization</li>
                    <li>• Regular penetration testing</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Content filtering and moderation</li>
                    <li>• Prompt injection prevention</li>
                    <li>• Output sanitization</li>
                    <li>• Rate limiting on AI requests</li>
                    <li>• Model access controls</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Incident Response */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-primary" />
              Incident Response
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Security Incident Handling</CardTitle>
                <CardDescription>
                  Comprehensive procedures for security incident management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-red-600 dark:text-red-400 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Detection</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Automated monitoring and alerting systems detect potential threats
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Assessment</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Security team evaluates the scope and impact of the incident
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Containment</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Immediate actions to prevent further damage or data exposure
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 dark:text-green-400 font-bold">4</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Recovery</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Service restoration and post-incident analysis for improvement
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Communication Policy</h4>
                  <p className="text-muted-foreground mb-3">
                    In the event of a security incident that may affect user data or service availability:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Users will be notified within 24 hours of discovery</li>
                    <li>• Regular updates provided until resolution</li>
                    <li>• Full post-incident report published when appropriate</li>
                    <li>• Affected users receive individual notifications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Security Certifications */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Security Certifications & Standards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">SOC 2 Type II</p>
                        <p className="text-sm text-muted-foreground">Security, availability, and confidentiality</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">GDPR Compliant</p>
                        <p className="text-sm text-muted-foreground">European data protection regulations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">CCPA Compliant</p>
                        <p className="text-sm text-muted-foreground">California privacy rights</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Annual third-party security audits</li>
                    <li>• Quarterly penetration testing</li>
                    <li>• Employee security training programs</li>
                    <li>• Vulnerability disclosure program</li>
                    <li>• Regular security policy reviews</li>
                    <li>• Business continuity planning</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Security Contact</h2>
            <Card>
              <CardHeader>
                <CardTitle>Report Security Issues</CardTitle>
                <CardDescription>
                  We take security seriously and appreciate responsible disclosure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Security Team</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>Email:</strong> security@cyblick.com</p>
                      <p><strong>Response Time:</strong> Within 24 hours</p>
                      <p><strong>PGP Key:</strong> Available on request</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Vulnerability Disclosure</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Please include:</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Detailed description of the vulnerability</li>
                        <li>• Steps to reproduce</li>
                        <li>• Potential impact assessment</li>
                        <li>• Your contact information</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Bug Bounty Program:</strong> We're currently developing a formal bug bounty 
                    program. In the meantime, we appreciate responsible disclosure and will acknowledge 
                    security researchers who help improve our platform.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;