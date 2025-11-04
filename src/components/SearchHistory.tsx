import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Trash2, Download, Bookmark } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchHistoryItem {
  id: string;
  query: string;
  queryType: 'voice' | 'text';
  resultsCount: number;
  timestamp: string;
  bookmarked?: boolean;
}

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  onClearHistory?: () => void;
  onExport?: () => void;
  onSelectItem?: (item: SearchHistoryItem) => void;
}

export function SearchHistory({ items, onClearHistory, onExport, onSelectItem }: SearchHistoryProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Command History</h3>
        </div>
        <div className="flex gap-2">
          {items.length > 0 && (
            <>
              <Button variant="ghost" size="icon" onClick={onExport}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClearHistory}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No commands yet. Start using voice commands to see history here.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem?.(item)}
                className="p-3 rounded-md bg-accent/50 hover:bg-accent cursor-pointer transition-colors border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-1 rounded bg-primary/20 text-primary">
                      {item.queryType.toUpperCase()}
                    </span>
                    {item.bookmarked && (
                      <Bookmark className="h-3 w-3 text-secondary fill-secondary" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm mb-2 line-clamp-2">{item.query}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {item.resultsCount} result{item.resultsCount !== 1 ? 's' : ''}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
