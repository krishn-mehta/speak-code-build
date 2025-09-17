import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebsites } from "@/hooks/useWebsites";
import { useTokens } from "@/hooks/useTokens";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { toast } from "sonner";
import {
  Send,
  Sparkles,
  Globe,
  Code,
  Palette,
  Rocket,
  Zap,
  Plus
} from "lucide-react";

interface LovableChatInterfaceProps {
  onWebsiteGenerated?: (websiteId: string) => void;
}

export const LovableChatInterface = ({ onWebsiteGenerated }: LovableChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { currentConversation, messages, isLoading, sendMessage, createConversation } = useChat();
  const { generateWebsite, isLoading: websiteLoading } = useWebsites();
  const { hasEnoughTokens, getTokenCost } = useTokens();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || isGenerating) return;

    const userMessage = input.trim();
    setInput("");
    setIsGenerating(true);

    try {
      // Check if this looks like a website generation request
      const isWebsiteRequest = /\b(create|build|make|generate|website|site|app|application|portfolio|landing|page)\b/i.test(userMessage);

      if (isWebsiteRequest) {
        // Check tokens
        if (!hasEnoughTokens('generate_website')) {
          toast.error(`Not enough tokens! You need ${getTokenCost('generate_website')} tokens to generate a website.`);
          setIsGenerating(false);
          return;
        }

        // Create conversation if none exists
        let conversationId = currentConversation?.id;
        if (!conversationId) {
          const newConversation = await createConversation();
          conversationId = newConversation?.id;
        }

        if (conversationId) {
          // Send message to chat first
          await sendMessage(userMessage);
          
          // Generate website
          const website = await generateWebsite(conversationId, userMessage, 'custom');
          if (website && onWebsiteGenerated) {
            onWebsiteGenerated(website.id);
          }
        }
      } else {
        // Regular chat message
        if (!currentConversation) {
          await createConversation();
        }
        await sendMessage(userMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    {
      icon: Globe,
      title: "Portfolio Website",
      prompt: "Create a modern portfolio website for a graphic designer with project showcase, about section, and contact form"
    },
    {
      icon: Rocket,
      title: "Landing Page",
      prompt: "Build a SaaS landing page for a productivity app with hero section, features, pricing, and testimonials"
    },
    {
      icon: Code,
      title: "Business Site",
      prompt: "Create a professional business website for a consulting company with services, team, and contact pages"
    },
    {
      icon: Palette,
      title: "Creative Site",
      prompt: "Design a creative agency website with bold animations, case studies, and team showcase"
    }
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-background border border-border/50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b p-3 bg-card/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          <h2 className="font-medium text-sm">AI Website Builder</h2>
          <Badge variant="secondary" className="text-xs px-2 py-0">
            AI Powered
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Describe your website and I'll build it instantly
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3">
        {messages.length === 0 ? (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Welcome to Cyblick
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Describe your website idea and I'll build it with React, TypeScript & Tailwind CSS.
              </p>
            </div>

            {/* Quick Start Prompts */}
            <div className="space-y-3">
              <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Quick Start</h4>
              <div className="grid grid-cols-1 gap-3">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-3 h-auto text-left justify-start hover:bg-muted/50 border-border/50"
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    disabled={isGenerating || !hasEnoughTokens('generate_website')}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <prompt.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{prompt.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {prompt.prompt}
                        </div>
                        <Badge variant="secondary" className="text-xs mt-2 px-2 py-0">
                          {getTokenCost('generate_website')} tokens
                        </Badge>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={new Date(message.created_at)}
              />
            ))}
            {(isLoading || isGenerating || websiteLoading) && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">
                  {websiteLoading ? 'Generating website...' : 'Thinking...'}
                </span>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <div className="border-t p-3 bg-card/30">
        <div className="flex gap-2">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the website you want to build..."
              className="min-h-[48px] resize-none border-border/50 text-sm"
              disabled={isLoading || isGenerating}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading || isGenerating}
            size="lg"
            className="px-3 h-[48px] bg-primary hover:bg-primary/90"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {/* Token info */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground/70">
          <span>Press Enter to send • Shift+Enter for new line</span>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 opacity-60" />
            <span>{getTokenCost('generate_website')} tokens per website</span>
          </div>
        </div>
      </div>
    </div>
  );
};