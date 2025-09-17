import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { useTokens } from '@/hooks/useTokens';
import { Coins, Zap, Calendar, TrendingUp, Info, Crown } from 'lucide-react';

export const TokenDisplay = () => {
  const { 
    userTokens, 
    userSubscription, 
    subscriptionPlans, 
    tokenUsageHistory,
    getDaysUntilRefresh 
  } = useTokens();
  const [showDetails, setShowDetails] = useState(false);

  if (!userTokens || !userSubscription) {
    // Show a simple loading state without errors
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
        <Coins className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">—</span>
      </div>
    );
  }

  const currentPlan = subscriptionPlans.find(plan => plan.id === userSubscription.plan_id);
  const tokenPercentage = currentPlan ? (userTokens.current_tokens / currentPlan.max_rollover_tokens) * 100 : 0;
  const daysUntilRefresh = getDaysUntilRefresh();

  // Get color based on token level
  const getTokenColor = () => {
    if (tokenPercentage >= 50) return 'text-green-600';
    if (tokenPercentage >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTokenBgColor = () => {
    if (tokenPercentage >= 50) return 'bg-green-100';
    if (tokenPercentage >= 25) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Dialog open={showDetails} onOpenChange={setShowDetails}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 hover:shadow-sm h-8 px-3">
          <div className={`flex items-center gap-2 ${getTokenColor()}`}>
            <Coins className="h-3 h-3" />
            <span className="font-medium text-sm">{userTokens?.current_tokens || 0}</span>
          </div>
          <Badge variant="secondary" className="text-xs px-1.5 py-0">
            {currentPlan?.name || 'Free'}
          </Badge>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Token Balance
          </DialogTitle>
          <DialogDescription>
            Manage your token usage and subscription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Balance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Current Balance</span>
                <span className={`text-2xl font-bold ${getTokenColor()}`}>
                  {userTokens.current_tokens}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usage Progress</span>
                  <span className="text-muted-foreground">
                    {Math.round(tokenPercentage)}% remaining
                  </span>
                </div>
                <Progress value={tokenPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Plan</div>
                  <div className="font-medium">{currentPlan?.name}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Next Refresh</div>
                  <div className="font-medium">{daysUntilRefresh} days</div>
                </div>
              </div>

              {currentPlan && (
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Allowance</span>
                    <span className="font-medium">{currentPlan.tokens_per_month} tokens</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Rollover</span>
                    <span className="font-medium">{currentPlan.max_rollover_tokens} tokens</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Token Costs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4" />
                Token Costs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Generate Website</span>
                  <span className="font-medium">25 tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modify Website</span>
                  <span className="font-medium">15 tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Live Edit</span>
                  <span className="font-medium">5 tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Export Website</span>
                  <span className="font-medium">10 tokens</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Usage */}
          {tokenUsageHistory.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Recent Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tokenUsageHistory.slice(0, 5).map((usage) => {
                    const formatted = {
                      label: {
                        generate_website: 'Generated Website',
                        iterate_website: 'Modified Website',
                        live_edit: 'Live Edit',
                        export_website: 'Exported Website',
                        monthly_refresh: 'Monthly Refresh',
                        purchase_tokens: 'Token Purchase'
                      }[usage.action_type] || usage.action_type,
                      isRefresh: ['monthly_refresh', 'purchase_tokens'].includes(usage.action_type)
                    };

                    return (
                      <div key={usage.id} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{formatted.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${formatted.isRefresh ? 'text-green-600' : 'text-red-600'}`}>
                            {formatted.isRefresh ? '+' : '-'}{Math.abs(usage.tokens_used)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(usage.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upgrade CTA */}
          {userSubscription.plan_id === 'free' && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Crown className="h-4 w-4 text-primary" />
                  Upgrade Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get more tokens and unlock premium features
                </p>
                <Button className="w-full" size="sm">
                  View Plans
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Low Balance Warning */}
          {tokenPercentage < 25 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-orange-800">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">Running Low on Tokens</span>
                </div>
                <p className="text-xs text-orange-700 mt-1">
                  Consider upgrading your plan or wait {daysUntilRefresh} days for your next refresh.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};