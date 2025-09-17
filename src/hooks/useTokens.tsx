import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface TokenUsage {
  id: string;
  user_id: string;
  action_type: string;
  tokens_used: number;
  tokens_remaining: number;
  website_id?: string;
  metadata?: any;
  created_at: string;
}

export interface UserTokens {
  id: string;
  user_id: string;
  current_tokens: number;
  total_earned_this_period: number;
  last_token_refresh: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  tokens_per_month: number;
  max_rollover_tokens: number;
  features?: any;
  is_active?: boolean;
  created_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export const TOKEN_COSTS = {
  generate_website: 25,
  iterate_website: 15,
  export_website: 5,
  analyze_website: 10,
} as const;

export const useTokens = () => {
  const { user } = useAuth();
  const [userTokens, setUserTokens] = useState<UserTokens>({
    id: '1',
    user_id: user?.id || '',
    current_tokens: 75,
    total_earned_this_period: 100,
    last_token_refresh: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    id: '1',
    user_id: user?.id || '',
    plan_id: 'free',
    status: 'active',
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancel_at_period_end: false,
    stripe_customer_id: null,
    stripe_subscription_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  const [subscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: 'free',
      name: 'Free',
      price_monthly: 0,
      price_yearly: 0,
      tokens_per_month: 100,
      max_rollover_tokens: 200,
      features: { websites: 5, support: 'community' },
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'pro',
      name: 'Pro',
      price_monthly: 19,
      price_yearly: 190,
      tokens_per_month: 1000,
      max_rollover_tokens: 2000,
      features: { websites: 'unlimited', support: 'priority' },
      is_active: true,
      created_at: new Date().toISOString()
    }
  ]);

  const [tokenUsageHistory] = useState<TokenUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasEnoughTokens = (actionType: keyof typeof TOKEN_COSTS): boolean => {
    const cost = TOKEN_COSTS[actionType];
    return userTokens.current_tokens >= cost;
  };

  const consumeTokens = async (
    actionType: keyof typeof TOKEN_COSTS,
    websiteId?: string,
    metadata?: any
  ) => {
    const cost = TOKEN_COSTS[actionType];
    
    if (userTokens.current_tokens < cost) {
      return {
        success: false,
        error: 'Insufficient tokens',
        tokens_remaining: userTokens.current_tokens
      };
    }

    setUserTokens(prev => ({
      ...prev,
      current_tokens: prev.current_tokens - cost
    }));

    return {
      success: true,
      tokens_remaining: userTokens.current_tokens - cost,
      tokens_consumed: cost
    };
  };

  const getTokenCost = (actionType: keyof typeof TOKEN_COSTS): number => {
    return TOKEN_COSTS[actionType];
  };

  const formatTokenUsage = (usage: TokenUsage): string => {
    const action = usage.action_type.replace('_', ' ').toLowerCase();
    const sign = usage.tokens_used > 0 ? '-' : '+';
    return `${sign}${Math.abs(usage.tokens_used)} ${action}`;
  };

  const getDaysUntilRefresh = (): number => {
    const endDate = new Date(userSubscription.current_period_end);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const loadUserTokens = useCallback(async () => {}, []);
  const loadUserSubscription = useCallback(async () => {}, []);
  const loadSubscriptionPlans = useCallback(async () => {}, []);
  const loadTokenUsageHistory = useCallback(async () => {}, []);

  useEffect(() => {
    if (user) {
      setUserTokens(prev => ({ ...prev, user_id: user.id }));
      setUserSubscription(prev => ({ ...prev, user_id: user.id }));
    }
  }, [user]);

  return {
    userTokens,
    userSubscription,
    subscriptionPlans,
    tokenUsageHistory,
    isLoading,
    hasEnoughTokens,
    consumeTokens,
    getTokenCost,
    formatTokenUsage,
    getDaysUntilRefresh,
    loadUserTokens,
    loadUserSubscription,
    loadSubscriptionPlans,
    loadTokenUsageHistory,
  };
};