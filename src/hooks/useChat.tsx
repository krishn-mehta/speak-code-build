import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export const useChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create a new conversation
  const createConversation = useCallback(async (title?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: title || null
        })
        .select()
        .single();

      if (error) throw error;
      
      setCurrentConversation(data);
      setMessages([]);
      
      // Add welcome message
      await addMessage(data.id, 'system', "Hi! I'm here to help you create amazing websites with AI. Just describe what you'd like to build, and I'll guide you through the process.");
      
      return data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create new conversation",
        variant: "destructive",
      });
      return null;
    }
  }, [user, toast]);

  // Load conversation and its messages
  const loadConversation = useCallback(async (conversationId: string) => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Load conversation details
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (convError) throw convError;

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      setCurrentConversation(conversation);
      setMessages((messagesData || []).map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant' | 'system'
      })));
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Add a message to the current conversation
  const addMessage = useCallback(async (conversationId: string, role: 'user' | 'assistant' | 'system', content: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          role,
          content
        })
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, {
        ...data,
        role: data.role as 'user' | 'assistant' | 'system'
      }]);
      
      // Update conversation title if it's the first user message
      if (role === 'user' && currentConversation && !currentConversation.title) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        await supabase
          .from('conversations')
          .update({ title })
          .eq('id', conversationId);
        
        setCurrentConversation(prev => prev ? { ...prev, title } : null);
      }

      return data;
    } catch (error) {
      console.error('Error adding message:', error);
      toast({
        title: "Error",
        description: "Failed to add message",
        variant: "destructive",
      });
    }
  }, [user, currentConversation, toast]);

  // Send a user message and get AI response
  const sendMessage = useCallback(async (content: string) => {
    if (!user || !currentConversation) return;

    setIsLoading(true);
    
    try {
      // Add user message
      await addMessage(currentConversation.id, 'user', content);
      
      // Call AI completion function
      const { data, error } = await supabase.functions.invoke('chat-completion', {
        body: {
          message: content,
          conversationId: currentConversation.id
        }
      });

      if (error) {
        console.error('Error calling chat-completion:', error);
        // Fallback response on error
        await addMessage(currentConversation.id, 'assistant', "I'm sorry, I encountered an error. Please try again.");
      }

      // Reload conversation to get the new AI response
      await loadConversation(currentConversation.id);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  }, [user, currentConversation, addMessage, loadConversation, toast]);

  return {
    currentConversation,
    messages,
    isLoading,
    createConversation,
    loadConversation,
    sendMessage,
  };
};