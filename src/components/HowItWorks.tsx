import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Describe Your Vision",
      description: "Tell Cyblick what kind of website you want in plain English. Our AI understands your requirements and design preferences.",
      icon: "💬"
    },
    {
      step: "02", 
      title: "AI Generates React App",
      description: "Our advanced AI creates a complete React application with TypeScript, Tailwind CSS, and modern components in seconds.",
      icon: "⚡"
    },
    {
      step: "03",
      title: "Refine with Tokens",
      description: "Use tokens to iterate and perfect your website. Each modification costs tokens, giving you full control over your spending.",
      icon: "🎨"
    },
    {
      step: "04",
      title: "Export & Deploy",
      description: "Download your React project or deploy instantly to Vercel, Netlify, or any hosting platform. You own the complete source code.",
      icon: "🚀"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How Cyblick Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From idea to production-ready React application in minutes, not months.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border border-border/50">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden xl:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-primary"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 border border-border/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your Website?</h3>
            <p className="text-muted-foreground mb-6">
              Start with 100 free tokens - enough to create 4 complete websites and see the power of AI-driven development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth" className="inline-block">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Building Free
                </Button>
              </Link>
              <Link to="/pricing" className="inline-block">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;