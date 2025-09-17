import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface TokenUsage {
  id: string;
  action_type: 'generate_website' | 'iterate_website' | 'live_edit' | 'export_website' | 'monthly_refresh' | 'purchase_tokens';
  tokens_used: number;
  tokens_remaining: number;
  website_id?: string;
  metadata?: any;
  created_at: string;
}

export interface UserTokens {
  current_tokens: number;
  total_earned_this_period: number;
  last_token_refresh: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  tokens_per_month: number;
  max_rollover_tokens: number;
  features: any;
}

export interface UserSubscription {
  id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  plan?: SubscriptionPlan;
}

// Token costs for different actions
export const TOKEN_COSTS = {
  generate_website: 25,
  iterate_website: 15,
  live_edit: 5,
  export_website: 10,
} as const;

export const useTokens = () => {
  const { user } = useAuth();
  const [userTokens, setUserTokens] = useState<UserTokens | null>(null);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [tokenUsageHistory, setTokenUsageHistory] = useState<TokenUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load user's current token balance
  const loadUserTokens = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setUserTokens(data);
    } catch (error) {
      console.error('Error loading user tokens:', error);
    }
  }, [user]);

  // Load user's subscription
  const loadUserSubscription = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setUserSubscription(data);
    } catch (error) {
      console.error('Error loading user subscription:', error);
    }
  }, [user]);

  // Load all subscription plans
  const loadSubscriptionPlans = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });

      if (error) throw error;
      setSubscriptionPlans(data);
    } catch (error) {
      console.error('Error loading subscription plans:', error);
    }
  }, []);

  // Load token usage history
  const loadTokenUsageHistory = useCallback(async (limit: number = 50) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('token_usage_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setTokenUsageHistory(data);
    } catch (error) {
      console.error('Error loading token usage history:', error);
    }
  }, [user]);

  // Check if user has enough tokens for an action
  const hasEnoughTokens = useCallback((actionType: keyof typeof TOKEN_COSTS) => {
    if (!userTokens) return false;
    const cost = TOKEN_COSTS[actionType];
    return userTokens.current_tokens >= cost;
  }, [userTokens]);

  // Consume tokens for an action
  const consumeTokens = useCallback(async (
    actionType: keyof typeof TOKEN_COSTS,
    websiteId?: string,
    metadata?: any
  ) => {
    if (!user) {
      toast.error('Please sign in to use tokens');
      return { success: false, error: 'Not authenticated' };
    }

    const tokenCost = TOKEN_COSTS[actionType];
    
    if (!hasEnoughTokens(actionType)) {
      toast.error(`Insufficient tokens. You need ${tokenCost} tokens for this action.`);
      return { 
        success: false, 
        error: 'Insufficient tokens',
        tokens_needed: tokenCost,
        tokens_remaining: userTokens?.current_tokens || 0
      };
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('consume_tokens', {
        p_user_id: user.id,
        p_action_type: actionType,
        p_tokens_to_consume: tokenCost,
        p_website_id: websiteId,
        p_metadata: metadata || {}
      });

      if (error) throw error;

      if (data.success) {
        // Update local token balance
        setUserTokens(prev => prev ? {
          ...prev,
          current_tokens: data.tokens_remaining
        } : null);

        // Refresh usage history
        loadTokenUsageHistory(10);
        
        return {
          success: true,
          tokens_remaining: data.tokens_remaining,
          tokens_consumed: data.tokens_consumed
        };
      } else {
        toast.error(data.error || 'Failed to consume tokens');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error consuming tokens:', error);
      toast.error('Failed to consume tokens');
      return { success: false, error: 'Failed to consume tokens' };
    } finally {
      setIsLoading(false);
    }
  }, [user, hasEnoughTokens, userTokens, loadTokenUsageHistory]);

  // Get token cost for an action
  const getTokenCost = useCallback((actionType: keyof typeof TOKEN_COSTS) => {
    return TOKEN_COSTS[actionType];
  }, []);

  // Format token usage for display
  const formatTokenUsage = useCallback((usage: TokenUsage) => {
    const actionLabels = {
      generate_website: 'Generated Website',
      iterate_website: 'Modified Website', 
      live_edit: 'Live Edit',
      export_website: 'Exported Website',
      monthly_refresh: 'Monthly Tokens',
      purchase_tokens: 'Purchased Tokens'
    };

    return {
      label: actionLabels[usage.action_type] || usage.action_type,
      isRefresh: usage.action_type === 'monthly_refresh' || usage.action_type === 'purchase_tokens',
      tokensChange: usage.action_type === 'monthly_refresh' || usage.action_type === 'purchase_tokens' 
        ? Math.abs(usage.tokens_used) 
        : -usage.tokens_used
    };
  }, []);

  // Calculate days until next refresh
  const getDaysUntilRefresh = useCallback(() => {
    if (!userTokens || !userSubscription) return 0;
    
    const nextRefresh = new Date(userSubscription.current_period_end);
    const now = new Date();
    const diffTime = nextRefresh.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  }, [userTokens, userSubscription]);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadUserTokens();
      loadUserSubscription();
      loadSubscriptionPlans();
      loadTokenUsageHistory(20);
    } else {
      setUserTokens(null);
      setUserSubscription(null);
      setTokenUsageHistory([]);
    }
  }, [user, loadUserTokens, loadUserSubscription, loadSubscriptionPlans, loadTokenUsageHistory]);

  return {
    // Data
    userTokens,
    userSubscription,
    subscriptionPlans,
    tokenUsageHistory,
    isLoading,

    // Actions
    consumeTokens,
    hasEnoughTokens,
    getTokenCost,
    
    // Utilities
    formatTokenUsage,
    getDaysUntilRefresh,
    
    // Reload functions
    loadUserTokens,
    loadUserSubscription,
    loadTokenUsageHistory,
  };
};