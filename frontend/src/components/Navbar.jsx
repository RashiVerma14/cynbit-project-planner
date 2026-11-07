import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Shield, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isPlanner = location.pathname.startsWith('/planner');

  return (
    <nav className="sticky top-0 z-50 bg-[#07090e]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center transition-all group-hover:border-cyan-400">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">CYNBIT</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">PLANNER</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block">ARCHITECT ENGINE</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Overview</Link>
            <a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
              Cynbit Ecosystem <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">BitElevate</a>
            <Link to="/admin/login" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900/60">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              Admin Portal
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isPlanner ? (
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Discovery Wizard</span>
              </Link>
            ) : (
              <Link to="/" className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10">
                Exit to Overview
              </Link>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0d121d] border-b border-white/10 px-6 py-6 space-y-4 text-sm">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-slate-200">Overview</Link>
          <a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="flex items-center justify-between text-slate-200">
            <span>Cynbit Ecosystem</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </a>
          <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-slate-300">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Admin Portal</span>
          </Link>
          <Link
            to="/planner"
            onClick={() => setMobileOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Discovery Wizard</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
