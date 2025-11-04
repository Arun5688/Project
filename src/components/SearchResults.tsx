import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, MapPin, Calendar, TrendingUp, Eye, Bookmark, Download } from 'lucide-react';
import { Case } from '@/types';

interface SearchResultsProps {
  cases: Case[];
  onViewDetails: (caseItem: Case) => void;
  onBookmark?: (caseId: string) => void;
  onExport?: (caseIds: string[]) => void;
}

export function SearchResults({ cases, onViewDetails, onBookmark, onExport }: SearchResultsProps) {
  const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());

  const toggleSelection = (caseId: string) => {
    setSelectedCases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(caseId)) {
        newSet.delete(caseId);
      } else {
        newSet.add(caseId);
      }
      return newSet;
    });
  };

  const handleExportSelected = () => {
    if (onExport && selectedCases.size > 0) {
      onExport(Array.from(selectedCases));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-secondary/20 text-secondary border-secondary/50';
      case 'approved':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'under_review':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold mb-1">Search Results</h3>
          <p className="text-sm text-muted-foreground">
            {cases.length} case{cases.length !== 1 ? 's' : ''} found
            {selectedCases.size > 0 && ` • ${selectedCases.size} selected`}
          </p>
        </div>
        {selectedCases.size > 0 && (
          <Button onClick={handleExportSelected} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Selected
          </Button>
        )}
      </div>

      <ScrollArea className="h-[700px]">
        {cases.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h4 className="text-lg font-semibold mb-2">No Cases Found</h4>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search filters or use voice commands to search
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer border-border"
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedCases.has(caseItem.id)}
                    onChange={() => toggleSelection(caseItem.id)}
                    className="mt-1 rounded border-border"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="flex-1" onClick={() => onViewDetails(caseItem)}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-semibold text-primary">
                            {caseItem.caseNumber}
                          </span>
                          <Badge className={getStatusColor(caseItem.status)}>
                            {caseItem.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-base mb-1">{caseItem.crimeType}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          <span>{Math.round(caseItem.confidenceScore * 100)}%</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {caseItem.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{caseItem.location.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(caseItem.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(caseItem);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookmark?.(caseItem.id);
                        }}
                      >
                        <Bookmark className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
