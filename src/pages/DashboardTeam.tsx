import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Mail, Crown, Shield } from "lucide-react";

const DashboardTeam = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Collaboration</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Invite team members to collaborate on projects and share resources. Team features are coming soon!
            </p>
            <Badge className="bg-yellow-100 text-yellow-800 mb-4">
              Coming Soon
            </Badge>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button disabled>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Team Members
              </Button>
              <Button variant="outline" disabled>
                <Mail className="w-4 h-4 mr-2" />
                Get Notified
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                Team Roles
              </CardTitle>
              <CardDescription>Different permission levels for team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Owner</p>
                  <p className="text-sm text-gray-500">Full access to all features</p>
                </div>
                <Badge>You</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                <div>
                  <p className="font-medium">Admin</p>
                  <p className="text-sm text-gray-500">Manage projects and members</p>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                <div>
                  <p className="font-medium">Member</p>
                  <p className="text-sm text-gray-500">Create and edit projects</p>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                Team Features
              </CardTitle>
              <CardDescription>What you'll get with team collaboration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Real-time project collaboration
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Shared template library
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Team analytics and reporting
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Centralized billing management
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Project permissions and access control
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade CTA */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready for team collaboration?</h3>
            <p className="text-purple-100 mb-6">
              Upgrade to Premium or Enterprise to unlock team features when they're available.
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              View Pricing Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTeam;