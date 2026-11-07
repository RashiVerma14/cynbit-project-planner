import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  Zap, 
  Code2, 
  BarChart3, 
  ChevronRight,
  SlidersHorizontal,
  Compass,
  FileCheck2,
  Boxes,
  Database,
  ArrowUpRight
} from 'lucide-react';

export default function Home() {
  const [selectedCat, setSelectedCat] = useState('AI_APP');
  const [selectedTier, setSelectedTier] = useState('INTERMEDIATE');

  const previewEstimates = {
    AI_APP: {
      MVP: { hours: 140, budget: '₹1,25,000 – ₹1,90,000', weeks: 5, tech: 'React, Node.js, Groq LLM, Pinecone' },
      INTERMEDIATE: { hours: 260, budget: '₹2,35,000 – ₹3,50,000', weeks: 8, tech: 'React, Express.js, LangGraph, MongoDB Atlas' },
      ENTERPRISE: { hours: 480, budget: '₹4,30,000 – ₹6,50,000', weeks: 14, tech: 'Docker Microservices, WebSockets, Kafka, Swarm' }
    },
    SAAS: {
      MVP: { hours: 120, budget: '₹1,10,000 – ₹1,65,000', weeks: 4, tech: 'React 19, Express, MongoDB Atlas, Stripe' },
      INTERMEDIATE: { hours: 220, budget: '₹2,00,000 – ₹3,00,000', weeks: 7, tech: 'React, Express.js, Multi-tenant DB, Redis' },
      ENTERPRISE: { hours: 440, budget: '₹3,95,000 – ₹5,95,000', weeks: 13, tech: 'AWS ECS, Express Cluster, Multi-Region DB' }
    },
    MOBILE: {
      MVP: { hours: 100, budget: '₹90,000 – ₹1,35,000', weeks: 4, tech: 'React Native, Node.js, MongoDB Atlas' },
      INTERMEDIATE: { hours: 190, budget: '₹1,70,000 – ₹2,55,000', weeks: 6, tech: 'React Native, Express.js, AWS S3, Firebase' },
      ENTERPRISE: { hours: 380, budget: '₹3,40,000 – ₹5,10,000', weeks: 12, tech: 'Native Swift/Kotlin, Express API Gateway, Microservices' }
    }
  };

  const current = previewEstimates[selectedCat][selectedTier];

  return (
    <div className="relative overflow-hidden">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-ambient-glow pointer-events-none -z-10" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-[600px] bg-grid-mesh pointer-events-none -z-10 opacity-70" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYNBIT ARCHITECTURAL INTELLIGENCE ENGINE</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]"
        >
          Turn Your Vision Into a <br className="hidden sm:inline" />
          <span className="gradient-cyan-indigo">Technical Blueprint.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Discover the right technology, understand your project scope and explore an estimated development roadmap with Cynbit Project Planner.
        </motion.p>

        {/* Primary & Secondary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            to="/planner"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl btn-primary-gradient text-white font-bold text-base shadow-xl shadow-cyan-500/30 group"
          >
            <span>Start Your Project Discovery</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://www.cynbit.in/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 font-semibold text-base transition-all"
          >
            <span>Explore Cynbit</span>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </a>
        </motion.div>

        {/* Highlight Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10 text-left">
          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Groq AI Powered</div>
              <div className="text-[11px] text-slate-400">Architectural blueprinting</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Deterministic WBS</div>
              <div className="text-[11px] text-slate-400">Calibrated effort hours</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Sprint Roadmap</div>
              <div className="text-[11px] text-slate-400">4 delivery milestones</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Enterprise Scalable</div>
              <div className="text-[11px] text-slate-400">Node.js + MongoDB Atlas</div>
            </div>
          </div>
        </div>

      </section>

      {/* Interactive Architecture Simulator */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/25 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Instant Discovery Sandbox
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Explore Indicative Project Dynamics
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select your intended discipline and maturity tier to simulate how our estimation model calculates velocity.
              </p>
            </div>

            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold self-start md:self-auto transition-all"
            >
              <span>Launch Full 7-Step Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* Interactive Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2 font-mono">
                  1. PROJECT DISCIPLINE
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'AI_APP', label: 'AI Platform', icon: Bot },
                    { id: 'SAAS', label: 'SaaS Suite', icon: Layers },
                    { id: 'MOBILE', label: 'Mobile App', icon: Zap }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCat === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCat(cat.id)}
                        className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-102'
                            : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2 font-mono">
                  2. SYSTEM MATURITY TIER
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'MVP', label: 'MVP' },
                    { id: 'INTERMEDIATE', label: 'Mid-Scale' },
                    { id: 'ENTERPRISE', label: 'Enterprise' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setSelectedTier(lvl.id)}
                      className={`p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedTier === lvl.id
                          ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/20 scale-102'
                          : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 space-y-1">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Calibrated Real-World Assumptions</span>
                </div>
                <p>
                  Calculated based on verified engineering sprint velocity ($900–$1,350/hr calibrated team rate).
                </p>
              </div>
            </div>

            {/* Dynamic Output HUD */}
            <div className="lg:col-span-7 bg-[#090d16] rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between shadow-inner">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                    SIMULATION OUTPUT
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                    CONFIDENCE: 94%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5">
                    <div className="text-xs text-slate-400 font-mono">ESTIMATED DEV EFFORT</div>
                    <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                      {current.hours} <span className="text-xs text-cyan-400 font-normal">hrs</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Calibrated work breakdown</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5">
                    <div className="text-xs text-slate-400 font-mono">INDICATIVE BUDGET</div>
                    <div className="text-base font-extrabold text-cyan-300 mt-1 font-sans">
                      {current.budget}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Planning investment band</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5">
                    <div className="text-xs text-slate-400 font-mono">PROJECTED VELOCITY</div>
                    <div className="text-3xl font-extrabold text-indigo-300 mt-1 font-mono">
                      ~{current.weeks} <span className="text-xs text-slate-400 font-normal">wks</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">4 development phases</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400">RECOMMENDED ARCHITECTURE STACK</div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-xs font-mono text-cyan-200">
                    {current.tech}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Ready to configure your custom project features?
                </span>
                <Link
                  to="/planner"
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Configure Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 3-Step Methodology */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Three Stages to Your Blueprint
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Replace ambiguity with engineering clarity before committing valuable resources to software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl glass-card-hover group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-xs font-mono text-cyan-400 mb-2">STAGE 01</div>
            <h3 className="text-xl font-bold text-white mb-2">Define Your Vision</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Answer targeted prompts about your project category, target audience, business problem, and capability requirements.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl glass-card-hover group border-cyan-500/25">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="text-xs font-mono text-indigo-400 mb-2">STAGE 02</div>
            <h3 className="text-xl font-bold text-white mb-2">Discover Your Solution</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our dual engine pairs a deterministic mathematical model with Groq AI to formulate effort hours, tech stack justifications, and roadmaps.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl glass-card-hover group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-2">STAGE 03</div>
            <h3 className="text-xl font-bold text-white mb-2">Connect With Cynbit</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Export your structured blueprint as a PDF or submit it directly to Cynbit's engineering leads for a high-fidelity technical consultation.
            </p>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#06080d] border-y border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                PLATFORM ADVANTAGES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
                Architectural Clarity Before the First Line of Code
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
                Most digital transformation projects fail or encounter budget overruns because requirements remain vague and tech stacks are chosen without foresight. Cynbit Project Planner solves this upfront.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { title: 'Personalized Technology Stack', desc: 'No cookie-cutter templates. Recommendations match your scale and latency requirements.' },
                  { title: 'Indicative Budget Certainty', desc: 'Detailed effort hours categorized by frontend, backend, AI orchestration, and QA.' },
                  { title: 'Phased Sprint Roadmap', desc: 'Milestone breakdown from Discovery to Core Engineering, Testing, and Production Rollout.' },
                  { title: 'Executive PDF Blueprint Export', desc: 'Download a clean, shareable dossier to align internal co-founders or stakeholders.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Preview Terminal */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-2xl font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-500">cynbit-blueprint-engine.sh</span>
              </div>
              <div className="space-y-2 text-slate-400 leading-relaxed">
                <p className="text-cyan-400">$ cynbit-architect --init --project "NovaOps AI"</p>
                <p className="text-slate-300">✔ Category: AI-POWERED ENTERPRISE APPLICATION</p>
                <p className="text-slate-300">✔ Calibrated capabilities: [AUTH_RBAC, AGENTS, WEBSOCKETS, STRIPE]</p>
                <p className="text-slate-300">✔ Synthesizing Groq LLM architecture specs...</p>
                <p className="text-emerald-400">✔ Blueprint ready: CYN-2026-8942 generated in 1.14s</p>
                <div className="p-3 my-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-200">
                  Total Effort: 420 Hours | Timeline: 12 Weeks <br />
                  Frontend: React.js (Vite) + Tailwind CSS <br />
                  Backend: Node.js & Express.js <br />
                  Database: MongoDB Atlas <br />
                  AI Engine: Groq LLM (Llama 3.3 70B)
                </div>
                <p className="text-slate-500">Ready for consultation review with Cynbit engineering.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cynbit Ecosystem Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
          THE CYNBIT ECOSYSTEM
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          Backed by High-Performance Digital Products
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-3">
          Cynbit Technologies designs, builds, and maintains cutting-edge products across AI, education, and SaaS.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
            <div className="text-xs font-mono text-cyan-400 mb-1.5 font-semibold">FLAGSHIP PLATFORM</div>
            <h3 className="text-lg font-bold text-white">Cynbit Studio</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Career intelligence and coding mission engine bridging education to enterprise readiness through AI assessments.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="text-xs font-mono text-indigo-400 mb-1.5 font-semibold">PROPERTY SAAS</div>
            <h3 className="text-lg font-bold text-white">TenantEase</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Automated tenant onboarding, centralized rent collection workflows, and multi-property operational management.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all">
            <div className="text-xs font-mono text-purple-400 mb-1.5 font-semibold">REPUTATION AI</div>
            <h3 className="text-lg font-bold text-white">Revio</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              AI-first customer sentiment analysis and automated review orchestration to guard brand prestige across platforms.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
            <div className="text-xs font-mono text-emerald-400 mb-1.5 font-semibold">ACADEMY & MASTERY</div>
            <h3 className="text-lg font-bold text-white">BitElevate</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Immersive technical masterclasses and learning pathways designed to produce elite full-stack and AI engineers.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="glass-card rounded-3xl p-10 sm:p-16 border border-cyan-500/30 relative overflow-hidden bg-gradient-to-b from-cyan-950/20 to-slate-900/60">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Engineer Your Blueprint?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Spend 3 minutes defining your requirements. Receive an indicative budget, timeline, and architectural recommendation.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/planner"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl btn-primary-gradient text-white font-bold text-base shadow-xl shadow-cyan-500/30"
            >
              <span>Launch Project Discovery Wizard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
