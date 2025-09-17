import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const featuredPost = {
    title: "The Future of Web Development: How AI is Revolutionizing Website Creation",
    excerpt: "Explore how artificial intelligence is transforming the way we build websites, from automated code generation to intelligent design decisions.",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "/api/placeholder/800/400",
    slug: "future-web-development-ai"
  };

  const blogPosts = [
    {
      title: "10 Essential Features Every Modern Website Needs in 2025",
      excerpt: "Stay ahead of the curve with these must-have website features that users expect in today's digital landscape.",
      author: "Mike Rodriguez",
      date: "January 12, 2025",
      readTime: "5 min read",
      category: "Web Design",
      image: "/api/placeholder/400/250",
      slug: "essential-website-features-2025"
    },
    {
      title: "Maximizing Your Token Usage: Advanced Cyblick Tips",
      excerpt: "Learn expert strategies to get the most out of your Cyblick tokens and create better websites with fewer iterations.",
      author: "Emma Thompson",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Cyblick Tips",
      image: "/api/placeholder/400/250",
      slug: "maximizing-token-usage-tips"
    },
    {
      title: "From Prompt to Production: A Complete Website Creation Workflow",
      excerpt: "Follow our step-by-step guide to take your AI-generated website from initial concept to live deployment.",
      author: "David Park",
      date: "January 8, 2025",
      readTime: "7 min read",
      category: "Tutorials",
      image: "/api/placeholder/400/250",
      slug: "prompt-to-production-workflow"
    },
    {
      title: "Case Study: How TechStartup Inc. Saved $50K Using AI Website Generation",
      excerpt: "Real-world example of how a startup used Cyblick to rapidly prototype and deploy their company website.",
      author: "Lisa Wang",
      date: "January 5, 2025",
      readTime: "4 min read",
      category: "Case Studies",
      image: "/api/placeholder/400/250",
      slug: "techstartup-case-study"
    },
    {
      title: "SEO Best Practices for AI-Generated Websites",
      excerpt: "Optimize your AI-created website for search engines with these proven SEO strategies and techniques.",
      author: "Alex Johnson",
      date: "January 3, 2025",
      readTime: "9 min read",
      category: "SEO",
      image: "/api/placeholder/400/250",
      slug: "seo-best-practices-ai-websites"
    },
    {
      title: "The Psychology of Web Design: Creating User-Friendly AI Websites",
      excerpt: "Understand how user psychology influences web design and how to apply these principles to your AI-generated sites.",
      author: "Dr. Rachel Green",
      date: "December 30, 2024",
      readTime: "6 min read",
      category: "UX Design",
      image: "/api/placeholder/400/250",
      slug: "psychology-web-design-ai"
    }
  ];

  const categories = [
    { name: "All Posts", count: 24 },
    { name: "AI & Technology", count: 8 },
    { name: "Web Design", count: 6 },
    { name: "Cyblick Tips", count: 5 },
    { name: "Tutorials", count: 4 },
    { name: "Case Studies", count: 3 },
    { name: "SEO", count: 2 },
    { name: "UX Design", count: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Cyblick Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Stay updated with the latest in AI-powered web development, design trends, 
            tutorials, and success stories from the Cyblick community.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Featured Post */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Featured Article</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6">
                    <Badge className="mb-3">{featuredPost.category}</Badge>
                    <h3 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button className="group">
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* Recent Posts */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
              <div className="grid gap-6">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="h-48 md:h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                          <div className="text-center">
                            <Tag className="h-8 w-8 text-primary mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground">{post.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="group">
                            Read More
                            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Posts
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search blog posts..." className="pl-10" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 rounded hover:bg-muted transition-colors cursor-pointer">
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest articles and Cyblick updates delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Your email address" type="email" />
                <Button className="w-full">
                  Subscribe to Newsletter
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI", "Web Development", "React", "Design", "SEO",
                    "Tutorials", "Tips", "Case Studies", "UX", "Performance"
                  ].map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Comments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    author: "John D.",
                    comment: "Great article on AI web development!",
                    post: "Future of Web Development"
                  },
                  {
                    author: "Sarah M.",
                    comment: "The token optimization tips were really helpful.",
                    post: "Maximizing Token Usage"
                  },
                  {
                    author: "Mike R.",
                    comment: "Looking forward to more case studies.",
                    post: "TechStartup Case Study"
                  }
                ].map((comment, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-3">
                    <p className="text-sm font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground mb-1">{comment.comment}</p>
                    <p className="text-xs text-primary cursor-pointer hover:underline">
                      on "{comment.post}"
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter CTA */}
        <section className="mt-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Never Miss an Update</CardTitle>
              <CardDescription className="max-w-2xl mx-auto">
                Join thousands of developers and designers who stay informed with our weekly newsletter 
                featuring the latest AI web development trends, tutorials, and Cyblick updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input placeholder="Enter your email" type="email" className="flex-1" />
                <Button>
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Join 12,000+ subscribers • No spam • Unsubscribe anytime
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Write for Us CTA */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Write for Cyblick</CardTitle>
              <CardDescription>
                Have insights to share about AI, web development, or design? We're always looking 
                for expert contributors to join our blog.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/support/contact">
                    Pitch an Article
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/support/community">
                    Join Community
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;