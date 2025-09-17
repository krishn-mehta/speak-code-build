import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardTemplates from "./pages/DashboardTemplates";
import DashboardBilling from "./pages/DashboardBilling";
import DashboardTeam from "./pages/DashboardTeam";
import DashboardSettings from "./pages/DashboardSettings";
import CreateWebsite from "./pages/CreateWebsite";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";

// Legal Pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import Security from "./pages/legal/Security";

// Resource Pages
import Documentation from "./pages/resources/Documentation";
import Templates from "./pages/resources/Templates";
import Examples from "./pages/resources/Examples";
import Blog from "./pages/resources/Blog";

// Support Pages
import HelpCenter from "./pages/support/HelpCenter";
import Community from "./pages/support/Community";
import ContactUs from "./pages/support/ContactUs";
import Status from "./pages/support/Status";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
            <Route path="/dashboard/templates" element={<DashboardTemplates />} />
            <Route path="/dashboard/team" element={<DashboardTeam />} />
            <Route path="/dashboard/settings" element={<DashboardSettings />} />
            <Route path="/dashboard/billing" element={<DashboardBilling />} />
            <Route path="/create" element={<CreateWebsite />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Legal Pages */}
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/legal/security" element={<Security />} />
            
            {/* Resource Pages */}
            <Route path="/resources/documentation" element={<Documentation />} />
            <Route path="/resources/templates" element={<Templates />} />
            <Route path="/resources/examples" element={<Examples />} />
            <Route path="/resources/blog" element={<Blog />} />
            
            {/* Support Pages */}
            <Route path="/support/help" element={<HelpCenter />} />
            <Route path="/support/community" element={<Community />} />
            <Route path="/support/contact" element={<ContactUs />} />
            <Route path="/support/status" element={<Status />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;