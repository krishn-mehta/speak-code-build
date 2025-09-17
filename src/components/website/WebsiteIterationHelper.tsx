import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Palette, Layout, Type, Image, Settings } from "lucide-react";

interface WebsiteIterationHelperProps {
  onIterate: (prompt: string) => void;
  isLoading?: boolean;
}

export const WebsiteIterationHelper = ({ onIterate, isLoading }: WebsiteIterationHelperProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const iterationCategories = [
    {
      id: 'style',
      title: 'Style & Design',
      icon: Palette,
      color: 'bg-purple-500',
      suggestions: [
        'Make it more modern and clean',
        'Add a gradient background',
        'Use a darker color scheme',
        'Make it more colorful and vibrant',
        'Add subtle animations and hover effects'
      ]
    },
    {
      id: 'layout',
      title: 'Layout & Structure',
      icon: Layout,
      color: 'bg-blue-500',
      suggestions: [
        'Make it more responsive for mobile',
        'Add a sticky navigation header',
        'Create a better footer section',
        'Reorganize the content sections',
        'Add a sidebar for navigation'
      ]
    },
    {
      id: 'content',
      title: 'Content & Text',
      icon: Type,
      color: 'bg-green-500',
      suggestions: [
        'Add a contact form',
        'Include testimonials section',
        'Add a blog or news section',
        'Create an about us page',
        'Add social media links'
      ]
    },
    {
      id: 'features',
      title: 'Features & Functionality',
      icon: Settings,
      color: 'bg-orange-500',
      suggestions: [
        'Add a search functionality',
        'Include image gallery or carousel',
        'Add a newsletter signup',
        'Create interactive buttons',
        'Add smooth scrolling navigation'
      ]
    }
  ];

  const handleSuggestionClick = (suggestion: string) => {
    onIterate(suggestion);
    setSelectedCategory(null);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          Quick Website Improvements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {iterationCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center gap-2"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                disabled={isLoading}
              >
                <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{category.title}</span>
              </Button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground mb-3">
              Popular {iterationCategories.find(c => c.id === selectedCategory)?.title} Changes:
            </h4>
            <div className="flex flex-wrap gap-2">
              {iterationCategories
                .find(c => c.id === selectedCategory)
                ?.suggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};