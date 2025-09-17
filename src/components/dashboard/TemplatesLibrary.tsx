import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  Clock,
  Rocket,
  ShoppingCart,
  Briefcase,
  Palette,
  Code,
  Smartphone,
  Globe,
  Heart,
  Play
} from "lucide-react";

// Mock templates data
const templateCategories = [
  { id: "all", name: "All Templates", count: 48 },
  { id: "business", name: "Business", count: 12 },
  { id: "ecommerce", name: "E-commerce", count: 8 },
  { id: "portfolio", name: "Portfolio", count: 10 },
  { id: "blog", name: "Blog", count: 6 },
  { id: "landing", name: "Landing Pages", count: 12 }
];

const templates = [
  {
    id: "1",
    name: "Modern E-commerce Store",
    description: "Complete online store with cart, checkout, and payment integration",
    category: "ecommerce",
    thumbnail: "/api/placeholder/400/300",
    price: "Free",
    rating: 4.8,
    downloads: 1250,
    tags: ["React", "Tailwind", "Stripe", "Responsive"],
    featured: true,
    preview_url: "#",
    author: "Cyblick Team",
    created_at: "2024-01-15"
  },
  {
    id: "2", 
    name: "Creative Portfolio",
    description: "Stunning portfolio template for designers and creative professionals",
    category: "portfolio",
    thumbnail: "/api/placeholder/400/300",
    price: "Free",
    rating: 4.9,
    downloads: 2100,
    tags: ["Creative", "Animation", "Portfolio", "Modern"],
    featured: true,
    preview_url: "#",
    author: "Cyblick Team",
    created_at: "2024-01-10"
  },
  {
    id: "3",
    name: "SaaS Landing Page",
    description: "High-converting landing page template for SaaS products",
    category: "landing",
    thumbnail: "/api/placeholder/400/300",
    price: "Pro",
    rating: 4.7,
    downloads: 890,
    tags: ["SaaS", "Conversion", "CTA", "Professional"],
    featured: false,
    preview_url: "#",
    author: "Cyblick Team", 
    created_at: "2024-01-08"
  },
  {
    id: "4",
    name: "Corporate Business Site",
    description: "Professional corporate website with about, services, and contact pages",
    category: "business",
    thumbnail: "/api/placeholder/400/300",
    price: "Free",
    rating: 4.6,
    downloads: 567,
    tags: ["Corporate", "Professional", "Services", "Contact"],
    featured: false,
    preview_url: "#",
    author: "Community",
    created_at: "2024-01-05"
  },
  {
    id: "5",
    name: "Tech Blog Template",
    description: "Modern blog template perfect for tech content and tutorials",
    category: "blog",
    thumbnail: "/api/placeholder/400/300",
    price: "Free",
    rating: 4.5,
    downloads: 432,
    tags: ["Blog", "Tech", "Articles", "Clean"],
    featured: false,
    preview_url: "#",
    author: "Community",
    created_at: "2024-01-03"
  },
  {
    id: "6",
    name: "Startup Landing",
    description: "Eye-catching landing page designed for startup companies",
    category: "landing",
    thumbnail: "/api/placeholder/400/300",
    price: "Pro",
    rating: 4.8,
    downloads: 1100,
    tags: ["Startup", "Modern", "Hero", "Features"],
    featured: true,
    preview_url: "#",
    author: "Cyblick Team",
    created_at: "2024-01-01"
  }
];

export const TemplatesLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  const featuredTemplates = templates.filter(t => t.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "business": return Briefcase;
      case "ecommerce": return ShoppingCart;
      case "portfolio": return Palette;
      case "blog": return Code;
      case "landing": return Rocket;
      default: return Globe;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Template Library</h2>
          <p className="text-gray-600">Start with pre-built templates and customize to your needs</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Rocket className="w-4 h-4 mr-2" />
          Submit Template
        </Button>
      </div>

      {/* Featured Templates */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🌟 Featured Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredTemplates.slice(0, 3).map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                  Featured
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold truncate">
                    {template.name}
                  </CardTitle>
                  <Badge variant={template.price === "Free" ? "secondary" : "default"}>
                    {template.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    {template.rating}
                  </div>
                  <div className="flex items-center">
                    <Download className="w-3 h-3 mr-1" />
                    {template.downloads}
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        {/* Category Tabs */}
        <TabsList className="grid w-full grid-cols-6">
          {templateCategories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-1">
                <Icon className="w-4 h-4" />
                <span className="hidden md:block">{category.name}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Templates Grid */}
        <TabsContent value={selectedCategory} className="space-y-6">
          {sortedTemplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                    {template.featured && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                        Featured
                      </Badge>
                    )}
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        template.price === "Free" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                      }`}
                    >
                      {template.price}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-semibold truncate">
                          {template.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 line-clamp-2">
                          {template.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {template.rating}
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {template.downloads}
                        </div>
                      </div>
                      <span className="text-xs">by {template.author}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Rocket className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={template.preview_url} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Load More */}
      {sortedTemplates.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Templates
          </Button>
        </div>
      )}

      {/* Create Custom Template CTA */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
          <p className="text-purple-100 mb-6">
            Start from scratch and build exactly what you envision with our AI-powered website builder.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Rocket className="w-5 h-5 mr-2" />
            Create Custom Website
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};