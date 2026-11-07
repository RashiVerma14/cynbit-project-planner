import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05070a] text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-lg text-white font-sans">CYNBIT</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                PROJECT PLANNER
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              From Business Vision to Technical Blueprint. Cynbit Technologies engineers high-performance SaaS architectures, autonomous AI agents, and custom enterprise software.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cynbit Technologies Private Limited • Jaipur, Rajasthan</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1.5">Autonomous AI Agents <ExternalLink className="w-3 h-3 opacity-60" /></a></li>
              <li><a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1.5">Cynbit Studio <ExternalLink className="w-3 h-3 opacity-60" /></a></li>
              <li><a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1.5">TenantEase <ExternalLink className="w-3 h-3 opacity-60" /></a></li>
              <li><a href="https://www.cynbit.in/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1.5">BitElevate Academy <ExternalLink className="w-3 h-3 opacity-60" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/planner" className="hover:text-cyan-400">Interactive Discovery Wizard</Link></li>
              <li><Link to="/" className="hover:text-cyan-400">Effort & Velocity Estimator</Link></li>
              <li><Link to="/admin/login" className="hover:text-cyan-400">Admin Lead Console</Link></li>
              <li><span className="text-xs text-slate-500 flex items-center gap-1"><Cpu className="w-3 h-3 text-cyan-400" /> Groq AI + Rule Engine</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">Direct Contact</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>32/115 Pratap Nagar, Jaipur, Rajasthan 302033</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:support@cynbit.in" className="hover:text-white">support@cynbit.in</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 89479 62667 / +91 78912 09777</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Cynbit Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-slate-400">Full Stack Developer Intern Technical Assessment</span>
            <Link to="/admin/login" className="hover:text-slate-300">Internal Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

