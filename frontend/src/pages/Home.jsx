import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, Layers, Clock, CheckCircle2, ShieldCheck, Bot, Zap, Code2, BarChart3, ChevronRight } from 'lucide-react';

export default function Home() {
  const [selectedCat, setSelectedCat] = useState('AI_APP');
  const [selectedTier, setSelectedTier] = useState('INTERMEDIATE');

  const previewEstimates = {
    AI_APP: {
      MVP: { hours: 140, budget: '₹1,20,000 – ₹1,80,000', weeks: 5, tech: 'React, Node.js, Groq LLM, Pinecone' },
      INTERMEDIATE: { hours: 260, budget: '₹2,40,000 – ₹3,50,000', weeks: 8, tech: 'React, Express.js, LangGraph, MongoDB' },
      ENTERPRISE: { hours: 480, budget: '₹4,50,000 – ₹7,00,000', weeks: 14, tech: 'Microservices, Event Streams, Multi-Agent Swarm' }
    },
    SAAS: {
      MVP: { hours: 120, budget: '₹1,00,000 – ₹1,60,000', weeks: 4, tech: 'React, Node.js, MongoDB Atlas, Stripe' },
      INTERMEDIATE: { hours: 220, budget: '₹2,00,000 – ₹3,20,000', weeks: 7, tech: 'React, Express.js, Multi-tenant DB, Redis' },
      ENTERPRISE: { hours: 440, budget: '₹4,00,000 – ₹6,50,000', weeks: 13, tech: 'Docker, Express Microservices, Kafka, Vault' }
    },
    MOBILE: {
      MVP: { hours: 100, budget: '₹90,000 – ₹1,40,000', weeks: 4, tech: 'React Native, Node.js, MongoDB' },
      INTERMEDIATE: { hours: 190, budget: '₹1,80,000 – ₹2,80,000', weeks: 6, tech: 'React Native, Express.js, AWS S3' },
      ENTERPRISE: { hours: 380, budget: '₹3,50,000 – ₹5,50,000', weeks: 12, tech: 'Native Swift/Kotlin + Express Cluster + Multi-AZ' }
    }
  };

  const current = previewEstimates[selectedCat][selectedTier];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none -z-10" />

      {/* Hero */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-8">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYNBIT ARCHITECTURAL INTELLIGENCE ENGINE</span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Turn Your Vision Into a <br />
          <span className="text-gradient-cyan">Technical Blueprint.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Discover the right technology, understand your project scope and explore an estimated development roadmap with Cynbit Project Planner.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/planner"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 transition-all"
          >
            <span>Start Your Project Discovery</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="https://www.cynbit.in/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-white/10 text-base transition-colors"
          >
            <span>Explore Cynbit</span>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </a>
        </div>
      </section>

      {/* Interactive Simulation Sandbox */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-cyan-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Instant Discovery Sandbox</span>
              <h2 className="text-2xl font-bold text-white mt-1">Explore Indicative Project Dynamics</h2>
            </div>
            <Link to="/planner" className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1">
              Launch Full 7-Step Wizard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2">1. PROJECT DISCIPLINE</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'AI_APP', label: 'AI Platform' },
                    { id: 'SAAS', label: 'SaaS Suite' },
                    { id: 'MOBILE', label: 'Mobile App' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedCat === cat.id ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-slate-900/40 border-white/5 text-slate-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2">2. SYSTEM COMPLEXITY</label>
                <div className="grid grid-cols-3 gap-2">
                  {['MVP', 'INTERMEDIATE', 'ENTERPRISE'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedTier(lvl)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedTier === lvl ? 'bg-indigo-500/20 border-indigo-400 text-white' : 'bg-slate-900/40 border-white/5 text-slate-400'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#080c14] rounded-xl p-6 border border-white/10 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400">EST. EFFORT</div>
                  <div className="text-xl font-bold text-white font-mono mt-1">{current.hours} hrs</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400">INDICATIVE BUDGET</div>
                  <div className="text-sm font-bold text-cyan-300 mt-1">{current.budget}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400">VELOCITY</div>
                  <div className="text-xl font-bold text-indigo-300 font-mono mt-1">~{current.weeks} wks</div>
                </div>
              </div>
              <div className="text-xs font-mono p-3 rounded-lg bg-slate-900 border border-cyan-500/20 text-cyan-200">
                Recommended: {current.tech}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works: 3 Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">METHODOLOGY</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Three Stages to Your Blueprint</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="text-xs font-mono text-cyan-400 mb-2">STAGE 01</div>
            <h3 className="text-lg font-bold text-white mb-2">Define Your Vision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Specify project scope, audience, required features, and scale parameters in our 7-step wizard.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20">
            <div className="text-xs font-mono text-indigo-400 mb-2">STAGE 02</div>
            <h3 className="text-lg font-bold text-white mb-2">Discover Your Solution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Explore deterministic effort calculations, tech recommendations, and Groq AI architectural specs.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="text-xs font-mono text-emerald-400 mb-2">STAGE 03</div>
            <h3 className="text-lg font-bold text-white mb-2">Connect With Cynbit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Export your specification as a PDF and request a dedicated architectural consultation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
