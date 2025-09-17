import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTokens } from "@/hooks/useTokens";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FolderOpen,
  Plus,
  Sparkles,
  Settings,
  LogOut,
  Zap,
  History,
  Globe
} from "lucide-react";

const navigationItems = [
  { title: "Chat", url: "/app", icon: Sparkles },
  { title: "Projects", url: "/app/projects", icon: FolderOpen },
  { title: "History", url: "/app/history", icon: History },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { userTokens } = useTokens();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isExpanded = navigationItems.some((item) => isActive(item.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-background border-r">
        {/* Header */}
        <div className="p-4 border-b">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Cyblick</h1>
                <p className="text-xs text-muted-foreground">AI Website Builder</p>
              </div>
            </div>
          )}
        </div>

        {/* New Project Button */}
        <div className="p-4">
          <Button className="w-full bg-primary hover:bg-primary/90" size={collapsed ? "sm" : "default"}>
            <Plus className="w-4 h-4" />
            {!collapsed && <span className="ml-2">New Project</span>}
          </Button>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Token Display */}
        {!collapsed && (
          <div className="p-4 mt-auto">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Tokens</span>
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {userTokens?.current_tokens || 0}
              </div>
              <Badge variant="outline" className="text-xs mt-2">
                Free Plan
              </Badge>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.email || 'User'}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}