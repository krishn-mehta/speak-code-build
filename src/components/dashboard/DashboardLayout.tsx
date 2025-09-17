import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useTokens } from "@/hooks/useTokens";
import { 
  Rocket, 
  FolderOpen, 
  BarChart3, 
  Users, 
  Palette, 
  Settings, 
  CreditCard,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
  Plus
} from "lucide-react";

const navigation = [
  { name: "Projects", href: "/dashboard", icon: FolderOpen, current: true },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Templates", href: "/dashboard/templates", icon: Palette },
  { name: "Team", href: "/dashboard/team", icon: Users, badge: "Soon" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const { userTokens, userSubscription } = useTokens();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentRoute = navigation.find(item => item.href === location.pathname) || navigation[0];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0 transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Cyblick</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden ml-auto"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 mr-3",
                    isActive ? "text-blue-700" : "text-gray-400"
                  )} />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Token Display */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Tokens</p>
                  <p className="text-2xl font-bold text-blue-600">{userTokens?.current_tokens || 0}</p>
                </div>
                <Sparkles className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {userSubscription?.plan_id || "Free"} Plan
                </Badge>
              </div>
              <Button size="sm" className="w-full mt-3" asChild>
                <Link to="/dashboard/billing">Upgrade Plan</Link>
              </Button>
            </div>
          </div>

          {/* User Profile */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.user_metadata?.full_name || user?.email}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentRoute.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {currentRoute.name === "Projects" && "Build amazing web applications with AI"}
                  {currentRoute.name === "Analytics" && "Track your usage and performance"}
                  {currentRoute.name === "Templates" && "Start with pre-built templates"}
                  {currentRoute.name === "Team" && "Collaborate with your team"}
                  {currentRoute.name === "Settings" && "Manage your account preferences"}
                  {currentRoute.name === "Billing" && "Manage your subscription and billing"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* New Project Button */}
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};