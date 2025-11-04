import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Users, BarChart3, FileCheck } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Administrator Dashboard</h1>
          <p className="text-muted-foreground">
            System management, user oversight, and data administration
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <Database className="h-8 w-8 text-secondary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <Users className="h-8 w-8 text-secondary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <FileCheck className="h-8 w-8 text-secondary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold mt-1 text-secondary">OK</p>
              </div>
              <BarChart3 className="h-8 w-8 text-secondary opacity-50" />
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="p-6">
          <Tabs defaultValue="data" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="data">Data Management</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="data" className="space-y-4">
              <div className="text-center py-12">
                <Database className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Data Management</h3>
                <p className="text-sm text-muted-foreground">
                  Phase 4 - Data upload and case workflow management coming soon
                </p>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Management</h3>
                <p className="text-sm text-muted-foreground">
                  Phase 4 - User administration and role management coming soon
                </p>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">System Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Phase 4 - Usage metrics and system monitoring coming soon
                </p>
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <div className="text-center py-12">
                <FileCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Audit Logs</h3>
                <p className="text-sm text-muted-foreground">
                  Phase 5 - Security audit and activity logs coming soon
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Phase Information */}
        <Card className="p-6 border-secondary/20">
          <h3 className="font-semibold mb-2">Phase 1 Complete ✓</h3>
          <p className="text-sm text-muted-foreground">
            Core admin UI foundation established. Full admin features coming in Phase 4.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
