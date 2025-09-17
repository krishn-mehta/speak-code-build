import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      tokens: "100 tokens",
      description: "Perfect for trying out AI website generation",
      features: [
        "100 tokens per month",
        "~4 websites per month",
        "All AI features included",
        "Responsive designs",
        "Basic export (HTML)",
        "Community support"
      ],
      cta: "Start Free",
      popular: false,
      href: "/auth"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      tokens: "500 tokens",
      description: "Ideal for freelancers and small businesses",
      features: [
        "500 tokens per month",
        "~20 websites per month",
        "All AI features included",
        "Priority generation",
        "Multiple export formats",
        "Custom domains",
        "Email support"
      ],
      cta: "Start Pro",
      popular: true,
      href: "/pricing"
    },
    {
      name: "Premium",
      price: "$24.99",
      period: "/month",
      tokens: "1,500 tokens",
      description: "Perfect for agencies and growing teams",
      features: [
        "1,500 tokens per month",
        "~60 websites per month",
        "Team collaboration",
        "Priority support",
        "Advanced analytics",
        "Version history",
        "White-label options"
      ],
      cta: "Start Premium",
      popular: false,
      href: "/pricing"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Simple, Token-Based Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pay only for what you use. All plans include the same powerful AI features - 
            you just get more tokens to create more websites.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-primary bg-gradient-subtle ring-2 ring-primary/20' : 'border-border/50'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <div className="text-sm font-medium text-primary">
                  {plan.tokens}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </div>
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild
                variant={plan.popular ? "default" : "outline"} 
                className="w-full" 
                size="lg"
              >
                <Link to={plan.href}>{plan.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need more? Check out our Enterprise plan with 10,000+ tokens
          </p>
          <Button asChild variant="outline">
            <Link to="/pricing">View All Plans</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;