-- Token System Implementation
-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_yearly DECIMAL(10,2) NOT NULL DEFAULT 0,
  tokens_per_month INTEGER NOT NULL,
  max_rollover_tokens INTEGER NOT NULL,
  features JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (id, name, price_monthly, price_yearly, tokens_per_month, max_rollover_tokens, features) VALUES
('free', 'Free', 0.00, 0.00, 100, 200, '{"export_formats": ["html"], "support": "community", "custom_domain": false}'),
('pro', 'Pro', 9.99, 99.90, 500, 1000, '{"export_formats": ["html", "react", "nextjs"], "support": "email", "custom_domain": true, "priority_generation": true}'),
('premium', 'Premium', 24.99, 249.90, 1500, 3000, '{"export_formats": ["html", "react", "nextjs", "wordpress"], "support": "priority", "custom_domain": true, "priority_generation": true, "team_collaboration": true}'),
('enterprise', 'Enterprise', 99.99, 999.90, 10000, 20000, '{"export_formats": ["all"], "support": "dedicated", "custom_domain": true, "priority_generation": true, "team_collaboration": true, "api_access": true, "white_label": true}');

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid', 'trialing')),
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '1 month'),
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create user tokens table for tracking current token balance
CREATE TABLE public.user_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_tokens INTEGER NOT NULL DEFAULT 100,
  total_earned_this_period INTEGER NOT NULL DEFAULT 100,
  last_token_refresh TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create token usage history table
CREATE TABLE public.token_usage_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('generate_website', 'iterate_website', 'live_edit', 'export_website', 'monthly_refresh', 'purchase_tokens')),
  tokens_used INTEGER NOT NULL,
  tokens_remaining INTEGER NOT NULL,
  website_id UUID REFERENCES public.generated_websites(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_usage_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_plans (readable by everyone)
CREATE POLICY "Subscription plans are viewable by everyone" 
ON public.subscription_plans 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription" 
ON public.user_subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
ON public.user_subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage subscriptions" 
ON public.user_subscriptions 
FOR ALL 
USING (auth.role() = 'service_role');

-- RLS Policies for user_tokens  
CREATE POLICY "Users can view their own tokens" 
ON public.user_tokens 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens" 
ON public.user_tokens 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage tokens" 
ON public.user_tokens 
FOR ALL 
USING (auth.role() = 'service_role');

-- RLS Policies for token_usage_history
CREATE POLICY "Users can view their own token usage history" 
ON public.token_usage_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create token usage records" 
ON public.token_usage_history 
FOR INSERT 
WITH CHECK (true);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_tokens_updated_at
BEFORE UPDATE ON public.user_tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_stripe_subscription_id ON public.user_subscriptions(stripe_subscription_id);

CREATE INDEX idx_user_tokens_user_id ON public.user_tokens(user_id);

CREATE INDEX idx_token_usage_history_user_id ON public.token_usage_history(user_id);
CREATE INDEX idx_token_usage_history_action_type ON public.token_usage_history(action_type);
CREATE INDEX idx_token_usage_history_created_at ON public.token_usage_history(created_at);

-- Function to initialize user tokens when a new user signs up
CREATE OR REPLACE FUNCTION public.initialize_user_tokens()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create default subscription (free plan)
  INSERT INTO public.user_subscriptions (user_id, plan_id)
  VALUES (NEW.id, 'free');
  
  -- Create initial token balance
  INSERT INTO public.user_tokens (user_id, current_tokens, total_earned_this_period)
  VALUES (NEW.id, 100, 100);
  
  -- Record the initial token grant
  INSERT INTO public.token_usage_history (user_id, action_type, tokens_used, tokens_remaining, metadata)
  VALUES (NEW.id, 'monthly_refresh', -100, 100, '{"reason": "initial_signup"}');
  
  RETURN NEW;
END;
$$;

-- Trigger to initialize tokens when profile is created
CREATE TRIGGER on_profile_created_initialize_tokens
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_tokens();

-- Function to consume tokens
CREATE OR REPLACE FUNCTION public.consume_tokens(
  p_user_id UUID,
  p_action_type TEXT,
  p_tokens_to_consume INTEGER,
  p_website_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  current_tokens_balance INTEGER;
  new_balance INTEGER;
  result JSONB;
BEGIN
  -- Get current token balance
  SELECT current_tokens INTO current_tokens_balance
  FROM public.user_tokens
  WHERE user_id = p_user_id;
  
  -- Check if user exists
  IF current_tokens_balance IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'User not found',
      'tokens_remaining', 0
    );
  END IF;
  
  -- Check if user has enough tokens
  IF current_tokens_balance < p_tokens_to_consume THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Insufficient tokens',
      'tokens_remaining', current_tokens_balance,
      'tokens_needed', p_tokens_to_consume
    );
  END IF;
  
  -- Calculate new balance
  new_balance := current_tokens_balance - p_tokens_to_consume;
  
  -- Update token balance
  UPDATE public.user_tokens
  SET current_tokens = new_balance,
      updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Record usage history
  INSERT INTO public.token_usage_history (
    user_id, action_type, tokens_used, tokens_remaining, website_id, metadata
  )
  VALUES (
    p_user_id, p_action_type, p_tokens_to_consume, new_balance, p_website_id, p_metadata
  );
  
  RETURN json_build_object(
    'success', true,
    'tokens_remaining', new_balance,
    'tokens_consumed', p_tokens_to_consume
  );
END;
$$;

-- Function to refresh monthly tokens
CREATE OR REPLACE FUNCTION public.refresh_monthly_tokens()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  refresh_count INTEGER := 0;
  user_record RECORD;
BEGIN
  -- Loop through all users who need token refresh
  FOR user_record IN
    SELECT 
      ut.user_id,
      ut.current_tokens,
      ut.last_token_refresh,
      sp.tokens_per_month,
      sp.max_rollover_tokens
    FROM public.user_tokens ut
    JOIN public.user_subscriptions us ON ut.user_id = us.user_id
    JOIN public.subscription_plans sp ON us.plan_id = sp.id
    WHERE ut.last_token_refresh <= (now() - INTERVAL '1 month')
      AND us.status = 'active'
  LOOP
    -- Calculate new token balance with rollover cap
    DECLARE
      new_balance INTEGER;
      tokens_to_add INTEGER;
    BEGIN
      new_balance := LEAST(
        user_record.current_tokens + user_record.tokens_per_month,
        user_record.max_rollover_tokens
      );
      
      tokens_to_add := new_balance - user_record.current_tokens;
      
      -- Update user tokens
      UPDATE public.user_tokens
      SET current_tokens = new_balance,
          total_earned_this_period = user_record.tokens_per_month,
          last_token_refresh = now(),
          updated_at = now()
      WHERE user_id = user_record.user_id;
      
      -- Record the refresh in history
      INSERT INTO public.token_usage_history (
        user_id, action_type, tokens_used, tokens_remaining, metadata
      )
      VALUES (
        user_record.user_id, 
        'monthly_refresh', 
        -tokens_to_add, 
        new_balance,
        json_build_object('tokens_added', tokens_to_add, 'refresh_date', now())
      );
      
      refresh_count := refresh_count + 1;
    END;
  END LOOP;
  
  RETURN refresh_count;
END;
$$;