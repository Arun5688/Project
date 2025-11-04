import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilters {
  crimeType: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  keyword: string;
}

interface CaseSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}

const CRIME_TYPES = [
  'All Types',
  'Armed Robbery',
  'Burglary',
  'Assault',
  'Theft',
  'Vandalism',
  'Fraud',
  'Homicide',
  'Drug Offense',
  'Arson'
];

export function CaseSearch({ onSearch, onClear }: CaseSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    crimeType: '',
    location: '',
    dateFrom: '',
    dateTo: '',
    keyword: ''
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      crimeType: '',
      location: '',
      dateFrom: '',
      dateTo: '',
      keyword: ''
    });
    onClear();
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Advanced Search</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="keyword">Keyword Search</Label>
          <Input
            id="keyword"
            placeholder="Search by case number, description, suspect..."
            value={filters.keyword}
            onChange={(e) => updateFilter('keyword', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="crimeType">Crime Type</Label>
          <Select value={filters.crimeType} onValueChange={(value) => updateFilter('crimeType', value)}>
            <SelectTrigger id="crimeType">
              <SelectValue placeholder="Select crime type" />
            </SelectTrigger>
            <SelectContent>
              {CRIME_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location / Sector</Label>
          <Input
            id="location"
            placeholder="Enter sector, address, or area..."
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Date From</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateTo">Date To</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Search Cases
          </Button>
          <Button onClick={handleClear} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>
    </Card>
  );
}
