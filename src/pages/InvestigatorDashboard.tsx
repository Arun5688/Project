import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Mic, FileText, Filter } from 'lucide-react';
import { VoiceCommandCenter } from '@/components/VoiceCommandCenter';
import { SearchHistory } from '@/components/SearchHistory';
import { CaseSearch } from '@/components/CaseSearch';
import { SearchResults } from '@/components/SearchResults';
import { CaseDetailView } from '@/components/CaseDetailView';
import { Case } from '@/types';
import { toast } from 'sonner';

export default function InvestigatorDashboard() {
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [caseDetailOpen, setCaseDetailOpen] = useState(false);

  const handleSearch = (filters: any) => {
    toast.info('Searching cases...', {
      description: 'Mock search - Database integration coming in Phase 6'
    });

    const mockResults: Case[] = [
      {
        id: '1',
        caseNumber: 'CRD-2024-001',
        crimeType: 'Armed Robbery',
        location: {
          address: '123 Main Street, Downtown',
          sector: 'Sector 9',
          coordinates: [40.7128, -74.0060]
        },
        description: 'Armed robbery at convenience store. Two suspects fled on foot heading north. Security footage available.',
        status: 'published',
        confidenceScore: 0.87,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        caseNumber: 'CRD-2024-002',
        crimeType: 'Burglary',
        location: {
          address: '456 Oak Avenue, Residential Area',
          sector: 'Sector 12',
          coordinates: [40.7589, -73.9851]
        },
        description: 'Residential burglary with forced entry through rear window. Multiple items reported stolen.',
        status: 'approved',
        confidenceScore: 0.72,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];

    setSearchResults(mockResults);

    const historyItem = {
      id: Date.now().toString(),
      query: filters.keyword || 'Advanced search',
      queryType: 'text' as const,
      resultsCount: mockResults.length,
      timestamp: new Date().toISOString(),
      bookmarked: false
    };
    setSearchHistory(prev => [historyItem, ...prev]);
  };

  const handleClearFilters = () => {
    setSearchResults([]);
    toast.success('Search filters cleared');
  };

  const handleViewDetails = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setCaseDetailOpen(true);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    toast.success('Search history cleared');
  };

  const handleExportHistory = () => {
    toast.info('Export feature coming soon');
  };

  const handleBookmarkCase = (caseId: string) => {
    toast.success('Case bookmarked');
  };

  const handleExportCases = (caseIds: string[]) => {
    toast.info(`Exporting ${caseIds.length} case(s)`, {
      description: 'Export functionality coming in Phase 6'
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Investigator Dashboard</h1>
          <p className="text-muted-foreground">
            Voice-driven case search and investigation tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold mt-1">{searchResults.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent Searches</p>
                <p className="text-2xl font-bold mt-1">{searchHistory.length}</p>
              </div>
              <Search className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Voice Commands</p>
                <p className="text-2xl font-bold mt-1">{searchHistory.filter(h => h.queryType === 'voice').length}</p>
              </div>
              <Mic className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="voice" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="voice">
              <Mic className="h-4 w-4 mr-2" />
              Voice Command
            </TabsTrigger>
            <TabsTrigger value="search">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VoiceCommandCenter />
              </div>
              <SearchHistory
                items={searchHistory}
                onClearHistory={handleClearHistory}
                onExport={handleExportHistory}
              />
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div>
                <CaseSearch
                  onSearch={handleSearch}
                  onClear={handleClearFilters}
                />
              </div>
              <div className="lg:col-span-3">
                <SearchResults
                  cases={searchResults}
                  onViewDetails={handleViewDetails}
                  onBookmark={handleBookmarkCase}
                  onExport={handleExportCases}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="p-6 border-secondary/20">
          <h3 className="font-semibold mb-2 text-secondary">Phase 3 Complete ✓</h3>
          <p className="text-sm text-muted-foreground">
            Full investigator dashboard with case management, advanced search, and result display now active!
          </p>
        </Card>
      </div>

      <CaseDetailView
        caseItem={selectedCase}
        open={caseDetailOpen}
        onClose={() => setCaseDetailOpen(false)}
        onExport={(format) => toast.info(`Export as ${format.toUpperCase()} coming soon`)}
        onPrint={() => toast.info('Print functionality coming soon')}
      />
    </Layout>
  );
}
