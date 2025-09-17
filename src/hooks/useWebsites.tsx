import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTokens } from '@/hooks/useTokens';
import { toast } from 'sonner';

export interface Website {
  id: string;
  user_id: string;
  conversation_id: string;
  title: string;
  description?: string;
  html_content: string;
  css_content: string;
  js_content?: string;
  template_type: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export const useWebsites = () => {
  const { user } = useAuth();
  const { consumeTokens, hasEnoughTokens } = useTokens();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load all websites for the current user
  const loadWebsites = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('generated_websites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebsites(data || []);
    } catch (error) {
      console.error('Error loading websites:', error);
      toast.error('Failed to load websites');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a new website
  const generateWebsite = async (
    conversationId: string,
    userPrompt: string,
    templateType: string = 'custom',
    title?: string
  ): Promise<Website | null> => {
    if (!user) {
      toast.error('Please sign in to generate websites');
      return null;
    }

    // Check if user has enough tokens
    if (!hasEnoughTokens('generate_website')) {
      toast.error('Insufficient tokens. Please upgrade your plan or wait for your next refresh.');
      return null;
    }

    setIsLoading(true);
    try {
      // Consume tokens before generation
      const tokenResult = await consumeTokens('generate_website', undefined, {
        prompt: userPrompt.substring(0, 100),
        templateType,
        title
      });

      if (!tokenResult.success) {
        toast.error(tokenResult.error || 'Failed to consume tokens');
        return null;
      }
      console.log('Generating website with:', { conversationId, userPrompt, templateType, title });
      
      const { data, error } = await supabase.functions.invoke('website-generator', {
        body: {
          conversationId,
          userPrompt,
          templateType,
          title: title || 'Generated Website'
        }
      });

      if (error) throw error;

      if (data?.website) {
        // Add the new website to the list
        setWebsites(prev => [data.website, ...prev]);
        toast.success(`Website generated successfully! ${tokenResult.tokens_remaining} tokens remaining.`);
        return data.website;
      }

      throw new Error('No website data returned');
    } catch (error) {
      console.error('Error generating website:', error);
      toast.error('Failed to generate website. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Iterate/modify an existing website
  const iterateWebsite = async (
    websiteId: string,
    userPrompt: string
  ): Promise<Website | null> => {
    if (!user) {
      toast.error('Please sign in to modify websites');
      return null;
    }

    // Check if user has enough tokens
    if (!hasEnoughTokens('iterate_website')) {
      toast.error('Insufficient tokens. Please upgrade your plan or wait for your next refresh.');
      return null;
    }

    setIsLoading(true);
    try {
      // Consume tokens before iteration
      const tokenResult = await consumeTokens('iterate_website', websiteId, {
        prompt: userPrompt.substring(0, 100)
      });

      if (!tokenResult.success) {
        toast.error(tokenResult.error || 'Failed to consume tokens');
        return null;
      }
      console.log('Iterating website:', { websiteId, userPrompt });
      
      const { data, error } = await supabase.functions.invoke('website-generator', {
        body: {
          websiteId,
          userPrompt,
          action: 'iterate'
        }
      });

      if (error) throw error;

      if (data?.website) {
        // Update the website in the list
        setWebsites(prev => 
          prev.map(site => 
            site.id === websiteId ? data.website : site
          )
        );
        toast.success(`Website updated successfully! ${tokenResult.tokens_remaining} tokens remaining.`);
        return data.website;
      }

      throw new Error('No updated website data returned');
    } catch (error) {
      console.error('Error iterating website:', error);
      toast.error('Failed to update website. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get websites for a specific conversation
  const getWebsitesByConversation = (conversationId: string) => {
    return websites.filter(website => website.conversation_id === conversationId);
  };

  // Delete a website
  const deleteWebsite = async (websiteId: string) => {
    try {
      const { error } = await supabase
        .from('generated_websites')
        .delete()
        .eq('id', websiteId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setWebsites(prev => prev.filter(site => site.id !== websiteId));
      toast.success('Website deleted successfully');
    } catch (error) {
      console.error('Error deleting website:', error);
      toast.error('Failed to delete website');
    }
  };

  // Update a website
  const updateWebsite = async (
    websiteId: string,
    updates: Partial<Pick<Website, 'title' | 'description' | 'html_content' | 'css_content' | 'js_content'>>
  ) => {
    try {
      const { data, error } = await supabase
        .from('generated_websites')
        .update(updates)
        .eq('id', websiteId)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;

      setWebsites(prev => 
        prev.map(site => 
          site.id === websiteId ? { ...site, ...data } : site
        )
      );
      
      toast.success('Website updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating website:', error);
      toast.error('Failed to update website');
      return null;
    }
  };

  // Load websites when user changes
  useEffect(() => {
    if (user) {
      loadWebsites();
    } else {
      setWebsites([]);
    }
  }, [user]);

  return {
    websites,
    isLoading,
    generateWebsite,
    iterateWebsite,
    getWebsitesByConversation,
    deleteWebsite,
    updateWebsite,
    loadWebsites,
  };
};