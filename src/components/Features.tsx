import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      title: "AI-Powered Generation",
      description: "Simply describe your website in plain English. Our AI creates stunning, responsive websites in seconds, not hours.",
      icon: "🤖"
    },
    {
      title: "Token-Based Pricing",
      description: "Pay only for what you use. No monthly limits, no feature restrictions - just simple, fair token-based pricing.",
      icon: "💰"
    },
    {
      title: "Instant Results",
      description: "Watch your ideas come to life instantly. Generate complete websites with modern designs and clean code in seconds.",
      icon: "⚡"
    },
    {
      title: "Smart Iterations",
      description: "Refine and modify your website by simply describing the changes you want. The AI understands context and updates accordingly.",
      icon: "🎨"
    },
    {
      title: "Export & Deploy",
      description: "Download your websites as HTML, React, or other formats. Deploy anywhere - your hosting, your domain, your control.",
      icon: "🚀"
    },
    {
      title: "Professional Quality",
      description: "Every website is mobile-responsive, SEO-optimized, and follows modern web development best practices.",
      icon: "✨"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose Cyblick?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The smartest way to create professional websites with AI. 
            No coding skills required, no monthly commitments - just results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/auth">Start Building Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;