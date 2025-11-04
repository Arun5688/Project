import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Search, Mic, History, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InvestigatorDashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Investigator Dashboard</h1>
          <p className="text-muted-foreground">
            Voice-driven case search and investigation tools
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <FileText className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent Searches</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <Search className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Voice Commands</p>
                <p className="text-2xl font-bold mt-1">0</p>
              </div>
              <Mic className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voice Command Center - Main Section */}
          <Card className="lg:col-span-2 p-8">
            <div className="text-center">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Mic className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Voice Command Center</h2>
              <p className="text-muted-foreground mb-6">
                Phase 2 - Coming Soon
              </p>
              <Button disabled className="cursor-not-allowed">
                Activate Voice Commands
              </Button>
            </div>
          </Card>

          {/* Search History Sidebar */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Search History</h3>
            </div>
            <div className="text-center py-8 text-muted-foreground text-sm">
              No search history yet
            </div>
          </Card>
        </div>

        {/* Phase Information */}
        <Card className="p-6 border-primary/20">
          <h3 className="font-semibold mb-2">Phase 1 Complete ✓</h3>
          <p className="text-sm text-muted-foreground">
            Core UI foundation established. Voice-based NLP Command Center coming in Phase 2.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
