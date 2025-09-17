import { Link } from "react-router-dom";
import { ArrowLeft, Search, HelpCircle, Book, MessageCircle, Mail, Phone, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HelpCenter = () => {
  const quickHelp = [
    {
      title: "Getting Started",
      description: "New to Cyblick? Start here for the basics",
      icon: Book,
      link: "/resources/documentation",
      popular: true
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: MessageCircle,
      link: "/support/contact",
      popular: false
    },
    {
      title: "Community Forum",
      description: "Connect with other Cyblick users",
      icon: HelpCircle,
      link: "/support/community",
      popular: true
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: ExternalLink,
      link: "#",
      popular: false
    }
  ];

  const faqSections = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create my first website with Cyblick?",
          answer: "Simply sign up for a free account, describe the website you want in plain English, and our AI will generate it for you in under 2 minutes. You'll start with 100 free tokens to try the platform."
        },
        {
          question: "What types of websites can Cyblick create?",
          answer: "Cyblick can create virtually any type of website including business sites, portfolios, e-commerce stores, landing pages, blogs, restaurants, and non-profit websites. Our AI adapts to your specific requirements and industry."
        },
        {
          question: "Do I need coding knowledge to use Cyblick?",
          answer: "Not at all! Cyblick is designed for everyone. Simply describe what you want in natural language, and our AI handles all the technical implementation. However, developers can also export the generated code for further customization."
        }
      ]
    },
    {
      title: "Token System",
      faqs: [
        {
          question: "How does the token system work?",
          answer: "Tokens are used to pay for AI operations. Generating a website costs 25 tokens, modifying it costs 15 tokens, live editing costs 5 tokens, and exporting costs 10 tokens. Free accounts get 100 tokens monthly."
        },
        {
          question: "What happens when I run out of tokens?",
          answer: "You can upgrade to a paid plan for more tokens, or wait until your tokens refresh at the start of your next billing period. Unused tokens may roll over based on your plan limits."
        },
        {
          question: "Can I purchase additional tokens?",
          answer: "Yes! You can upgrade your plan at any time to get more monthly tokens. Our plans range from the free 100 tokens to 10,000 tokens for enterprise users."
        }
      ]
    },
    {
      title: "Website Generation",
      faqs: [
        {
          question: "How do I write effective prompts for better websites?",
          answer: "Be specific and detailed in your descriptions. Include the website type, target audience, desired sections, color preferences, and any specific functionality you need. The more context you provide, the better the result."
        },
        {
          question: "Can I modify my website after it's generated?",
          answer: "Absolutely! You can iterate on your website by describing changes you want to make. Each modification costs 15 tokens and typically takes 1-2 minutes to process."
        },
        {
          question: "What file formats can I export my website in?",
          answer: "You can export your website as clean HTML, CSS, and JavaScript files. The code is production-ready and can be deployed on any hosting platform or further customized by developers."
        }
      ]
    },
    {
      title: "Account & Billing",
      faqs: [
        {
          question: "How do I upgrade or downgrade my plan?",
          answer: "Go to your account settings and select 'Billing'. You can change plans at any time, with changes taking effect at your next billing cycle. Upgrades are prorated."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time. You'll retain access to paid features until the end of your current billing period, then automatically switch to the free plan."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 14-day money-back guarantee for new subscriptions. Refunds are processed within 5-7 business days to your original payment method."
        }
      ]
    },
    {
      title: "Technical Issues",
      faqs: [
        {
          question: "My website generation is taking longer than usual. What should I do?",
          answer: "Generation typically takes 1-3 minutes. If it's taking longer, try refreshing the page or contact support. High traffic periods may cause slight delays, but we maintain 99.9% uptime."
        },
        {
          question: "I'm having trouble exporting my website. How can I fix this?",
          answer: "Ensure you have enough tokens (10 required for export) and try again. If the issue persists, check your browser's download settings or try a different browser. Contact support if problems continue."
        },
        {
          question: "Can I use Cyblick on mobile devices?",
          answer: "Yes! Cyblick is fully responsive and works on all devices. However, for the best experience when reviewing and editing websites, we recommend using a desktop or tablet."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      name: "Live Chat",
      description: "Get instant help during business hours",
      available: "Mon-Fri 9AM-6PM EST",
      response: "< 5 minutes",
      icon: MessageCircle,
      link: "#",
      recommended: true
    },
    {
      name: "Email Support",
      description: "Detailed help for complex issues",
      available: "24/7",
      response: "< 24 hours",
      icon: Mail,
      link: "/support/contact",
      recommended: false
    },
    {
      name: "Phone Support",
      description: "Direct phone support for Enterprise users",
      available: "Mon-Fri 9AM-6PM EST",
      response: "Immediate",
      icon: Phone,
      link: "#",
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Find answers to common questions, browse our knowledge base, or get in touch 
            with our support team. We're here to help you succeed with Cyblick.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search for help articles, guides, and FAQs..." 
              className="pl-12 py-4 text-lg"
            />
          </div>
        </div>

        {/* Quick Help */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Quick Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickHelp.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer relative group">
                {item.popular && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={item.link} className="flex items-center gap-2">
                      Get Help
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Channels */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className={`${channel.recommended ? 'ring-2 ring-primary' : ''} hover:shadow-lg transition-shadow`}>
                {channel.recommended && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                      Recommended
                    </div>
                  </div>
                )}
                <CardHeader className="text-center relative">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <channel.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{channel.name}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available:</span>
                      <span>{channel.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response:</span>
                      <span>{channel.response}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant={channel.recommended ? "default" : "outline"} asChild>
                    <Link to={channel.link}>
                      Contact Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {section.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${sectionIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Still Need Help */}
        <section>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Still Need Help?</CardTitle>
              <CardDescription className="max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is ready to help you 
                with any questions about Cyblick.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/support/contact" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support/community" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Join Community
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;