import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useTokens } from "@/hooks/useTokens";
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Check, 
  Star,
  Zap,
  Globe,
  Users,
  Shield,
  Clock,
  ArrowRight,
  AlertCircle
} from "lucide-react";

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out Cyblick",
    price: { monthly: 0, yearly: 0 },
    tokens: 100,
    maxRollover: 200,
    features: [
      "100 tokens per month",
      "Basic website generation",
      "HTML export",
      "Community support",
      "5 projects"
    ],
    limitations: [
      "No custom domains",
      "Cyblick branding",
      "Basic templates only"
    ],
    popular: false,
    current: true
  },
  {
    id: "pro",
    name: "Pro",
    description: "Great for small businesses",
    price: { monthly: 9.99, yearly: 99.90 },
    tokens: 500,
    maxRollover: 1000,
    features: [
      "500 tokens per month",
      "Advanced website generation",
      "HTML, React, Next.js exports",
      "Priority generation",
      "Email support",
      "Unlimited projects",
      "Custom domains",
      "Remove Cyblick branding",
      "Premium templates"
    ],
    limitations: [],
    popular: true,
    current: false
  },
  {
    id: "premium",
    name: "Premium",
    description: "Perfect for agencies and teams",
    price: { monthly: 24.99, yearly: 249.90 },
    tokens: 1500,
    maxRollover: 3000,
    features: [
      "1,500 tokens per month",
      "Team collaboration",
      "All export formats",
      "Priority support",
      "Unlimited projects",
      "Custom domains",
      "White-label option",
      "Advanced analytics",
      "API access"
    ],
    limitations: [],
    popular: false,
    current: false
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: { monthly: 99.99, yearly: 999.90 },
    tokens: 10000,
    maxRollover: 20000,
    features: [
      "10,000 tokens per month",
      "Unlimited team members",
      "Dedicated support",
      "Custom integrations",
      "On-premise deployment",
      "SLA guarantee",
      "Training & onboarding",
      "Custom branding"
    ],
    limitations: [],
    popular: false,
    current: false
  }
];

const usageHistory = [
  { date: "2024-01-15", action: "Website Generated", tokens: -25, remaining: 75 },
  { date: "2024-01-14", action: "Website Iteration", tokens: -15, remaining: 100 },
  { date: "2024-01-13", action: "Export to React", tokens: -10, remaining: 115 },
  { date: "2024-01-12", action: "Website Generated", tokens: -25, remaining: 125 },
  { date: "2024-01-01", action: "Monthly Refresh", tokens: +100, remaining: 150 }
];

export const BillingPage = () => {
  const { userTokens, userSubscription } = useTokens();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const currentPlanData = pricingPlans.find(p => p.current) || pricingPlans[0];
  const tokenUsagePercentage = ((currentPlanData.tokens - (userTokens?.current_tokens || 0)) / currentPlanData.tokens) * 100;

  return (
    <div className="space-y-6">
      {/* Current Plan Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{currentPlanData.name}</span>
              <Badge variant={userSubscription?.plan_id === "free" ? "secondary" : "default"}>
                {userSubscription?.plan_id || "Free"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              ${currentPlanData.price[billingCycle]}/{billingCycle === "monthly" ? "month" : "year"}
            </p>
            {userSubscription?.plan_id !== "free" && (
              <div className="mt-4 text-xs text-gray-500">
                Next billing: January 15, 2024
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Token Balance</CardTitle>
            <CardDescription>Current available tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-blue-600">{userTokens?.current_tokens || 0}</span>
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <Progress value={((userTokens?.current_tokens || 0) / currentPlanData.tokens) * 100} className="mb-2" />
            <p className="text-sm text-gray-600">
              of {currentPlanData.tokens} monthly tokens
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Usage This Month</CardTitle>
            <CardDescription>Tokens consumed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-purple-600">
                {currentPlanData.tokens - (userTokens?.current_tokens || 0)}
              </span>
              <Globe className="w-6 h-6 text-purple-500" />
            </div>
            <Progress value={tokenUsagePercentage} className="mb-2" />
            <p className="text-sm text-gray-600">
              {tokenUsagePercentage.toFixed(1)}% of monthly limit
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Upgrade Plans</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
          <TabsTrigger value="billing">Billing Info</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-lg p-4">
            <span className={billingCycle === "monthly" ? "font-medium" : "text-gray-500"}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === "yearly"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
            />
            <span className={billingCycle === "yearly" ? "font-medium" : "text-gray-500"}>
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge className="bg-green-100 text-green-800">Save 20%</Badge>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.current && (
                      <Badge variant="outline">Current</Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-gray-500">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Zap className="w-4 h-4 mr-2 text-blue-500" />
                      {plan.tokens.toLocaleString()} tokens/month
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Max rollover: {plan.maxRollover.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 border-t pt-2">
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-500">
                          <AlertCircle className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                          {limitation}
                        </div>
                      ))}
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise CTA */}
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Need something custom?</h3>
              <p className="text-gray-300 mb-6">
                Contact our sales team for custom pricing, dedicated support, and enterprise features.
              </p>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Contact Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage History Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Token Usage History</CardTitle>
                  <CardDescription>Detailed breakdown of your token consumption</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        entry.tokens > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{entry.action}</p>
                        <p className="text-sm text-gray-500">{entry.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        entry.tokens > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {entry.tokens > 0 ? '+' : ''}{entry.tokens} tokens
                      </p>
                      <p className="text-sm text-gray-500">
                        {entry.remaining} remaining
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Info Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <Button className="w-full" variant="outline">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
                <CardDescription>Your billing information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">John Doe</p>
                  <p>123 Main Street</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Edit Address
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your payment history and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Jan 1, 2024", amount: "$9.99", status: "Paid", invoice: "INV-001" },
                  { date: "Dec 1, 2023", amount: "$9.99", status: "Paid", invoice: "INV-002" },
                  { date: "Nov 1, 2023", amount: "$9.99", status: "Paid", invoice: "INV-003" }
                ].map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{bill.date}</p>
                        <p className="text-sm text-gray-500">{bill.invoice}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{bill.amount}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {bill.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};