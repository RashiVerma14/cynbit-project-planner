import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  Terminal, 
  CheckCircle2, 
  KeyRound, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Badge } from '../components/ui/Primitives';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('admin@cynbit.in');
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

  const handleDemoAccess = async () => {
    setEmail('admin@cynbit.in');
    setPassword('CynbitAdmin@2026');
    const res = await login('admin@cynbit.in', 'CynbitAdmin@2026');
    if (res.success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      
      {/* Background Glow Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 inline-flex items-center justify-center mb-4 shadow-xl shadow-cyan-500/10 backdrop-blur-md">
            <Shield className="w-8 h-8 text-cyan-300" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Cynbit Admin Portal</h1>
          <p className="text-xs text-slate-400 font-mono mt-2 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            OPERATIONAL LEAD CONSOLE
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
              <label className="text-slate-300 block mb-1.5 font-mono font-medium text-[11px]">
                ADMINISTRATOR EMAIL
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
              <label className="text-slate-300 block mb-1.5 font-mono font-medium text-[11px]">
                SECURITY PASSWORD
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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
              Authenticate Session
            </Button>
          </form>

          {/* Quick Reviewer Helper */}
          <div className="pt-5 border-t border-white/10 text-center">
            <span className="text-[11px] text-slate-400 block mb-3 font-mono">
              ASSESSMENT REVIEWER ONE-CLICK ACCESS:
            </span>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:border-cyan-400"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Auto-Fill Credentials & Enter</span>
            </button>
          </div>
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
