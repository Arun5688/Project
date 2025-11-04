import { useNavigate } from 'react-router-dom';
import { Shield, User, UserCog } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-crd-navy to-background p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-16 w-16 text-primary glow-blue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-shadow">
            Crime Rate Detector
          </h1>
          <p className="text-muted-foreground text-lg font-mono">
            Law Enforcement Investigation System
          </p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Investigator Login */}
          <Card 
            className="p-8 hover:border-primary transition-all duration-300 cursor-pointer group bg-card/50 backdrop-blur"
            onClick={() => navigate('/investigator-login')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:glow-blue">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Investigator Portal</h2>
              <p className="text-muted-foreground mb-6">
                Access case investigations, voice-driven search, and crime analysis
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Login as Investigator
              </Button>
            </div>
          </Card>

          {/* Admin Login */}
          <Card 
            className="p-8 hover:border-secondary transition-all duration-300 cursor-pointer group bg-card/50 backdrop-blur"
            onClick={() => navigate('/admin-login')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors group-hover:glow-green">
                <UserCog className="h-10 w-10 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Administrator Portal</h2>
              <p className="text-muted-foreground mb-6">
                Manage cases, users, data uploads, and system oversight
              </p>
              <Button variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                Login as Administrator
              </Button>
            </div>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-destructive">⚠</span> Authorized Access Only
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            All activities are monitored and logged for security purposes
          </p>
        </div>
      </div>
    </div>
  );
}
