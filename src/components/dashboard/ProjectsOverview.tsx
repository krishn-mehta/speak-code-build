import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
  Zap,
  Loader2
} from "lucide-react";
import { format } from "date-fns";


export const ProjectsOverview = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const { websites, isLoading, deleteWebsite } = useWebsites();
  const { userTokens, userSubscription } = useTokens();

  // Filter and search websites
  const filteredWebsites = websites.filter(website => {
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "published" && website.metadata?.status === "published") ||
      (filterStatus === "draft" && website.metadata?.status !== "published");
    
                const matchesSearch = !searchTerm || 
      website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Calculate real statistics
  const totalProjects = websites.length;
  const publishedSites = websites.filter(w => w.metadata?.status === "published").length;
  const thisMonthProjects = websites.filter(w => {
    const created = new Date(w.created_at);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  const quickStats = [
    { label: "Total Projects", value: totalProjects.toString(), change: thisMonthProjects > 0 ? `+${thisMonthProjects}` : "0", trend: thisMonthProjects > 0 ? "up" as const : "neutral" as const },
    { label: "Published Sites", value: publishedSites.toString(), change: `${Math.round((publishedSites / totalProjects) * 100) || 0}%`, trend: "up" as const },
    { label: "Available Tokens", value: userTokens?.current_tokens?.toString() || "0", change: "Tokens", trend: "neutral" as const },
    { label: "Current Plan", value: userSubscription?.plan_id || "Free", change: "Active", trend: "neutral" as const }
  ];

  const handleDeleteWebsite = async (websiteId: string) => {
    setDeletingId(websiteId);
    await deleteWebsite(websiteId);
    setDeletingId(null);
  };

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
              Ready to build something amazing? You have {userTokens?.current_tokens || 0} tokens available.
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading your projects...</h3>
          <p className="text-gray-500">Please wait while we fetch your websites</p>
        </div>
      ) : /* Projects Grid/List */
      filteredWebsites.length === 0 ? (
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
          {filteredWebsites.map((website) => (
            <Card key={website.id} className="hover:shadow-lg transition-shadow">
              {viewMode === "grid" ? (
                <>
                  {/* Grid View */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center">
                      <Globe className="w-16 h-16 text-gray-400" />
                    </div>
                    <Badge 
                      className={`absolute top-2 right-2 ${getStatusColor(website.metadata?.status || 'draft')}`}
                    >
                      {website.metadata?.status || 'draft'}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold truncate">
                        {website.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs capitalize">
                        {website.template_type}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {website.description || "No description"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(website.updated_at), "MMM d")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {format(new Date(website.created_at), "MMM d")}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" asChild>
                          <Link to={`/dashboard/project/${website.id}`}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={deletingId === website.id}>
                            {deletingId === website.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Website</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{website.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteWebsite(website.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </>
              ) : (
                /* List View */
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                      <Globe className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold truncate">{website.title}</h3>
                        <Badge className={getStatusColor(website.metadata?.status || 'draft')}>
                          {website.metadata?.status || 'draft'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-2">{website.description || "No description"}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {format(new Date(website.updated_at), "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Created {format(new Date(website.created_at), "MMM d")}
                        </span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {website.template_type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" asChild>
                        <Link to={`/dashboard/project/${website.id}`}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={deletingId === website.id}>
                            {deletingId === website.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Website</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{website.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteWebsite(website.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
                <span>{(userTokens?.total_earned_this_period || 100) - (userTokens?.current_tokens || 0)}/{userTokens?.total_earned_this_period || 100}</span>
              </div>
              <Progress value={((userTokens?.total_earned_this_period || 100) - (userTokens?.current_tokens || 0)) / (userTokens?.total_earned_this_period || 100) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Projects Created</span>
                <span>{totalProjects}/{userSubscription?.plan_id === 'pro' ? '∞' : '10'}</span>
              </div>
              <Progress value={userSubscription?.plan_id === 'pro' ? 0 : (totalProjects / 10) * 100} className="h-2" />
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