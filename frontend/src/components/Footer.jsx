import React from 'react';
import { 
  Building2, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Heart, 
  Terminal, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05070a]/90 relative mt-auto pt-16 pb-12 overflow-hidden text-xs">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white font-sans">
                  CYNBIT TECHNOLOGIES
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  INNOVATION • CLOUD • AI ENGINEERING
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering visionary startups and modern enterprises with deterministic software architecture, production-grade AI copilot integrations, and high-velocity engineering.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-mono text-[11px] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>Project Planner</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-mono">NEW</span>
                </Link>
              </li>
              <li>
                <a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>Official Cynbit Website</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-cyan-400 transition-colors">
                  Reviewer Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-mono text-[11px] uppercase tracking-wider">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                <span>Generative AI & Agentic LLMs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span>Full-Stack SaaS Platforms</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                <span>Enterprise Cloud Architecture</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span>Mobile Ecosystems (iOS/Android)</span>
              </li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold font-mono text-[11px] uppercase tracking-wider">
              Cynbit Headquarters
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>India • Remote & On-Premises Delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:contact@cynbit.in" className="hover:text-white transition-colors">
                  contact@cynbit.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  www.cynbit.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Cynbit Technologies. Technical Assessment Prototype for Full Stack Developer Intern.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Architected with React 19, Tailwind CSS, Node.js & MongoDB</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
