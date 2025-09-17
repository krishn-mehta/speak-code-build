import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Code, Zap, Play, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Examples = () => {
  const showcaseWebsites = [
    {
      id: 1,
      name: "TechFlow Solutions",
      category: "B2B SaaS",
      description: "A modern software company website showcasing enterprise solutions",
      url: "#",
      image: "/api/placeholder/600/400",
      tags: ["SaaS", "Enterprise", "Modern"],
      features: ["Hero Section", "Product Features", "Pricing", "Testimonials"],
      prompt: "Create a professional B2B SaaS website for TechFlow Solutions with enterprise-grade security features, pricing tiers, customer testimonials, and a modern blue gradient design.",
      stats: {
        generated: "2 min",
        tokens: 25,
        iterations: 2
      }
    },
    {
      id: 2,
      name: "Artisan Coffee Co.",
      category: "E-commerce",
      description: "Premium coffee shop with online ordering and subscription service",
      url: "#",
      image: "/api/placeholder/600/400",
      tags: ["E-commerce", "Food", "Subscription"],
      features: ["Product Catalog", "Subscription", "Store Locator", "About Story"],
      prompt: "Build an e-commerce website for Artisan Coffee Co. featuring premium coffee products, subscription plans, brewing guides, and store locations. Use warm brown and cream colors with rustic, artisanal design elements.",
      stats: {
        generated: "3 min",
        tokens: 35,
        iterations: 3
      }
    },
    {
      id: 3,
      name: "Maya Chen Portfolio",
      category: "Creative Portfolio",
      description: "UX designer's portfolio showcasing projects and design process",
      url: "#",
      image: "/api/placeholder/600/400",
      tags: ["Portfolio", "UX Design", "Creative"],
      features: ["Project Showcase", "Case Studies", "About", "Contact"],
      prompt: "Design a modern UX designer portfolio for Maya Chen with project case studies, design process explanations, testimonials, and contact form. Use a minimalist design with tasteful animations and a professional color palette.",
      stats: {
        generated: "2 min",
        tokens: 25,
        iterations: 1
      }
    },
    {
      id: 4,
      name: "GreenEarth Foundation",
      category: "Non-Profit",
      description: "Environmental charity focused on climate action and conservation",
      url: "#",
      image: "/api/placeholder/600/400",
      tags: ["Non-Profit", "Environment", "Donations"],
      features: ["Mission Statement", "Donation Forms", "Impact Metrics", "Volunteer"],
      prompt: "Create an inspiring environmental non-profit website for GreenEarth Foundation with donation forms, impact statistics, volunteer opportunities, and success stories. Use green and earth tones with nature imagery.",
      stats: {
        generated: "2.5 min",
        tokens: 30,
        iterations: 2
      }
    },
    {
      id: 5,
      name: "Bella Vista Restaurant",
      category: "Restaurant",
      description: "Fine dining establishment with reservations and event hosting",
      url: "#",
      image: "/api/placeholder/600/400",
      tags: ["Restaurant", "Fine Dining", "Events"],
      features: ["Menu", "Reservations", "Events", "Chef Profile"],
      prompt: "Design an elegant fine dining restaurant website for Bella Vista with menu showcase, online reservations, private event booking, chef biography, and gallery. Use sophisticated dark tones with gold accents.",
      stats: {
        generated: "3 min",
        tokens: 30,
        iterations: 2
      }
    },
    {
      id: 6,
      name: "FitLife Gym",
      category: "Fitness",
      description: "Modern fitness center with classes, trainers, and membership options",
      url: "#",
      image: "/api/placeholder/600/400",
      tags: ["Fitness", "Health", "Membership"],
      features: ["Classes", "Trainers", "Membership", "Facilities"],
      prompt: "Build a dynamic fitness gym website for FitLife with class schedules, trainer profiles, membership plans, facility tours, and success stories. Use energetic colors with fitness-focused imagery and modern typography.",
      stats: {
        generated: "2.5 min",
        tokens: 28,
        iterations: 1
      }
    }
  ];

  const codeExamples = [
    {
      title: "Responsive Navigation",
      description: "Modern mobile-first navigation with hamburger menu",
      language: "HTML/CSS/JS",
      code: `<!-- Responsive Navigation Example -->
<nav class="navbar">
  <div class="nav-container">
    <div class="nav-logo">
      <h2>Cyblick</h2>
    </div>
    <div class="nav-menu" id="nav-menu">
      <div class="nav-item">
        <a href="#home" class="nav-link">Home</a>
      </div>
      <div class="nav-item">
        <a href="#features" class="nav-link">Features</a>
      </div>
      <div class="nav-item">
        <a href="#pricing" class="nav-link">Pricing</a>
      </div>
    </div>
    <div class="nav-toggle" id="mobile-menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </div>
</nav>`
    },
    {
      title: "Hero Section with CTA",
      description: "Engaging hero section with call-to-action buttons",
      language: "HTML/CSS",
      code: `<!-- Hero Section Example -->
<section class="hero">
  <div class="hero-container">
    <div class="hero-content">
      <h1 class="hero-title">Build Websites with AI</h1>
      <p class="hero-description">
        Create professional websites in seconds with our AI-powered platform
      </p>
      <div class="hero-buttons">
        <button class="btn btn-primary">Get Started Free</button>
        <button class="btn btn-secondary">View Examples</button>
      </div>
    </div>
    <div class="hero-image">
      <img src="hero-graphic.svg" alt="AI Website Builder" />
    </div>
  </div>
</section>`
    },
    {
      title: "Feature Cards Grid",
      description: "Responsive grid layout for showcasing features",
      language: "HTML/CSS",
      code: `<!-- Feature Cards Example -->
<section class="features">
  <div class="container">
    <h2 class="section-title">Powerful Features</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>AI Generation</h3>
        <p>Create websites instantly with advanced AI</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💰</div>
        <h3>Token Pricing</h3>
        <p>Pay only for what you use with our fair token system</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3>Instant Results</h3>
        <p>Get your website ready in under 2 minutes</p>
      </div>
    </div>
  </div>
</section>`
    }
  ];

  const promptExamples = [
    {
      category: "Business Website",
      difficulty: "Beginner",
      prompt: "Create a professional consulting company website with services, team bios, client testimonials, and contact form. Use a trustworthy blue and white color scheme.",
      expectedResult: "Modern business site with clean layout, professional imagery, and clear service offerings",
      tokens: 25
    },
    {
      category: "E-commerce Store",
      difficulty: "Intermediate", 
      prompt: "Build an online fashion boutique for women's clothing with product categories, featured items, size guides, customer reviews, and shopping cart. Use elegant pink and black styling with fashion-forward design.",
      expectedResult: "Stylish e-commerce site with product galleries, filtering, and shopping functionality",
      tokens: 35
    },
    {
      category: "Creative Portfolio",
      difficulty: "Beginner",
      prompt: "Design a photographer's portfolio website showcasing wedding, portrait, and landscape photography with image galleries, booking form, and pricing packages. Use a clean, minimal design that highlights the photography.",
      expectedResult: "Image-focused portfolio with galleries, lightbox effects, and booking capabilities",
      tokens: 30
    },
    {
      category: "SaaS Landing Page",
      difficulty: "Advanced",
      prompt: "Create a high-converting landing page for a project management SaaS tool with feature highlights, pricing comparison, customer testimonials, free trial signup, and integration showcase. Use modern gradients and tech-focused design elements.",
      expectedResult: "Conversion-optimized landing page with compelling copy and clear value proposition",
      tokens: 40
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Website Examples
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Explore real websites created with Cyblick AI. See the prompts used, generated code, 
            and learn from successful implementations across different industries.
          </p>
        </div>

        <Tabs defaultValue="showcase" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="showcase">Website Showcase</TabsTrigger>
            <TabsTrigger value="prompts">Prompt Examples</TabsTrigger>
            <TabsTrigger value="code">Code Samples</TabsTrigger>
          </TabsList>

          {/* Website Showcase */}
          <TabsContent value="showcase" className="space-y-8 mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {showcaseWebsites.map((website) => (
                <Card key={website.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Website Preview */}
                  <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Live Preview Coming Soon</p>
                    </div>
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {website.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{website.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{website.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {website.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                        {website.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Generated in</p>
                        <p className="font-semibold text-sm">{website.stats.generated}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Tokens used</p>
                        <p className="font-semibold text-sm">{website.stats.tokens}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Iterations</p>
                        <p className="font-semibold text-sm">{website.stats.iterations}</p>
                      </div>
                    </div>

                    {/* Prompt */}
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-xs font-semibold mb-1">AI Prompt Used:</p>
                      <p className="text-xs text-muted-foreground italic">"{website.prompt}"</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link to="/auth">
                          <Zap className="h-3 w-3 mr-1" />
                          Try Similar
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Code className="h-3 w-3 mr-1" />
                        View Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prompt Examples */}
          <TabsContent value="prompts" className="space-y-6 mt-8">
            <div className="space-y-6">
              {promptExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{example.category}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          example.difficulty === "Beginner" ? "default" :
                          example.difficulty === "Intermediate" ? "secondary" : "destructive"
                        }>
                          {example.difficulty}
                        </Badge>
                        <Badge variant="outline">{example.tokens} tokens</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Prompt:</h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm italic">"{example.prompt}"</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Expected Result:</h4>
                      <p className="text-sm text-muted-foreground">{example.expectedResult}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" asChild>
                        <Link to="/auth">
                          <Play className="h-3 w-3 mr-1" />
                          Try This Prompt
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Copy Prompt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Code Samples */}
          <TabsContent value="code" className="space-y-6 mt-8">
            <div className="space-y-6">
              {codeExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{example.title}</CardTitle>
                        <CardDescription>{example.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{example.language}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Copy Code
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Full Example
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <section className="mt-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Create Your Own?</CardTitle>
              <CardDescription className="max-w-2xl mx-auto">
                Start building amazing websites with AI. Use our examples as inspiration 
                or create something completely unique.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Start Building Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/resources/documentation" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  View Documentation
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Examples;