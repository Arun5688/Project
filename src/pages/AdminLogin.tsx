import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock validation - will be replaced with actual auth
      await login(email, password, 'admin');
      toast.success('Admin login successful');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-crd-navy to-background p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to selection
        </Link>

        <Card className="p-8 bg-card/50 backdrop-blur border-secondary/20">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 glow-green">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-2xl font-bold">Administrator Login</h1>
            <p className="text-sm text-muted-foreground mt-1 font-mono">System Administration</p>
          </div>

          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-center">
              <span className="text-destructive font-semibold">⚠ ENHANCED SECURITY</span>
              <br />
              <span className="text-xs text-muted-foreground">
                Admin access requires additional verification
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Administrator Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@crd.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-secondary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login to Admin Portal'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="text-destructive">⚠ Authorized Administrators Only</p>
            <p className="text-xs mt-1">All access attempts are logged</p>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Phase 1 - Mock Authentication (MFA coming in Phase 5)
        </p>
      </div>
    </div>
  );
}
