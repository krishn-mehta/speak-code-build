import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useWebsites } from "@/hooks/useWebsites";
import { useTokens } from "@/hooks/useTokens";
import { 
  Plus, 
  Globe, 
  Calendar, 
  ExternalLink, 
  Edit, 
  Trash2, 
  Copy,
  MoreVertical,
  Filter,
  Grid3X3,
  List,
  Search,
  TrendingUp,
  Clock,
  Rocket,
  Zap
} from "lucide-react";
import { format } from "date-fns";

// Mock data for demonstration - replace with real data from your hooks
const mockProjects = [
  {
    id: "1",
    name: "E-commerce Store",
    description: "Modern online shopping experience with cart functionality",
    url: "https://mystore.cyblick.app",
    status: "published",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-20"),
    thumbnail: "/api/placeholder/300/200",
    views: 1234,
    type: "E-commerce"
  },
  {
    id: "2", 
    name: "Portfolio Website",
    description: "Clean and professional portfolio showcase",
    url: "https://portfolio.cyblick.app",
    status: "draft",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-18"),
    thumbnail: "/api/placeholder/300/200",
    views: 567,
    type: "Portfolio"
  },
  {
    id: "3",
    name: "Landing Page",
    description: "High-converting product landing page",
    url: "https://landing.cyblick.app", 
    status: "published",
    created_at: new Date("2024-01-05"),
    updated_at: new Date("2024-01-16"),
    thumbnail: "/api/placeholder/300/200",
    views: 2890,
    type: "Landing"
  }
];

const quickStats = [
  { label: "Total Projects", value: "12", change: "+3", trend: "up" },
  { label: "Published Sites", value: "8", change: "+2", trend: "up" },
  { label: "Total Views", value: "15.2K", change: "+12%", trend: "up" },
  { label: "This Month", value: "4", change: "New", trend: "neutral" }
];

export const ProjectsOverview = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const { currentTokens, currentPlan } = useTokens();

  const filteredProjects = mockProjects.filter(project => 
    filterStatus === "all" || project.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back to Cyblick! 👋</h2>
            <p className="text-blue-100 mb-4">
              Ready to build something amazing? You have {currentTokens} tokens available.
            </p>
            <div className="flex items-center space-x-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link to="/create">
                  <Plus className="w-5 h-5 mr-2" />
                  New Project
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-white border-white hover:bg-white/10"
                asChild
              >
                <Link to="/dashboard/templates">
                  <Rocket className="w-5 h-5 mr-2" />
                  Browse Templates
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Zap className="w-16 h-16 text-white/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Projects</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first project</p>
          <Button asChild>
            <Link to="/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              {viewMode === "grid" ? (
                <>
                  {/* Grid View */}
                  <div className="relative">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold truncate">
                        {project.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {project.type}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(project.updated_at, "MMM d")}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {project.views} views
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" asChild>
                          <Link to={`/dashboard/project/${project.id}`}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              ) : (
                /* List View */
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold truncate">{project.name}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-2">{project.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {format(project.updated_at, "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {project.views} views
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {project.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" asChild>
                        <Link to={`/dashboard/project/${project.id}`}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Usage Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tokens Used</span>
                <span>{100 - currentTokens}/100</span>
              </div>
              <Progress value={(100 - currentTokens)} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Projects Created</span>
                <span>4/10</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link to="/dashboard/billing">
                View Usage Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};