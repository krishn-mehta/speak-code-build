import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, ArrowRight, ArrowLeft, Sparkles, MessageCircle, Globe, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

export const WelcomeTour = ({ isOpen, onClose, onComplete }: WelcomeTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps: TourStep[] = [
    {
      id: "welcome",
      title: "Welcome to Your AI Website Builder!",
      description: "Let's take a quick tour to get you started",
      icon: Sparkles,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <p className="text-muted-foreground">
            Build professional websites in seconds using the power of AI. 
            No coding required - just describe what you want and watch it come to life!
          </p>
        </div>
      )
    },
    {
      id: "chat",
      title: "Start with a Conversation",
      description: "Tell me about the website you want to create",
      icon: MessageCircle,
      content: (
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">Try saying:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• "Create a portfolio website for a photographer"</li>
              <li>• "Build a landing page for my SaaS product"</li>
              <li>• "Design a business site for a restaurant"</li>
              <li>• "Make a personal blog with dark theme"</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            The more specific you are, the better your website will be!
          </p>
        </div>
      )
    },
    {
      id: "templates",
      title: "Quick Start Templates",
      description: "Or choose from our pre-made templates",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg text-center">
              <h4 className="font-semibold text-sm">Portfolio</h4>
              <p className="text-xs text-muted-foreground">Showcase your work</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg text-center">
              <h4 className="font-semibold text-sm">Business</h4>
              <p className="text-xs text-muted-foreground">Professional sites</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg text-center">
              <h4 className="font-semibold text-sm">Landing</h4>
              <p className="text-xs text-muted-foreground">Product launches</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-lg text-center">
              <h4 className="font-semibold text-sm">Custom</h4>
              <p className="text-xs text-muted-foreground">Your unique idea</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Each template is fully customizable and mobile-responsive!
          </p>
        </div>
      )
    },
    {
      id: "iterate",
      title: "Refine & Perfect",
      description: "Easily modify your websites with simple requests",
      icon: Wand2,
      content: (
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">Make changes like:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• "Make it more colorful"</li>
              <li>• "Add a contact form"</li>
              <li>• "Change to a dark theme"</li>
              <li>• "Make the header sticky"</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Your website will be updated instantly with AI-powered modifications!
          </p>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / tourSteps.length) * 100;
  const currentStepData = tourSteps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {tourSteps.length}
              </span>
              <Badge variant="outline" className="text-xs">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="min-h-[200px]">
            {currentStepData.content}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              Skip Tour
            </Button>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              
              <Button size="sm" onClick={handleNext}>
                {currentStep < tourSteps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Get Started
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};