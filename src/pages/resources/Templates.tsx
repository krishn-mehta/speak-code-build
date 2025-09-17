import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Globe, Briefcase, ShoppingCart, Camera, Utensils, Heart, Users, ExternalLink, Crown, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Templates = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const templateCategories = [
    {
      name: "Business",
      icon: Briefcase,
      count: 12,
      description: "Professional websites for businesses and services"
    },
    {
      name: "Portfolio",
      icon: Camera,
      count: 8,
      description: "Showcase your work and creative projects"
    },
    {
      name: "E-commerce",
      icon: ShoppingCart,
      count: 6,
      description: "Online stores and product catalogs"
    },
    {
      name: "Landing Page",
      icon: Globe,
      count: 15,
      description: "High-converting marketing and campaign pages"
    },
    {
      name: "Restaurant",
      icon: Utensils,
      count: 4,
      description: "Menus, reservations, and dining experiences"
    },
    {
      name: "Non-Profit",
      icon: Heart,
      count: 3,
      description: "Charity, community, and cause websites"
    }
  ];

  const featuredTemplates = [
    {
      id: 1,
      name: "Modern Agency",
      category: "Business",
      description: "Clean, professional design perfect for digital agencies",
      image: "/api/placeholder/400/300",
      tags: ["Modern", "Professional", "Responsive"],
      isPremium: false,
      prompt: "Create a modern digital agency website with a hero section featuring our services, team member profiles, client testimonials, and a contact form. Use a clean blue and white color scheme with professional typography."
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "Portfolio",
      description: "Artistic layout to showcase creative work beautifully",
      image: "/api/placeholder/400/300",
      tags: ["Creative", "Artistic", "Gallery"],
      isPremium: true,
      prompt: "Design a creative portfolio website for a graphic designer with a bold hero section, project gallery with hover effects, about section, and contact information. Use a modern color palette with creative typography and artistic layouts."
    },
    {
      id: 3,
      name: "SaaS Landing",
      category: "Landing Page",
      description: "High-converting landing page for SaaS products",
      image: "/api/placeholder/400/300",
      tags: ["SaaS", "Conversion", "Features"],
      isPremium: false,
      prompt: "Build a high-converting SaaS landing page with a compelling hero section, feature highlights, pricing tiers, customer testimonials, and signup form. Use a tech-focused design with gradients and modern UI elements."
    },
    {
      id: 4,
      name: "E-commerce Store",
      category: "E-commerce",
      description: "Complete online store with product showcase",
      image: "/api/placeholder/400/300",
      tags: ["E-commerce", "Products", "Shopping"],
      isPremium: true,
      prompt: "Create an e-commerce website for fashion products with a hero banner, featured products grid, categories navigation, product details pages, and shopping cart. Use an elegant design with product-focused layouts."
    },
    {
      id: 5,
      name: "Restaurant Deluxe",
      category: "Restaurant",
      description: "Elegant restaurant website with menu and reservations",
      image: "/api/placeholder/400/300",
      tags: ["Restaurant", "Menu", "Reservations"],
      isPremium: false,
      prompt: "Design an elegant restaurant website with a stunning hero image, menu showcase, chef's special section, reservation form, and location details. Use warm colors and food-focused imagery with elegant typography."
    },
    {
      id: 6,
      name: "Charity Foundation",
      category: "Non-Profit",
      description: "Inspiring non-profit website for donations and awareness",
      image: "/api/placeholder/400/300",
      tags: ["Non-Profit", "Donations", "Cause"],
      isPremium: false,
      prompt: "Create an inspiring charity website with a mission statement hero, donation forms, volunteer opportunities, success stories, and impact metrics. Use compassionate colors and imagery that conveys trust and hope."
    }
  ];

  const copyPrompt = (prompt: string, templateId: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(templateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            Website Templates
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Get inspired by our curated collection of AI-generated website templates. 
            Use these prompts to create similar websites or as starting points for your own ideas.
          </p>
        </div>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Template Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {templateCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {category.name}
                    <Badge variant="secondary">{category.count}</Badge>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Templates */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Templates</h2>
            <Button variant="outline" asChild>
              <Link to="/auth" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Try Templates
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all group">
                {/* Template Preview Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {template.isPremium && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Preview Coming Soon</p>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <Button size="sm" asChild className="w-full">
                      <Link to="/auth" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Use This Template
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => copyPrompt(template.prompt, template.id)}
                    >
                      {copiedId === template.id ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Prompt
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Hidden prompt for copying */}
                  <div className="hidden">
                    {template.prompt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Use Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">How to Use Templates</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <CardTitle className="text-lg">Browse Templates</CardTitle>
                <CardDescription>
                  Explore our collection and find a design that matches your vision
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <CardTitle className="text-lg">Copy Prompt</CardTitle>
                <CardDescription>
                  Copy the template's AI prompt or customize it with your details
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <CardTitle className="text-lg">Generate Website</CardTitle>
                <CardDescription>
                  Paste the prompt in Cyblick and let AI create your website
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">4</span>
                </div>
                <CardTitle className="text-lg">Customize</CardTitle>
                <CardDescription>
                  Iterate and refine your website until it's perfect
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Template Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Template Customization Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Personalizing Templates</CardTitle>
                <CardDescription>Make templates your own with these tips</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Replace Placeholder Content</p>
                    <p className="text-sm text-muted-foreground">Substitute example text with your actual business information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Adjust Colors & Branding</p>
                    <p className="text-sm text-muted-foreground">Specify your brand colors, fonts, and visual identity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Add/Remove Sections</p>
                    <p className="text-sm text-muted-foreground">Customize sections to match your specific needs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prompt Modification</CardTitle>
                <CardDescription>How to adapt template prompts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Change Industry Focus</p>
                    <p className="text-sm text-muted-foreground">Modify prompts to match your specific industry or niche</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Adjust Tone & Style</p>
                    <p className="text-sm text-muted-foreground">Request formal, casual, playful, or professional tones</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Specify Target Audience</p>
                    <p className="text-sm text-muted-foreground">Tailor content and design for your specific audience</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Custom Template Request */}
        <section>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Need a Custom Template?</CardTitle>
              <CardDescription className="max-w-2xl mx-auto">
                Don't see a template that fits your needs? Our AI can create websites for any industry or purpose. 
                Start with a custom prompt or request a specific template category.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Create Custom Website
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support/contact" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Request Template Category
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

export default Templates;