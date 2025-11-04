import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Search, Mic, History, FileText } from 'lucide-react';
import { VoiceCommandCenter } from '@/components/VoiceCommandCenter';

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
          <div className="lg:col-span-2">
            <VoiceCommandCenter />
          </div>

          {/* Search History Sidebar */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Command History</h3>
            </div>
            <div className="text-center py-8 text-muted-foreground text-sm">
              No commands yet. Start using voice commands to see history here.
            </div>
          </Card>
        </div>

        {/* Phase Information */}
        <Card className="p-6 border-primary/20">
          <h3 className="font-semibold mb-2 text-primary">Phase 2 Complete ✓</h3>
          <p className="text-sm text-muted-foreground">
            Voice-based NLP Command Center is now active! Use voice commands to search and filter cases.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
