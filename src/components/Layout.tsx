import { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <Link to={user?.role === 'admin' ? '/admin' : '/investigator'} className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary glow-blue" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">CRD</span>
                <span className="text-[10px] text-muted-foreground font-mono">Crime Rate Detector</span>
              </div>
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-medium">{user.email}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {user.badgeNumber || user.role.toUpperCase()}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {user?.role === 'investigator' && (
            <>
              <Link
                to="/investigator"
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent transition-colors"
              >
                <Shield className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </>
          )}
          
          {user?.role === 'admin' && (
            <>
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent transition-colors"
              >
                <Shield className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="container p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
