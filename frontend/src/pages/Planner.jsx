import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Layers, Globe, Smartphone, Workflow, ShoppingCart, Building2, HelpCircle, Lock, Sliders, CreditCard, MessageSquare, BarChart, Bell, Cpu, Database, Zap, CheckCircle2, AlertCircle, Loader2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { projectService } from '../services/api';
import confetti from 'canvas-confetti';

export default function Planner() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    category: 'AI_POWERED_APP',
    projectName: '',
    description: '',
    problemStatement: '',
    targetAudience: '',
    industry: '',
    selectedCapabilities: ['AUTH_RBAC', 'AI_AGENTS', 'ADMIN_DASHBOARD', 'ANALYTICS_REPORTING', 'CLOUD_INFRASTRUCTURE'],
    complexity: 'INTERMEDIATE',
    expectedUsers: '1,000 - 10,000 active users',
    techPreferenceMode: 'CYNBIT_RECOMMENDED',
    preferredFrontend: 'React.js',
    preferredBackend: 'Node.js & Express.js',
    budgetRange: '₹1,00,000–₹3,00,000',
    isBudgetFlexible: true,
    timelinePreference: '1–2 months',
    fullName: '',
    businessEmail: '',
    companyName: '',
    phoneNumber: '',
    privacyConsent: true
  });

  const [liveMetrics, setLiveMetrics] = useState({ hours: 260, minBudget: '₹2,34,000', maxBudget: '₹3,51,000', weeks: 8 });

  useEffect(() => {
    const baseMap = { AI_POWERED_APP: 130, SAAS_PLATFORM: 110, WEB_APP: 70, MOBILE_APP: 85, BUSINESS_AUTOMATION: 75, ECOMMERCE: 90, CUSTOM_ENTERPRISE: 150, OTHER: 80 };
    const multMap = { BASIC_MVP: 1.0, INTERMEDIATE: 1.35, ADVANCED: 1.75, ENTERPRISE: 2.25 };
    const base = baseMap[formData.category] || 90;
    const caps = formData.selectedCapabilities.length * 20;
    const mult = multMap[formData.complexity] || 1.35;
    const hours = Math.round((base + caps) * mult);
    setLiveMetrics({
      hours,
      minBudget: `₹${(hours * 900).toLocaleString('en-IN')}`,
      maxBudget: `₹${(hours * 1350).toLocaleString('en-IN')}`,
      weeks: Math.max(3, Math.ceil(hours / 36))
    });
  }, [formData.category, formData.selectedCapabilities, formData.complexity]);

  const validate = () => {
    setErrorMsg('');
    if (currentStep === 2) {
      if (!formData.projectName.trim()) { setErrorMsg('Please enter a project name.'); return false; }
      if (formData.description.trim().length < 15) { setErrorMsg('Please enter a short description (at least 15 characters).'); return false; }
      if (!formData.problemStatement.trim()) { setErrorMsg('Please describe the problem being solved.'); return false; }
    } else if (currentStep === 3 && formData.selectedCapabilities.length === 0) {
      setErrorMsg('Please select at least one required capability.');
      return false;
    } else if (currentStep === 7) {
      if (!formData.fullName.trim()) { setErrorMsg('Please enter your full name.'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) { setErrorMsg('Please enter a valid business email.'); return false; }
      if (!formData.privacyConsent) { setErrorMsg('Please consent to privacy policy.'); return false; }
    }
    return true;
  };

  const handleNext = () => { if (validate()) setCurrentStep((p) => Math.min(p + 1, 7)); };
  const handleBack = () => { setErrorMsg(''); setCurrentStep((p) => Math.max(p - 1, 1)); };

  const toggleCap = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedCapabilities: prev.selectedCapabilities.includes(id)
        ? prev.selectedCapabilities.filter((c) => c !== id)
        : [...prev.selectedCapabilities, id]
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        clientInfo: { fullName: formData.fullName, businessEmail: formData.businessEmail, companyName: formData.companyName, phone: formData.phoneNumber },
        projectScope: { category: formData.category, projectName: formData.projectName, description: formData.description, problemStatement: formData.problemStatement, targetAudience: formData.targetAudience, industry: formData.industry },
        technicalRequirements: { selectedCapabilities: formData.selectedCapabilities, complexity: formData.complexity, expectedUsers: formData.expectedUsers },
        userPreferences: { budgetRange: formData.budgetRange, isBudgetFlexible: formData.isBudgetFlexible, timelinePreference: formData.timelinePreference }
      };

      const res = await projectService.submitProject(payload);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      const pId = res.data?.data?.projectId || res.data?.projectId || 'CYN-' + Math.floor(1000 + Math.random() * 9000);
      navigate(`/results/${pId}`);
    } catch (e) {
      const offlineId = 'CYN-' + Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem(`cynbit_preview_${offlineId}`, JSON.stringify({ ...formData, projectId: offlineId, createdAt: new Date().toISOString() }));
      navigate(`/results/${offlineId}`);
    } finally {
      setSubmitting(false);
    }
  };

  const stepsList = ['Scope', 'Vision', 'Capabilities', 'Scale', 'Stack', 'Budget', 'Review'];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-white">Project Specification & Blueprint</h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">Step {currentStep} of 7 — {stepsList[currentStep - 1]}</p>
      </div>

      {/* Progress */}
      <div className="max-w-3xl mx-auto mb-10 flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 -z-10" />
        <div className="absolute top-1/2 left-0 h-0.5 bg-cyan-500 -translate-y-1/2 -z-10 transition-all duration-300" style={{ width: `${((currentStep - 1) / 6) * 100}%` }} />
        {stepsList.map((st, i) => (
          <div key={st} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
              i + 1 < currentStep ? 'bg-cyan-500 text-black' : i + 1 === currentStep ? 'bg-cyan-500 text-black ring-4 ring-cyan-500/20' : 'bg-slate-900 border border-slate-700 text-slate-500'
            }`}>
              {i + 1 < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 hidden sm:block">{st}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <h2 className="text-xl font-bold text-white">What are you looking to build?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'AI_POWERED_APP', label: 'AI-Powered Application', icon: Bot, desc: 'Autonomous agents, LLM copilots, RAG pipelines' },
                    { id: 'SAAS_PLATFORM', label: 'SaaS Platform', icon: Layers, desc: 'Multi-tenant subscription web service' },
                    { id: 'WEB_APP', label: 'Web Application', icon: Globe, desc: 'Interactive customer portal or enterprise tool' },
                    { id: 'MOBILE_APP', label: 'Mobile Application', icon: Smartphone, desc: 'Cross-platform iOS and Android app' },
                    { id: 'BUSINESS_AUTOMATION', label: 'Business Automation', icon: Workflow, desc: 'Workflow integration & document parsing' },
                    { id: 'CUSTOM_ENTERPRISE', label: 'Custom Enterprise Software', icon: Building2, desc: 'High-security microservices & ERP bridge' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = formData.category === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setFormData({ ...formData, category: item.id })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          active ? 'bg-cyan-500/15 border-cyan-400' : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                          <div className="text-xs font-semibold text-white">{item.label}</div>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-xs">
                <h2 className="text-xl font-bold text-white">Project Vision & Business Objective</h2>
                <div>
                  <label className="text-slate-300 block mb-1 font-mono">PROJECT NAME *</label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="e.g. NovaOps Intelligent Copilot"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-mono">SHORT DESCRIPTION * (min 15 chars)</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe user journey and platform capabilities..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-mono">BUSINESS PROBLEM BEING SOLVED *</label>
                  <textarea
                    rows={2}
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                    placeholder="What friction or manual overhead does this eliminate?"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Required Technical Capabilities</h2>
                  <span className="text-xs font-mono text-cyan-400">{formData.selectedCapabilities.length} selected</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[400px] overflow-y-auto pr-1">
                  {[
                    { id: 'AUTH_RBAC', label: 'Auth & Role-Based Access' },
                    { id: 'ADMIN_DASHBOARD', label: 'Admin Management Console' },
                    { id: 'PAYMENT_GATEWAY', label: 'Payment Gateway (Stripe/Razorpay)' },
                    { id: 'AI_CHATBOT', label: 'AI Virtual Assistant' },
                    { id: 'AI_AGENTS', label: 'Autonomous AI Agents' },
                    { id: 'ANALYTICS_REPORTING', label: 'Analytics & Reporting' },
                    { id: 'REALTIME_NOTIFICATIONS', label: 'WebSockets & Live Push' },
                    { id: 'CLOUD_INFRASTRUCTURE', label: 'Cloud CI/CD & Docker' },
                  ].map((cap) => {
                    const checked = formData.selectedCapabilities.includes(cap.id);
                    return (
                      <div
                        key={cap.id}
                        onClick={() => toggleCap(cap.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                          checked ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-slate-900/40 border-white/5 text-slate-400'
                        }`}
                      >
                        <span>{cap.label}</span>
                        <input type="checkbox" checked={checked} onChange={() => {}} className="accent-cyan-500 rounded" />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-xs">
                <h2 className="text-xl font-bold text-white">System Complexity Tier</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'BASIC_MVP', title: 'Basic MVP', mult: '1.0x' },
                    { id: 'INTERMEDIATE', title: 'Intermediate', mult: '1.35x' },
                    { id: 'ADVANCED', title: 'Advanced High-Concurrency', mult: '1.75x' },
                    { id: 'ENTERPRISE', title: 'Mission-Critical Enterprise', mult: '2.25x' },
                  ].map((lvl) => (
                    <div
                      key={lvl.id}
                      onClick={() => setFormData({ ...formData, complexity: lvl.id })}
                      className={`p-3 rounded-xl border cursor-pointer ${
                        formData.complexity === lvl.id ? 'bg-indigo-500/15 border-indigo-400 text-white' : 'bg-slate-900/40 border-white/5 text-slate-400'
                      }`}
                    >
                      <div className="flex justify-between font-bold">
                        <span>{lvl.title}</span>
                        <span className="font-mono text-cyan-400">{lvl.mult}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-xs">
                <h2 className="text-xl font-bold text-white">Technology Stack Preference</h2>
                <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/20 space-y-2">
                  <span className="text-cyan-400 font-mono font-bold block">CYNBIT RECOMMENDED STACK:</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>Frontend: <span className="text-white font-medium">React 19 + Tailwind</span></div>
                    <div>Backend: <span className="text-white font-medium">Node.js & Express.js</span></div>
                    <div>Database: <span className="text-white font-medium">MongoDB Atlas</span></div>
                    <div>AI: <span className="text-white font-medium">Groq LLM + Vector DB</span></div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-xs">
                <h2 className="text-xl font-bold text-white">Target Budget & Velocity</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Below ₹50,000', '₹50,000–₹1,00,000', '₹1,00,000–₹3,00,000', '₹3,00,000–₹5,00,000', 'Above ₹5,00,000', 'Flexible'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetRange: b })}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        formData.budgetRange === b ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-slate-900 border-white/5 text-slate-400'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 7 && (
              <motion.div key="s7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-xs">
                <h2 className="text-xl font-bold text-white">Lead Dossier & Blueprint Generation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1 font-mono">FULL NAME *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1 font-mono">BUSINESS EMAIL *</label>
                    <input
                      type="email"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="accent-cyan-500 rounded"
                  />
                  <label htmlFor="consent" className="text-[11px] text-slate-400 cursor-pointer">
                    I agree to allow Cynbit Technologies to process this project blueprint specification.
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button onClick={handleBack} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-slate-300 text-xs hover:bg-slate-800">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>
            ) : <div />}

            {currentStep < 7 ? (
              <button onClick={handleNext} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-cyan-500/20">
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Synthesize Blueprint</span>
              </button>
            )}
          </div>
        </div>

        {/* Live HUD */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-cyan-500/20 space-y-4 sticky top-28">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">ESTIMATION HUD</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">DEV EFFORT</span>
            <div className="text-2xl font-bold text-white font-mono">{liveMetrics.hours} hrs</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">INDICATIVE BUDGET</span>
            <div className="text-base font-bold text-cyan-300 font-sans">{liveMetrics.minBudget} – {liveMetrics.maxBudget}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">ESTIMATED VELOCITY</span>
            <div className="text-xl font-bold text-indigo-300 font-mono">~{liveMetrics.weeks} wks</div>
          </div>
        </div>
      </div>
    </div>
  );
}
