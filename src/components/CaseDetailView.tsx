import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Download,
  Printer,
  X,
  Link as LinkIcon
} from 'lucide-react';
import { Case } from '@/types';

interface CaseDetailViewProps {
  caseItem: Case | null;
  open: boolean;
  onClose: () => void;
  onExport?: (format: 'pdf' | 'json' | 'csv') => void;
  onPrint?: () => void;
}

export function CaseDetailView({ caseItem, open, onClose, onExport, onPrint }: CaseDetailViewProps) {
  if (!caseItem) return null;

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Case Details</DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onPrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={() => onExport?.('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="space-y-6 pr-4">
            <Card className="p-6 bg-accent/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xl font-bold text-primary">
                      {caseItem.caseNumber}
                    </span>
                    <Badge className={getStatusColor(caseItem.status)}>
                      {caseItem.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{caseItem.crimeType}</h3>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    <span className="text-2xl font-bold text-secondary">
                      {Math.round(caseItem.confidenceScore * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Confidence Score</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">{caseItem.location.address}</p>
                    <p className="text-xs text-muted-foreground">Sector: {caseItem.location.sector}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Date Created</p>
                    <p className="text-muted-foreground">
                      {new Date(caseItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="evidence">Evidence</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="related">Related Cases</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <Card className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Case Description
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {caseItem.description}
                  </p>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Predictive Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-md">
                      <span className="text-sm">Pattern Match Confidence</span>
                      <span className="font-semibold text-secondary">
                        {Math.round(caseItem.confidenceScore * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-md">
                      <span className="text-sm">Risk Assessment</span>
                      <Badge variant={caseItem.confidenceScore > 0.7 ? 'destructive' : 'default'}>
                        {caseItem.confidenceScore > 0.7 ? 'High' : 'Medium'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      AI analysis based on historical crime patterns and temporal data
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="evidence" className="space-y-4">
                <Card className="p-6">
                  <h4 className="font-semibold mb-3">Evidence Index</h4>
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    Evidence management system coming in Phase 4
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <Card className="p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Case Timeline
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <div className="w-px h-full bg-border" />
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold text-sm">Case Created</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(caseItem.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm mt-1">Initial case report filed</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Last Updated</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(caseItem.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="space-y-4">
                <Card className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Related Cases
                  </h4>
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    Case relationship mapping coming in Phase 7
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="p-4 bg-muted/50">
              <p className="text-xs text-muted-foreground text-center">
                Case ID: {caseItem.id} | Read-Only View | All actions are logged
              </p>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
