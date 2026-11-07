import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Terminal, 
  Shield, 
  Menu, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Compass,
  Cpu,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Button, Badge } from './ui/Primitives';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isPlanner = location.pathname.startsWith('/planner');
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl px-5 sm:px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl bg-slate-950/70">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  CYNBIT
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 tracking-wider">
                  PLANNER
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block -mt-0.5">
                ARCHITECTURAL INTELLIGENCE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <Link 
              to="/" 
              className={`hover:text-cyan-400 transition-colors flex items-center gap-1.5 ${location.pathname === '/' ? 'text-cyan-300' : ''}`}
            >
              Platform Overview
            </Link>
            
            <a 
              href="https://www.cynbit.in/" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors group"
            >
              <span>Cynbit Ecosystem</span> 
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
              to="/admin/dashboard" 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                isAdmin 
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' 
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin Console</span>
            </Link>
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {!isPlanner ? (
              <Link to="/planner">
                <Button variant="primary" size="md" icon={Sparkles} iconPosition="left">
                  Start Project Discovery
                </Button>
              </Link>
            ) : (
              <Link to="/">
                <Button variant="secondary" size="md">
                  Exit to Overview
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto glass-card rounded-2xl p-5 border border-white/10 space-y-4 text-xs font-semibold animate-fadeIn bg-slate-950/95 shadow-2xl backdrop-blur-2xl">
          <Link 
            to="/" 
            onClick={() => setMobileOpen(false)} 
            className="block py-2 text-slate-200 hover:text-cyan-400"
          >
            Platform Overview
          </Link>
          <a 
            href="https://www.cynbit.in/" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center justify-between py-2 text-slate-200 hover:text-cyan-400"
          >
            <span>Cynbit Ecosystem</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </a>
          <a 
            href="https://www.cynbit.in/" 
            target="_blank" 
            rel="noreferrer" 
            className="block py-2 text-slate-200 hover:text-cyan-400"
          >
            BitElevate
          </a>
          <Link 
            to="/admin/login" 
            onClick={() => setMobileOpen(false)} 
            className="flex items-center gap-2 py-2 text-slate-300 hover:text-cyan-300"
          >
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Admin Portal</span>
          </Link>
          <div className="pt-2 border-t border-white/10">
            <Link to="/planner" onClick={() => setMobileOpen(false)} className="w-full block">
              <Button variant="primary" size="lg" className="w-full" icon={Sparkles}>
                Start Project Discovery
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
