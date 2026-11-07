import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Shield, Menu, X, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isPlanner = location.pathname.startsWith('/planner');

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl px-5 sm:px-6 py-3.5 flex items-center justify-between border border-white/10 shadow-xl shadow-black/40">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">CYNBIT</span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 tracking-wider">
                  PLANNER
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block -mt-0.5">
                ARCHITECTURAL INTELLIGENCE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Platform Overview
            </Link>
            <a 
              href="https://www.cynbit.in/" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              Cynbit Ecosystem <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a 
              href="https://www.cynbit.in/" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-cyan-400 transition-colors"
            >
              BitElevate
            </a>
            <Link 
              to="/admin/login" 
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-white/5 bg-slate-900/60 hover:border-white/15 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin Portal</span>
            </Link>
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {!isPlanner ? (
              <Link
                to="/planner"
                className="btn-primary-gradient px-5 py-2.5 rounded-xl text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Start Project Discovery</span>
              </Link>
            ) : (
              <Link 
                to="/" 
                className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
              >
                Exit to Overview
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto glass-card rounded-2xl p-6 border border-white/10 space-y-4 text-sm animate-fadeIn">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-slate-200 font-medium">Platform Overview</Link>
          <a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="flex items-center justify-between text-slate-200 font-medium">
            <span>Cynbit Ecosystem</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </a>
          <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-slate-300 font-medium">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Admin Portal</span>
          </Link>
          <div className="pt-2">
            <Link
              to="/planner"
              onClick={() => setMobileOpen(false)}
              className="w-full btn-primary-gradient py-3 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Project Discovery</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
