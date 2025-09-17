import { Link } from "react-router-dom";
import { ArrowLeft, Users, MessageSquare, Star, Trophy, Calendar, ExternalLink, Github, Twitter, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Community = () => {
  const communityStats = [
    { label: "Active Members", value: "12,000+", icon: Users },
    { label: "Websites Created", value: "50,000+", icon: Star },
    { label: "Forum Posts", value: "8,500+", icon: MessageSquare },
    { label: "Success Stories", value: "150+", icon: Trophy }
  ];

  const communityChannels = [
    {
      name: "Discord Server",
      description: "Real-time chat with the Cyblick community",
      members: "5,200+",
      activity: "Very Active",
      icon: Hash,
      link: "#",
      color: "bg-indigo-500",
      featured: true
    },
    {
      name: "Forum",
      description: "Detailed discussions and troubleshooting",
      members: "8,000+",
      activity: "Active",
      icon: MessageSquare,
      link: "#",
      color: "bg-blue-500",
      featured: true
    },
    {
      name: "GitHub",
      description: "Open source contributions and code sharing",
      members: "1,500+",
      activity: "Moderate",
      icon: Github,
      link: "#",
      color: "bg-gray-800",
      featured: false
    },
    {
      name: "Twitter",
      description: "Latest updates and community highlights",
      members: "3,000+",
      activity: "Daily",
      icon: Twitter,
      link: "#",
      color: "bg-sky-500",
      featured: false
    }
  ];

  const featuredMembers = [
    {
      name: "Sarah Chen",
      role: "Community Moderator",
      avatar: "/api/placeholder/64/64",
      bio: "Full-stack developer helping newcomers get started with AI web development",
      contributions: 250,
      badges: ["Moderator", "Helper", "Early Adopter"]
    },
    {
      name: "Mike Rodriguez",
      role: "AI Enthusiast",
      avatar: "/api/placeholder/64/64",
      bio: "Sharing advanced prompt engineering techniques and best practices",
      contributions: 180,
      badges: ["Expert", "Contributor"]
    },
    {
      name: "Emma Thompson",
      role: "Design Specialist",
      avatar: "/api/placeholder/64/64",
      bio: "Creating beautiful website templates and design inspiration",
      contributions: 95,
      badges: ["Designer", "Creative"]
    }
  ];

  const recentDiscussions = [
    {
      title: "Best practices for e-commerce website prompts?",
      author: "Alex Kim",
      replies: 12,
      views: 89,
      lastActive: "2 hours ago",
      category: "Tips & Tricks",
      solved: true
    },
    {
      title: "How to optimize token usage for large projects",
      author: "David Park",
      replies: 8,
      views: 45,
      lastActive: "4 hours ago",
      category: "Token Management",
      solved: false
    },
    {
      title: "Show & Tell: My AI-generated portfolio website",
      author: "Lisa Wang",
      replies: 25,
      views: 156,
      lastActive: "6 hours ago",
      category: "Showcase",
      solved: false
    },
    {
      title: "Feature Request: Custom CSS injection",
      author: "Tom Wilson",
      replies: 15,
      views: 78,
      lastActive: "1 day ago",
      category: "Feature Requests",
      solved: false
    }
  ];

  const upcomingEvents = [
    {
      title: "AI Web Development Webinar",
      date: "January 25, 2025",
      time: "2:00 PM EST",
      type: "Online Event",
      attendees: 156,
      description: "Learn advanced techniques for creating professional websites with AI"
    },
    {
      title: "Community Challenge: Best Portfolio",
      date: "February 1-15, 2025",
      time: "All day",
      type: "Competition",
      attendees: 89,
      description: "Show off your best AI-generated portfolio website and win prizes"
    },
    {
      title: "Office Hours with Cyblick Team",
      date: "January 30, 2025",
      time: "4:00 PM EST",
      type: "Q&A Session",
      attendees: 45,
      description: "Ask questions directly to the Cyblick development team"
    }
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
            Cyblick Community
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Join thousands of developers, designers, and entrepreneurs who are building the future 
            of web development with AI. Share ideas, get help, and showcase your creations.
          </p>
        </div>

        {/* Community Stats */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Channels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Join the Conversation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {communityChannels.map((channel, index) => (
              <Card key={index} className={`${channel.featured ? 'ring-2 ring-primary' : ''} hover:shadow-lg transition-shadow group relative`}>
                {channel.featured && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-primary">Featured</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${channel.color} rounded-lg flex items-center justify-center`}>
                      <channel.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{channel.name}</CardTitle>
                      <CardDescription>{channel.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Members: </span>
                      <span className="font-semibold">{channel.members}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Activity: </span>
                      <span className="font-semibold">{channel.activity}</span>
                    </div>
                  </div>
                  <Button className="w-full group-hover:shadow-md transition-shadow" asChild>
                    <Link to={channel.link} className="flex items-center gap-2">
                      Join {channel.name}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Recent Discussions */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Recent Discussions</h2>
                <Button variant="outline" asChild>
                  <Link to="#" className="flex items-center gap-2">
                    View All
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                            {discussion.solved && (
                              <Badge className="text-xs bg-green-500">
                                Solved
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
                            {discussion.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            by {discussion.author} • {discussion.lastActive}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{discussion.replies} replies</span>
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Upcoming Events */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm mb-3">
                            <span className="text-primary font-medium">{event.date}</span>
                            <span className="text-muted-foreground">{event.time}</span>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {event.attendees} attending
                            </span>
                            <Button size="sm" variant="outline">
                              Join Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Featured Members */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured Members</CardTitle>
                <CardDescription>
                  Active community contributors making a difference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredMembers.map((member, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{member.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
                      <p className="text-xs text-muted-foreground mb-2">{member.bio}</p>
                      <div className="flex flex-wrap gap-1">
                        {member.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be respectful and constructive</li>
                  <li>• Share knowledge and help others</li>
                  <li>• Keep discussions relevant to Cyblick</li>
                  <li>• No spam or self-promotion</li>
                  <li>• Follow platform-specific rules</li>
                </ul>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Get Involved */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Get Involved</CardTitle>
                <CardDescription>
                  Ways to contribute to the community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start a Discussion
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Share Your Website
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Help Others
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Trophy className="h-4 w-4 mr-2" />
                  Join Challenges
                </Button>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Newsletter</CardTitle>
                <CardDescription>
                  Weekly highlights and member spotlights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Subscribe
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Join 8,000+ subscribers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <section className="mt-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Join Our Community?</CardTitle>
              <CardDescription className="max-w-2xl mx-auto">
                Connect with fellow creators, share your projects, get help when you need it, 
                and be part of the AI web development revolution.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="#" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Join Discord Server
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="#" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Visit Forum
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

export default Community;