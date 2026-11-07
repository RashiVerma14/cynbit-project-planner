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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 inline-flex items-center justify-center mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Cynbit Admin Portal</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">SECURE LEAD MANAGEMENT</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1 font-mono">ADMINISTRATOR EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-mono">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold tracking-wide shadow-md shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Authenticate Session'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <span className="text-[10px] text-slate-500 block mb-2 font-mono">EVALUATOR QUICK ACCESS:</span>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 text-xs font-mono flex items-center justify-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Auto-Fill Credentials & Enter</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-400 hover:text-white">← Return to Cynbit Planner Home</Link>
        </div>
      </div>
    </div>
  );
}
