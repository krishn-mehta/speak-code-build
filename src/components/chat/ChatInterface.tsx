import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useChat } from "@/hooks/useChat";
import { useWebsites } from "@/hooks/useWebsites";
import { useTokens, TOKEN_COSTS } from "@/hooks/useTokens";
import { EnhancedWebsitePreview } from "@/components/website/EnhancedWebsitePreview";
import { WebsiteIterationHelper } from "@/components/website/WebsiteIterationHelper";
import { WebsiteEditor } from "@/components/website/WebsiteEditor";
import { VersionHistory } from "@/components/website/VersionHistory";
import { WebsiteAnalytics } from "@/components/analytics/WebsiteAnalytics";
import { PerformanceOptimizer } from "@/components/performance/PerformanceOptimizer";
import { WelcomeTour } from "@/components/onboarding/WelcomeTour";
import { ProgressWithSteps } from "@/components/ui/progress-with-steps";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Globe, Wand2, PlusCircle, HelpCircle, Edit, History, BarChart3, Zap } from "lucide-react";

interface ChatInterfaceProps {
  conversationId?: string;
  isLiveMode?: boolean;
  onWebsiteGenerated?: (websiteId: string) => void;
}

export const ChatInterface = ({ conversationId, isLiveMode = false, onWebsiteGenerated }: ChatInterfaceProps) => {
  const { currentConversation, messages, isLoading, loadConversation, sendMessage, createConversation } = useChat();
  const { generateWebsite, iterateWebsite, updateWebsite, getWebsitesByConversation, isLoading: websiteLoading } = useWebsites();
  const { hasEnoughTokens, getTokenCost } = useTokens();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWebsites, setShowWebsites] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<any>(null);
  const [showVersionHistory, setShowVersionHistory] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState<any>(null);
  const [showPerformanceOptimizer, setShowPerformanceOptimizer] = useState<any>(null);
  const [hasCompletedTour, setHasCompletedTour] = useState(() => {
    return localStorage.getItem('hasCompletedWelcomeTour') === 'true';
  });
  
  // Get websites for current conversation
  const conversationWebsites = conversationId ? getWebsitesByConversation(conversationId) : [];

  // Generation progress steps
  const generationSteps = [
    { id: 'analyzing', title: 'Analyzing Request', description: 'Understanding your requirements', status: 'pending' as const },
    { id: 'designing', title: 'Designing Layout', description: 'Creating the visual structure', status: 'pending' as const },
    { id: 'generating', title: 'Generating Code', description: 'Writing HTML, CSS, and JavaScript', status: 'pending' as const },
    { id: 'finalizing', title: 'Finalizing Website', description: 'Adding finishing touches', status: 'pending' as const }
  ];

  const [currentGenerationStep, setCurrentGenerationStep] = useState(0);

  // Show welcome tour for new users
  useEffect(() => {
    if (!hasCompletedTour && !conversationId && !currentConversation) {
      const timer = setTimeout(() => {
        setShowWelcomeTour(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedTour, conversationId, currentConversation]);

  // Simulate generation progress
  useEffect(() => {
    if (websiteLoading) {
      setCurrentGenerationStep(0);
      const interval = setInterval(() => {
        setCurrentGenerationStep(prev => {
          if (prev < generationSteps.length - 1) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [websiteLoading]);

  const handleTourComplete = () => {
    setHasCompletedTour(true);
    localStorage.setItem('hasCompletedWelcomeTour', 'true');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId, loadConversation]);

  const handleSendMessage = async (content: string) => {
    const lowerContent = content.toLowerCase();
    
    // Check if this is a website generation command
    const generationKeywords = ['generate', 'create', 'build', 'make', '/generate'];
    const websiteKeywords = ['website', 'site', 'page', 'portfolio', 'business', 'landing'];
    const isGeneration = generationKeywords.some(keyword => lowerContent.includes(keyword)) && 
                        (websiteKeywords.some(keyword => lowerContent.includes(keyword)) || lowerContent.startsWith('/generate'));
    
    // Check if this is a website iteration command
    const iterationKeywords = ['modify', 'change', 'update', 'edit', 'improve', 'make it', 'add to', 'remove from', 'alter'];
    const isIteration = iterationKeywords.some(keyword => lowerContent.includes(keyword));
    
    // Check token availability for website operations
    if (isGeneration && !hasEnoughTokens('generate_website')) {
      toast({
        title: "Insufficient Tokens",
        description: `You need ${getTokenCost('generate_website')} tokens to generate a website.`,
        variant: "destructive",
      });
      return;
    }
    
    if (isIteration && conversationWebsites.length > 0 && !hasEnoughTokens('iterate_website')) {
      toast({
        title: "Insufficient Tokens",
        description: `You need ${getTokenCost('iterate_website')} tokens to modify a website.`,
        variant: "destructive",
      });
      return;
    }
    
    if (isGeneration) {
      // Detect template type from message
      let templateType = 'custom';
      if (lowerContent.includes('portfolio')) templateType = 'portfolio';
      else if (lowerContent.includes('business')) templateType = 'business';
      else if (lowerContent.includes('landing')) templateType = 'landing';
      
      // Generate website and also send message to chat for context
      await handleGenerateWebsite(content, templateType);
      if (currentConversation) {
        await sendMessage(content);
      }
    } else if (isIteration && conversationWebsites.length > 0) {
      // Use the most recent website for iteration
      const latestWebsite = conversationWebsites[0];
      await iterateWebsite(latestWebsite.id, content);
      // Also send the message to chat for context
      if (currentConversation) {
        await sendMessage(content);
      }
    } else {
      // Regular chat message
      if (!currentConversation) {
        // Create new conversation if none exists
        const newConversation = await createConversation();
        if (newConversation) {
          await sendMessage(content);
        }
      } else {
        await sendMessage(content);
      }
    }
  };

  const handleNewChat = async (initialMessage?: string) => {
    const conversation = await createConversation();
    if (conversation && initialMessage) {
      await sendMessage(initialMessage);
    }
  };

  const handleGenerateWebsite = async (prompt: string, templateType: string = 'custom') => {
    let conversationIdToUse = currentConversation?.id;
    
    if (!conversationIdToUse) {
      const newConversation = await createConversation(`Website: ${prompt.substring(0, 50)}...`);
      conversationIdToUse = newConversation?.id;
    }
    
    if (conversationIdToUse) {
      const website = await generateWebsite(conversationIdToUse, prompt, templateType);
      if (website && onWebsiteGenerated) {
        onWebsiteGenerated(website.id);
      }
    }
  };

  // Welcome screen when no conversation is selected
  if (!currentConversation && !conversationId) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
            <Globe className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Your AI Website Builder
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-md">
            Describe the website you want to create, and I'll build it for you instantly. 
            From portfolios to business sites, I can create beautiful, responsive websites in seconds.
          </p>

          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWelcomeTour(true)}
              className="flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Take a Quick Tour
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl">
            <Button 
              onClick={() => handleGenerateWebsite("Create a modern portfolio website for a graphic designer with an elegant design, project showcase, and contact form", "portfolio")}
              variant="outline" 
              className="p-6 h-auto text-left justify-start hover:bg-muted/50 transition-colors"
              disabled={websiteLoading || !hasEnoughTokens('generate_website')}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">🎨 Portfolio Website</h3>
                  <Badge variant="secondary" className="text-xs">
                    {getTokenCost('generate_website')} tokens
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Perfect for showcasing your work and skills</p>
                {!hasEnoughTokens('generate_website') && (
                  <p className="text-xs text-red-600 mt-1">Insufficient tokens</p>
                )}
              </div>
            </Button>
            
            <Button 
              onClick={() => handleGenerateWebsite("Build a professional business website for a consulting company with services, about page, and contact information", "business")}
              variant="outline" 
              className="p-6 h-auto text-left justify-start hover:bg-muted/50 transition-colors"
              disabled={websiteLoading || !hasEnoughTokens('generate_website')}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">🏢 Business Site</h3>
                  <Badge variant="secondary" className="text-xs">
                    {getTokenCost('generate_website')} tokens
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Professional sites for your company or service</p>
                {!hasEnoughTokens('generate_website') && (
                  <p className="text-xs text-red-600 mt-1">Insufficient tokens</p>
                )}
              </div>
            </Button>
            
            <Button 
              onClick={() => handleGenerateWebsite("Design a modern landing page for a SaaS product launch with features, pricing, and call-to-action", "landing")}
              variant="outline" 
              className="p-6 h-auto text-left justify-start hover:bg-muted/50 transition-colors"
              disabled={websiteLoading || !hasEnoughTokens('generate_website')}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">🚀 Landing Page</h3>
                  <Badge variant="secondary" className="text-xs">
                    {getTokenCost('generate_website')} tokens
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Great for product launches and marketing</p>
                {!hasEnoughTokens('generate_website') && (
                  <p className="text-xs text-red-600 mt-1">Insufficient tokens</p>
                )}
              </div>
            </Button>
            
            <Button 
              onClick={() => handleNewChat("Tell me about your business and I'll help you create the perfect website")}
              variant="outline" 
              className="p-6 h-auto text-left justify-start hover:bg-muted/50 transition-colors"
            >
              <div>
                <h3 className="font-semibold mb-2">💬 Custom Chat</h3>
                <p className="text-sm text-muted-foreground">Start a conversation for custom solutions</p>
              </div>
            </Button>
          </div>

          <Button onClick={() => handleNewChat()} size="lg" className="shadow-elegant">
            <PlusCircle className="w-4 h-4 mr-2" />
            Start Building Your Website
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with website toggle */}
      {conversationWebsites.length > 0 && !isLiveMode && (
        <div className="border-b bg-background p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {conversationWebsites.length} website{conversationWebsites.length !== 1 ? 's' : ''} generated
              </Badge>
            </div>
            <Button
              variant={showWebsites ? "default" : "outline"}
              size="sm"
              onClick={() => setShowWebsites(!showWebsites)}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {showWebsites ? 'Show Chat' : 'Show Websites'}
            </Button>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {showWebsites && conversationWebsites.length > 0 ? (
            // Show generated websites
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Generated Websites</h3>
                <p className="text-muted-foreground">
                  Here are the websites created in this conversation
                </p>
              </div>
              
              {/* Website Iteration Helper */}
              <WebsiteIterationHelper 
                onIterate={(prompt) => {
                  const latestWebsite = conversationWebsites[0];
                  iterateWebsite(latestWebsite.id, prompt);
                }}
                isLoading={websiteLoading}
              />

              {conversationWebsites.map((website) => (
                <div key={website.id} className="space-y-4">
                  <EnhancedWebsitePreview website={website} />
                  
                  {/* Advanced Actions */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingWebsite(website)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Live Edit
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVersionHistory(website)}
                      className="flex items-center gap-2"
                    >
                      <History className="w-4 h-4" />
                      History
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAnalytics(website)}
                      className="flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPerformanceOptimizer(website)}
                      className="flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Optimize
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Show chat messages
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={new Date(message.created_at)}
                />
              ))}
              
              {(isLoading || websiteLoading) && (
                <div className="space-y-4">
                  {websiteLoading ? (
                    <div className="bg-muted rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Generating Your Website</h4>
                          <p className="text-sm text-muted-foreground">This may take a few moments...</p>
                        </div>
                      </div>
                      <ProgressWithSteps
                        steps={generationSteps.map((step, index) => ({
                          ...step,
                          status: index < currentGenerationStep ? 'completed' : index === currentGenerationStep ? 'active' : 'pending'
                        }))}
                        currentStep={currentGenerationStep}
                      />
                    </div>
                  ) : (
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      </div>
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t bg-background p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading || websiteLoading}
            placeholder={showWebsites ? "Modify your website or type '/generate' to create a new one..." : "Create a website (e.g., 'generate a portfolio site') or type '/generate' for templates..."}
          />
        </div>
      </div>

      {/* Advanced Modals */}
      {editingWebsite && (
        <WebsiteEditor
          website={editingWebsite}
          onSave={async (updates) => {
            await updateWebsite(editingWebsite.id, updates);
            setEditingWebsite(null);
          }}
          onClose={() => setEditingWebsite(null)}
        />
      )}

      {showVersionHistory && (
        <VersionHistory
          website={showVersionHistory}
          isOpen={!!showVersionHistory}
          onClose={() => setShowVersionHistory(null)}
          onRestore={async (version) => {
            await updateWebsite(showVersionHistory.id, {
              html_content: version.html_content,
              css_content: version.css_content,
              js_content: version.js_content
            });
            setShowVersionHistory(null);
          }}
        />
      )}

      {showAnalytics && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Website Analytics</h2>
              <Button variant="outline" onClick={() => setShowAnalytics(null)}>
                Close
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <WebsiteAnalytics website={showAnalytics} />
            </div>
          </div>
        </div>
      )}

      {showPerformanceOptimizer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Performance Optimizer</h2>
              <Button variant="outline" onClick={() => setShowPerformanceOptimizer(null)}>
                Close
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <PerformanceOptimizer 
                website={showPerformanceOptimizer}
                onOptimize={async (optimizations) => {
                  await updateWebsite(showPerformanceOptimizer.id, optimizations);
                  setShowPerformanceOptimizer(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Welcome Tour */}
      <WelcomeTour
        isOpen={showWelcomeTour}
        onClose={() => setShowWelcomeTour(false)}
        onComplete={handleTourComplete}
      />
    </div>
  );
};