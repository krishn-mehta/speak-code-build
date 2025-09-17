import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-subtle min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Build Websites with AI in Seconds
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Just describe your vision and watch AI create stunning, responsive websites instantly. 
                Pay only for what you use with our simple token system.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/app">Start Free - 100 Tokens</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>100 free tokens to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Generate ~4 websites free</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
            <img 
              src={heroImage} 
              alt="Cyblick AI Website Builder Dashboard" 
              className="relative z-10 rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;