import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId } = await req.json();
    console.log('Received chat request:', { message, conversationId });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    let aiResponse: string;

    if (!openAIApiKey) {
      // Placeholder response when no API key is configured
      aiResponse = "I'm ready to help you build amazing websites! However, my AI capabilities aren't fully configured yet. Once the OpenAI API key is added, I'll be able to provide intelligent responses about web development, design suggestions, and code generation. For now, I can confirm that I'm receiving your messages successfully!";
      console.log('No OpenAI API key found, using placeholder response');
    } else {
      // Real OpenAI integration when API key is available
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an expert AI website builder assistant. Your primary role is to help users create, modify, and improve websites through conversational guidance.

CORE CAPABILITIES:
- Guide users through website creation with smart questions
- Help iterate and improve existing websites  
- Provide specific design and development advice
- Understand website building context and user intent

CONVERSATION STYLE:
- Ask clarifying questions to understand user needs better
- Suggest specific improvements and features
- Be encouraging and solution-focused
- Provide actionable next steps

WEBSITE BUILDING GUIDANCE:
- When users describe a website idea, ask follow-up questions about:
  * Target audience and purpose
  * Preferred style/design direction  
  * Key features and sections needed
  * Color preferences and branding
- Suggest improvements to existing websites
- Help troubleshoot issues and provide solutions

ITERATION COMMANDS:
- Recognize when users want to modify existing websites
- Understand requests like "make it more modern", "add a contact form", "change the colors"
- Guide users through specific website improvements

Always be helpful, specific, and focused on creating amazing websites!`
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      aiResponse = data.choices[0].message.content;
      console.log('Generated AI response via OpenAI');
    }

    // Store the AI response in the database
    const { error: insertError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: aiResponse,
      });

    if (insertError) {
      console.error('Error storing AI response:', insertError);
      throw insertError;
    }

    console.log('Successfully stored AI response in database');

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in chat-completion function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I'm sorry, I encountered an error processing your request. Please try again."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});