import { Link } from "react-router-dom";
import { ArrowLeft, Book, Code, Zap, Search, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Documentation = () => {
  const quickStart = [
    {
      title: "Getting Started",
      description: "Sign up and create your first AI-generated website",
      icon: Zap,
      link: "/auth",
      time: "2 min"
    },
    {
      title: "Understanding Tokens",
      description: "Learn how our token system works and pricing",
      icon: FileText,
      link: "/pricing",
      time: "3 min"
    },
    {
      title: "Website Generation",
      description: "Best practices for AI website prompts",
      icon: Code,
      link: "#generation-guide",
      time: "5 min"
    }
  ];

  const docSections = [
    {
      title: "API Reference",
      description: "Complete API documentation for developers",
      items: ["Authentication", "Website Generation", "User Management", "Token Operations"],
      badge: "Advanced"
    },
    {
      title: "User Guide",
      description: "Step-by-step guides for using Cyblick",
      items: ["Creating Accounts", "Generating Websites", "Editing & Iterations", "Exporting Code"],
      badge: "Beginner"
    },
    {
      title: "Best Practices",
      description: "Tips and tricks for better AI-generated websites",
      items: ["Prompt Engineering", "Design Guidelines", "Performance Tips", "SEO Optimization"],
      badge: "Intermediate"
    },
    {
      title: "Troubleshooting",
      description: "Common issues and their solutions",
      items: ["Token Issues", "Generation Errors", "Export Problems", "Account Management"],
      badge: "Support"
    }
  ];

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
            Documentation
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Everything you need to know about using Cyblick to create amazing websites with AI. 
            From quick start guides to advanced API documentation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Start</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickStart.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary">{item.time}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={item.link} className="flex items-center gap-2">
                      Get Started
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Documentation Sections</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {docSections.map((section, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <Badge variant={
                      section.badge === "Advanced" ? "destructive" :
                      section.badge === "Beginner" ? "default" :
                      section.badge === "Intermediate" ? "secondary" : "outline"
                    }>
                      {section.badge}
                    </Badge>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Detailed Guides */}
        <section className="mb-16" id="generation-guide">
          <h2 className="text-3xl font-bold text-foreground mb-8">Website Generation Guide</h2>
          <div className="space-y-8">
            
            {/* Prompt Engineering */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Prompt Engineering Best Practices
                </CardTitle>
                <CardDescription>
                  Learn how to write effective prompts for better AI-generated websites
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">1. Be Specific and Descriptive</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">❌ Bad Example:</p>
                    <code className="text-sm">"Create a business website"</code>
                    
                    <p className="text-sm text-muted-foreground mb-2 mt-4">✅ Good Example:</p>
                    <code className="text-sm">
                      "Create a modern business website for a digital marketing agency with a hero section, 
                      services showcase, client testimonials, and contact form. Use a professional blue 
                      and white color scheme."
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">2. Specify Design Style</h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium text-sm">Modern & Clean</p>
                      <p className="text-xs text-muted-foreground">Minimalist, spacious layout</p>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium text-sm">Creative & Artistic</p>
                      <p className="text-xs text-muted-foreground">Bold colors, unique layouts</p>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-medium text-sm">Professional</p>
                      <p className="text-xs text-muted-foreground">Corporate, trustworthy</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">3. Include Content Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Specify sections needed (About, Services, Contact, etc.)</li>
                    <li>• Mention any special functionality (forms, galleries, etc.)</li>
                    <li>• Include branding requirements (colors, fonts, logos)</li>
                    <li>• Specify target audience if relevant</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Token Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Understanding Token Consumption
                </CardTitle>
                <CardDescription>
                  Smart strategies for optimizing your token usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Token Costs</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">Generate Website</span>
                        <Badge variant="secondary">25 tokens</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">Modify Website</span>
                        <Badge variant="secondary">15 tokens</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">Live Edit</span>
                        <Badge variant="secondary">5 tokens</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">Export Code</span>
                        <Badge variant="secondary">10 tokens</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Optimization Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Plan your website structure before generating</li>
                      <li>• Use detailed prompts to minimize iterations</li>
                      <li>• Group multiple changes into single requests</li>
                      <li>• Use live edit for small adjustments (costs less)</li>
                      <li>• Export only when you're satisfied with the result</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What file formats can I export my websites in?",
                a: "You can export your websites as HTML, CSS, and JavaScript files. The code is clean, readable, and ready to deploy on any hosting platform."
              },
              {
                q: "Can I modify the generated code after export?",
                a: "Absolutely! The exported code is yours to modify however you like. It's built with standard web technologies and follows best practices."
              },
              {
                q: "How accurate is the AI at interpreting my requirements?",
                a: "Our AI is highly sophisticated, but the quality depends on how specific your prompts are. The more details you provide, the better the results."
              },
              {
                q: "What happens if I run out of tokens?",
                a: "You can upgrade your plan at any time to get more tokens. Free users get 100 tokens per month, which refreshes automatically."
              },
              {
                q: "Is there a limit to website complexity?",
                a: "While our AI can create quite complex websites, very specialized functionality might require manual coding. We're constantly improving our capabilities."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Need Help */}
        <section>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Need More Help?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our support team is here to help!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/support/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/support/community">Join Community</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;