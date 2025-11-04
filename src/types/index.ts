export type UserRole = 'investigator' | 'admin';

export interface User {
  id: string;
  badgeNumber?: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Case {
  id: string;
  caseNumber: string;
  crimeType: string;
  location: {
    address: string;
    sector: string;
    coordinates?: [number, number];
  };
  description: string;
  status: 'pending' | 'under_review' | 'approved' | 'published';
  confidenceScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface SearchQuery {
  id: string;
  userId: string;
  query: string;
  queryType: 'voice' | 'text';
  resultsCount: number;
  createdAt: string;
}
