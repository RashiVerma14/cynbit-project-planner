import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Mail, 
  AlertCircle, 
  KeyRound 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, Button } from '../components/ui/Primitives';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 inline-flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
            <Shield className="w-7 h-7 text-cyan-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="text-sm text-slate-400 mt-2">
            Sign in to manage client project blueprints and inquiries
          </p>
        </div>

        {/* Login Box */}
        <Card className="p-8 sm:p-9 shadow-2xl space-y-6 border border-white/10 relative backdrop-blur-2xl bg-slate-950/80">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1.5 font-medium text-xs">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cynbit.in"
                  className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-white text-xs placeholder:text-slate-600 focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1.5 font-medium text-xs">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security password"
                  className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-white text-xs placeholder:text-slate-600 focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full mt-2"
              icon={KeyRound}
            >
              Sign In to Console
            </Button>
          </form>

        </Card>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
            ← Return to Cynbit Planner Home
          </Link>
        </div>

      </div>
    </div>
  );
}
