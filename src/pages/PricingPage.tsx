import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubscriptionPlans } from '@/components/tokens/SubscriptionPlans';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft } from 'lucide-react';

const PricingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(user ? "/dashboard" : "/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Choose Your Cyblick Plan
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Token-Based Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pay only for what you use with Cyblick's transparent token system. All plans include the same powerful AI website generation features - 
            you just get more tokens to create more websites.
          </p>
        </div>

        <SubscriptionPlans />

        {/* Token Usage Explanation */}
        <Card className="mt-16 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">How Tokens Work</CardTitle>
            <CardDescription className="text-center">
              Understanding your token usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Token Costs</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Generate new website</span>
                    <Badge variant="outline">25 tokens</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Modify existing website</span>
                    <Badge variant="outline">15 tokens</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Live code editing</span>
                    <Badge variant="outline">5 tokens</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Export website</span>
                    <Badge variant="outline">10 tokens</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Token Features</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tokens refresh monthly on your billing date</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Unused tokens roll over up to your plan's limit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>No website limits - create as many as your tokens allow</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>All features available on every plan</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
                Changes take effect at your next billing cycle.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">What happens if I run out of tokens?</h4>
              <p className="text-muted-foreground text-sm">
                You'll need to wait until your next monthly refresh or upgrade to a higher plan. 
                Your existing websites remain accessible - you just can't create new ones.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Do tokens expire?</h4>
              <p className="text-muted-foreground text-sm">
                Tokens roll over each month up to your plan's maximum. For example, Pro plan users 
                can accumulate up to 1,000 tokens total.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! Every new account starts with 100 free tokens. No credit card required to get started.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;