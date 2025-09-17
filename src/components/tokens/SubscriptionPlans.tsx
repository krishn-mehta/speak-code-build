import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useTokens } from '@/hooks/useTokens';
import { Check, Crown, Zap, Star } from 'lucide-react';

export const SubscriptionPlans = () => {
  const { subscriptionPlans, userSubscription } = useTokens();
  const [isYearly, setIsYearly] = useState(false);

  // Fallback static plans if database isn't set up yet
  const staticPlans = [
    {
      id: 'free',
      name: 'Free',
      price_monthly: 0,
      price_yearly: 0,
      tokens_per_month: 100,
      max_rollover_tokens: 200,
      features: {}
    },
    {
      id: 'pro',
      name: 'Pro',
      price_monthly: 9.99,
      price_yearly: 99.90,
      tokens_per_month: 500,
      max_rollover_tokens: 1000,
      features: {}
    },
    {
      id: 'premium',
      name: 'Premium',
      price_monthly: 24.99,
      price_yearly: 249.90,
      tokens_per_month: 1500,
      max_rollover_tokens: 3000,
      features: {}
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price_monthly: 99.99,
      price_yearly: 999.90,
      tokens_per_month: 10000,
      max_rollover_tokens: 20000,
      features: {}
    }
  ];

  // Use database plans if available, otherwise use static plans
  const plansToShow = subscriptionPlans.length > 0 ? subscriptionPlans : staticPlans;

  const handleUpgrade = async (planId: string) => {
    // TODO: Implement Stripe checkout
    console.log('Upgrading to plan:', planId);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return <Zap className="h-5 w-5" />;
      case 'pro': return <Star className="h-5 w-5" />;
      case 'premium': return <Crown className="h-5 w-5" />;
      case 'enterprise': return <Crown className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free': return 'text-gray-600';
      case 'pro': return 'text-blue-600';
      case 'premium': return 'text-purple-600';
      case 'enterprise': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getPlanBorder = (planId: string) => {
    switch (planId) {
      case 'pro': return 'border-blue-200 shadow-blue-50';
      case 'premium': return 'border-purple-200 shadow-purple-50 ring-2 ring-purple-100';
      case 'enterprise': return 'border-orange-200 shadow-orange-50';
      default: return 'border-gray-200';
    }
  };

  const getPlanFeatures = (features: any) => {
    const baseFeatures = [
      'AI Website Generation',
      'Responsive Design',
      'Basic Templates',
      'Community Support'
    ];

    const proFeatures = [
      'Priority AI Generation',
      'Advanced Export Formats',
      'Email Support',
      'Custom Domain'
    ];

    const premiumFeatures = [
      'Team Collaboration',
      'Version History',
      'Priority Support',
      'Advanced Analytics'
    ];

    const enterpriseFeatures = [
      'API Access',
      'White Label',
      'Dedicated Support',
      'Custom Integrations'
    ];

    return {
      free: baseFeatures,
      pro: [...baseFeatures, ...proFeatures],
      premium: [...baseFeatures, ...proFeatures, ...premiumFeatures],
      enterprise: [...baseFeatures, ...proFeatures, ...premiumFeatures, ...enterpriseFeatures]
    };
  };

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm ${!isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
          Monthly
        </span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <span className={`text-sm ${isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
          Yearly
        </span>
        {isYearly && (
          <Badge variant="secondary" className="ml-2 text-xs">
            Save 17%
          </Badge>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plansToShow.map((plan) => {
          const isCurrentPlan = userSubscription?.plan_id === plan.id;
          const price = isYearly ? plan.price_yearly : plan.price_monthly;
          const features = getPlanFeatures(plan.features)[plan.id as keyof ReturnType<typeof getPlanFeatures>] || [];
          const isPopular = plan.id === 'premium';

          return (
            <Card
              key={plan.id}
              className={`relative ${getPlanBorder(plan.id)} ${isPopular ? 'scale-105' : ''}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-2 ${getPlanColor(plan.id)}`}>
                  {getPlanIcon(plan.id)}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  Perfect for {
                    plan.id === 'free' ? 'getting started' :
                    plan.id === 'pro' ? 'small businesses' :
                    plan.id === 'premium' ? 'growing teams' :
                    'large organizations'
                  }
                </CardDescription>
                
                <div className="pt-4">
                  <div className="text-3xl font-bold">
                    ${price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && price > 0 && (
                    <div className="text-xs text-muted-foreground">
                      ${(price / 12).toFixed(2)}/month billed yearly
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Token Information */}
                <div className="text-center py-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">
                    {plan.tokens_per_month.toLocaleString()} tokens
                  </div>
                  <div className="text-xs text-muted-foreground">
                    per month • {plan.max_rollover_tokens.toLocaleString()} max rollover
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                  {features.length > 6 && (
                    <div className="text-xs text-muted-foreground">
                      + {features.length - 6} more features
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  {isCurrentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.id === 'free' ? 'outline' : 'default'}
                      onClick={() => handleUpgrade(plan.id)}
                    >
                      {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ or Additional Info */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <p>All plans include unlimited websites and exports</p>
        <p>Cancel or change plans anytime • No hidden fees</p>
      </div>
    </div>
  );
};