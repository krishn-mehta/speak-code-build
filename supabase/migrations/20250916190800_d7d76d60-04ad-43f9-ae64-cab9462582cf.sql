-- Create a table for generated websites
CREATE TABLE public.generated_websites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  html_content TEXT NOT NULL,
  css_content TEXT NOT NULL,
  js_content TEXT,
  template_type TEXT NOT NULL DEFAULT 'custom',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.generated_websites ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own websites" 
ON public.generated_websites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own websites" 
ON public.generated_websites 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own websites" 
ON public.generated_websites 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own websites" 
ON public.generated_websites 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_generated_websites_updated_at
BEFORE UPDATE ON public.generated_websites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();