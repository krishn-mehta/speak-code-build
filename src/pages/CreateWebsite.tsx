import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useWebsites } from "@/hooks/useWebsites";
import { useTokens } from "@/hooks/useTokens";
import { ArrowLeft, Sparkles, Globe, Palette, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateWebsite = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const { generateWebsite } = useWebsites();
  const { hasEnoughTokens } = useTokens();
  
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    websiteType: "",
    style: "",
    features: [] as string[],
  });

  const websiteTypes = [
    { value: "business", label: "Business Website" },
    { value: "portfolio", label: "Portfolio" },
    { value: "blog", label: "Blog" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "landing", label: "Landing Page" },
    { value: "restaurant", label: "Restaurant" },
    { value: "nonprofit", label: "Non-profit" },
    { value: "other", label: "Other" },
  ];

  const styleOptions = [
    { value: "modern", label: "Modern & Clean" },
    { value: "creative", label: "Creative & Artistic" },
    { value: "professional", label: "Professional & Corporate" },
    { value: "minimalist", label: "Minimalist" },
    { value: "bold", label: "Bold & Colorful" },
    { value: "elegant", label: "Elegant & Sophisticated" },
  ];

  const featureOptions = [
    "Contact Form",
    "Image Gallery",
    "Blog Section",
    "Newsletter Signup",
    "Social Media Links",
    "Testimonials",
    "Team Section",
    "Services/Products",
    "FAQ Section",
    "Pricing Tables",
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectName.trim() || !formData.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a project name and description.",
        variant: "destructive",
      });
      return;
    }

    if (!hasEnoughTokens('generate_website')) {
      toast({
        title: "Insufficient Tokens",
        description: "You don't have enough tokens to generate a website. Please upgrade your plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Create detailed prompt from form data
      let prompt = `Create a ${formData.websiteType || 'custom'} website called "${formData.projectName}". ${formData.description}`;
      
      if (formData.style) {
        prompt += ` The design should be ${formData.style}.`;
      }
      
      if (formData.features.length > 0) {
        prompt += ` Include these features: ${formData.features.join(', ')}.`;
      }
      
      // Generate the website
      const website = await generateWebsite('', prompt, formData.websiteType || 'custom', formData.projectName);
      
      if (website) {
        toast({
          title: "Website Generated!",
          description: "Your website has been created successfully. Redirecting to editor...",
        });
        
        // Navigate to the project editor
        navigate(`/dashboard/project/${website.id}`);
      } else {
        throw new Error('Failed to generate website');
      }
      
    } catch (error) {
      console.error('Error generating website:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Create New Website
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">AI Website Builder</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Describe your vision and let AI create your perfect website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Project Details
              </CardTitle>
              <CardDescription>
                Tell us about your website project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="My Awesome Website"
                  value={formData.projectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Describe Your Website *</Label>
                <Textarea
                  id="description"
                  placeholder="I want to create a website for my photography business. It should showcase my portfolio, have an about page, and allow clients to contact me for bookings..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Be as detailed as possible. The more information you provide, the better your website will be.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="websiteType">Website Type</Label>
                  <Select value={formData.websiteType} onValueChange={(value) => setFormData(prev => ({ ...prev, websiteType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent>
                      {websiteTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Design Style</Label>
                  <Select value={formData.style} onValueChange={(value) => setFormData(prev => ({ ...prev, style: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select design style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map(style => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Features & Components
              </CardTitle>
              <CardDescription>
                Select features you'd like to include (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {featureOptions.map(feature => (
                  <div
                    key={feature}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      formData.features.includes(feature)
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              disabled={loading}
              className="min-w-[200px]"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Create Website
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateWebsite;