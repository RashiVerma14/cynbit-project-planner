import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Loader2, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
      setError(res.error || 'Authentication failed.');
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
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 inline-flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Cynbit Admin Portal</h1>
          <p className="text-xs text-slate-400 font-mono mt-1.5 uppercase tracking-widest">
            OPERATIONAL LEAD CONSOLE
          </p>
        </div>

        <div className="glass-card rounded-3xl p-7 sm:p-9 border border-white/10 shadow-2xl space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1.5 font-mono font-semibold">ADMINISTRATOR EMAIL</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-white text-xs focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1.5 font-mono font-semibold">PASSWORD</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-white text-xs focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl btn-primary-gradient text-white text-xs font-bold tracking-wide shadow-lg shadow-cyan-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Authenticate Session</span>}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <span className="text-[11px] text-slate-500 block mb-2.5 font-mono">
              ASSESSMENT REVIEWER QUICK ACCESS:
            </span>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/25 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Auto-Fill Credentials & Enter</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Cynbit Planner Home
          </Link>
        </div>

      </div>
    </div>
  );
}
