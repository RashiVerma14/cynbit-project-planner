import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Layers, 
  Globe, 
  Smartphone, 
  Workflow, 
  ShoppingCart, 
  Building2, 
  HelpCircle, 
  Lock, 
  Sliders, 
  CreditCard, 
  MessageSquare, 
  BarChart, 
  Bell, 
  Cpu, 
  Database, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Info,
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';
import { projectService } from '../services/api';
import confetti from 'canvas-confetti';

export default function Planner() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    category: 'AI_POWERED_APP',
    categoryCustom: '',
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
    preferredDatabase: 'MongoDB Atlas',
    budgetRange: '₹1,00,000–₹3,00,000',
    isBudgetFlexible: true,
    timelinePreference: '1–2 months',
    fullName: '',
    businessEmail: '',
    companyName: '',
    phoneNumber: '',
    additionalRequirements: '',
    privacyConsent: true
  });

  // Dynamic Live Metrics State
  const [liveMetrics, setLiveMetrics] = useState({
    hours: 260,
    minBudget: '₹2,34,000',
    maxBudget: '₹3,51,000',
    weeks: 8
  });

  useEffect(() => {
    const baseMap = {
      AI_POWERED_APP: 130,
      SAAS_PLATFORM: 110,
      WEB_APP: 70,
      MOBILE_APP: 85,
      BUSINESS_AUTOMATION: 75,
      ECOMMERCE: 90,
      CUSTOM_ENTERPRISE: 150,
      OTHER: 80
    };

    const capabilityEffortMap = {
      AUTH_RBAC: 24,
      ADMIN_DASHBOARD: 28,
      PAYMENT_GATEWAY: 22,
      AI_CHATBOT: 32,
      AI_AGENTS: 45,
      ANALYTICS_REPORTING: 24,
      REALTIME_NOTIFICATIONS: 18,
      THIRD_PARTY_APIS: 20,
      CLOUD_INFRASTRUCTURE: 20,
      DATABASE_MANAGEMENT: 18,
      WORKFLOW_AUTOMATION: 22,
      MOBILE_RESPONSIVE: 16
    };

    const multMap = {
      BASIC_MVP: 1.0,
      INTERMEDIATE: 1.35,
      ADVANCED: 1.75,
      ENTERPRISE: 2.25
    };

    const base = baseMap[formData.category] || 90;
    let capsTotal = 0;
    formData.selectedCapabilities.forEach((c) => {
      capsTotal += capabilityEffortMap[c] || 18;
    });

    const mult = multMap[formData.complexity] || 1.35;
    const hours = Math.round((base + capsTotal) * mult);

    setLiveMetrics({
      hours,
      minBudget: `₹${(hours * 900).toLocaleString('en-IN')}`,
      maxBudget: `₹${(hours * 1350).toLocaleString('en-IN')}`,
      weeks: Math.max(3, Math.ceil(hours / 36))
    });
  }, [formData.category, formData.selectedCapabilities, formData.complexity]);

  // Validation
  const validateStep = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!formData.category) {
        setErrorMsg('Please select a project category.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.projectName.trim()) {
        setErrorMsg('Please specify a project name.');
        return false;
      }
      if (formData.description.trim().length < 15) {
        setErrorMsg('Please provide a short description (at least 15 characters).');
        return false;
      }
      if (!formData.problemStatement.trim()) {
        setErrorMsg('Please describe the business problem being solved.');
        return false;
      }
    } else if (currentStep === 3) {
      if (formData.selectedCapabilities.length === 0) {
        setErrorMsg('Please select at least one required capability.');
        return false;
      }
    } else if (currentStep === 7) {
      if (!formData.fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
        setErrorMsg('Please provide a valid business email.');
        return false;
      }
      if (!formData.privacyConsent) {
        setErrorMsg('Please consent to the privacy policy to submit.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((p) => Math.min(p + 1, 7));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((p) => Math.max(p - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const toggleCap = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedCapabilities: prev.selectedCapabilities.includes(id)
        ? prev.selectedCapabilities.filter((c) => c !== id)
        : [...prev.selectedCapabilities, id]
    }));
  };

  // Submit Final
  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const payload = {
        clientInfo: {
          fullName: formData.fullName,
          businessEmail: formData.businessEmail,
          companyName: formData.companyName || 'Undisclosed',
          phone: formData.phoneNumber || 'Not provided',
          additionalNotes: formData.additionalRequirements
        },
        projectScope: {
          category: formData.category,
          projectName: formData.projectName,
          description: formData.description,
          problemStatement: formData.problemStatement,
          targetAudience: formData.targetAudience || 'General B2B / Consumer',
          industry: formData.industry || 'Technology'
        },
        technicalRequirements: {
          selectedCapabilities: formData.selectedCapabilities,
          complexity: formData.complexity,
          expectedUsers: formData.expectedUsers
        },
        userPreferences: {
          budgetRange: formData.budgetRange,
          isBudgetFlexible: formData.isBudgetFlexible,
          timelinePreference: formData.timelinePreference
        }
      };

      const res = await projectService.submitProject(payload);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      const pId = res.data?.data?.projectId || res.data?.projectId || 'CYN-' + Math.floor(1000 + Math.random() * 9000);
      navigate(`/results/${pId}`);
    } catch (e) {
      const offlineId = 'CYN-' + Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem(`cynbit_preview_${offlineId}`, JSON.stringify({
        ...formData,
        projectId: offlineId,
        createdAt: new Date().toISOString()
      }));
      navigate(`/results/${offlineId}`);
    } finally {
      setSubmitting(false);
    }
  };

  const stepTitles = [
    { num: 1, title: 'Project Scope', sub: 'Category & Discipline' },
    { num: 2, title: 'Vision', sub: 'Business Problem' },
    { num: 3, title: 'Capabilities', sub: 'Feature Selection' },
    { num: 4, title: 'Scale', sub: 'Complexity Tier' },
    { num: 5, title: 'Tech Stack', sub: 'Architectural Choice' },
    { num: 6, title: 'Velocity', sub: 'Budget & Timeline' },
    { num: 7, title: 'Review', sub: 'Dossier & Synthesis' }
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CYNBIT ARCHITECTURAL DISCOVERY ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Configure Your Project Blueprint
        </h1>
        <p className="text-sm text-slate-400 mt-1.5">
          Step {currentStep} of 7: <span className="text-white font-semibold">{stepTitles[currentStep - 1].title}</span> — {stepTitles[currentStep - 1].sub}
        </p>
      </div>

      {/* Modern Multi-Step Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between relative px-2">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800/80 -translate-y-1/2 -z-10 rounded-full" />
          <div 
            className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 -translate-y-1/2 -z-10 rounded-full transition-all duration-400" 
            style={{ width: `${((currentStep - 1) / 6) * 100}%` }} 
          />
          
          {stepTitles.map((st) => {
            const isDone = st.num < currentStep;
            const isCur = st.num === currentStep;
            return (
              <div key={st.num} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => isDone && setCurrentStep(st.num)}
                  disabled={st.num > currentStep}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isDone
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30 cursor-pointer'
                      : isCur
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white ring-4 ring-cyan-500/25 shadow-lg shadow-cyan-500/40'
                      : 'bg-slate-900 border border-slate-700/80 text-slate-500'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : st.num}
                </button>
                <span className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                  isCur ? 'text-cyan-400 font-bold' : isDone ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form & Sticky HUD Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step Form Container */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
            
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              
              {/* STEP 1: DEFINE CATEGORY */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">What are you looking to build?</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Select the primary project domain. This establishes the architectural foundation and initial effort points.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { id: 'AI_POWERED_APP', label: 'AI-Powered Application', icon: Bot, desc: 'Autonomous agents, LLM copilots, vector RAG memory' },
                      { id: 'SAAS_PLATFORM', label: 'SaaS Platform', icon: Layers, desc: 'Multi-tenant subscription web service with user portals' },
                      { id: 'WEB_APP', label: 'Web Application', icon: Globe, desc: 'High-speed interactive customer portal or internal tool' },
                      { id: 'MOBILE_APP', label: 'Mobile Application', icon: Smartphone, desc: 'Cross-platform iOS and Android app with cloud sync' },
                      { id: 'BUSINESS_AUTOMATION', label: 'Business Automation', icon: Workflow, desc: 'Workflow integration, document parsing, ERP connectivity' },
                      { id: 'ECOMMERCE', label: 'E-Commerce Platform', icon: ShoppingCart, desc: 'Catalog, shopping cart, payment gateway, inventory' },
                      { id: 'CUSTOM_ENTERPRISE', label: 'Custom Enterprise Software', icon: Building2, desc: 'Microservices, audit logging, legacy database bridge' },
                      { id: 'OTHER', label: 'Other / Specialized', icon: HelpCircle, desc: 'Specialized technical software or experimental platform' },
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = formData.category === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, category: item.id })}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                            active
                              ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-101'
                              : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/80'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${active ? 'bg-cyan-500 text-black shadow-md' : 'bg-slate-800/80 text-slate-400'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{item.label}</div>
                              <div className="text-xs text-slate-400 mt-0.5 leading-snug">{item.desc}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PROJECT VISION */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 text-xs">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Describe Your Project Vision</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Our Groq AI engine synthesizes these problem statements into an executive architecture blueprint.
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-300 font-mono font-semibold block mb-1">PROJECT NAME *</label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      placeholder="e.g. NovaOps Intelligent Copilot"
                      className="w-full glass-input px-4 py-3 rounded-xl text-white text-sm focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-300 font-mono font-semibold">SHORT DESCRIPTION * (min 15 chars)</label>
                      <span className="text-[11px] text-slate-500 font-mono">{formData.description.length}/400</span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={400}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Explain what the product accomplishes and how users interact with it..."
                      className="w-full glass-input px-4 py-3 rounded-xl text-white text-sm focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-mono font-semibold block mb-1">CORE BUSINESS PROBLEM SOLVED *</label>
                    <textarea
                      rows={2}
                      value={formData.problemStatement}
                      onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                      placeholder="What manual overhead, latency, or inefficiency does this platform eradicate?"
                      className="w-full glass-input px-4 py-3 rounded-xl text-white text-sm focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-mono font-semibold block mb-1">TARGET AUDIENCE</label>
                      <input
                        type="text"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                        placeholder="e.g. Enterprise HR managers, Retail buyers"
                        className="w-full glass-input px-4 py-3 rounded-xl text-white text-sm focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-mono font-semibold block mb-1">INDUSTRY VERTICAL</label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        placeholder="e.g. FinTech, Healthcare, PropTech"
                        className="w-full glass-input px-4 py-3 rounded-xl text-white text-sm focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CAPABILITIES */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Select Required Capabilities</h2>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Each feature adds calibrated effort hours to the work breakdown calculation.
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                      {formData.selectedCapabilities.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
                    {[
                      { id: 'AUTH_RBAC', label: 'Auth & Role-Based Access', tag: '+24h', desc: 'Stateless JWT, OAuth2, and multi-tenant permissions', icon: Lock },
                      { id: 'ADMIN_DASHBOARD', label: 'Admin Management Console', tag: '+28h', desc: 'Centralized operator UI, search, and data tables', icon: Sliders },
                      { id: 'PAYMENT_GATEWAY', label: 'Payment Integration', tag: '+22h', desc: 'Stripe, Razorpay, and subscription ledger sync', icon: CreditCard },
                      { id: 'AI_CHATBOT', label: 'AI Conversational Assistant', tag: '+32h', desc: 'Natural language chat with memory & prompt context', icon: MessageSquare },
                      { id: 'AI_AGENTS', label: 'Autonomous AI Agents', tag: '+45h', desc: 'Task-executing cognitive agent swarms', icon: Bot },
                      { id: 'ANALYTICS_REPORTING', label: 'Analytics & Reporting', tag: '+24h', desc: 'Visual charts, event tracking, and CSV/PDF export', icon: BarChart },
                      { id: 'REALTIME_NOTIFICATIONS', label: 'WebSockets & Live Push', tag: '+18h', desc: 'Bidirectional updates and email alerts', icon: Bell },
                      { id: 'THIRD_PARTY_APIS', label: 'Third-Party API Integrations', tag: '+20h', desc: 'Slack, ERP, Salesforce, or external webhooks', icon: Workflow },
                      { id: 'CLOUD_INFRASTRUCTURE', label: 'Cloud CI/CD & Docker', tag: '+20h', desc: 'Containerization, auto-scaling, and health checks', icon: Cpu },
                      { id: 'DATABASE_MANAGEMENT', label: 'Advanced Search & Indexing', tag: '+18h', desc: 'MongoDB Atlas clustering, compound indexes', icon: Database },
                      { id: 'WORKFLOW_AUTOMATION', label: 'Background Event Queues', tag: '+22h', desc: 'Scheduled cron tasks and asynchronous job workers', icon: Zap },
                      { id: 'MOBILE_RESPONSIVE', label: 'Fluid Mobile Experience', tag: '+16h', desc: 'Responsive PWA layouts tested across devices', icon: Smartphone },
                    ].map((cap) => {
                      const Icon = cap.icon;
                      const checked = formData.selectedCapabilities.includes(cap.id);
                      return (
                        <div
                          key={cap.id}
                          onClick={() => toggleCap(cap.id)}
                          className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                            checked
                              ? 'bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-500/15'
                              : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${checked ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-400'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{cap.label}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">{cap.tag}</span>
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{cap.desc}</div>
                            </div>
                          </div>
                          <input type="checkbox" checked={checked} onChange={() => {}} className="accent-cyan-500 rounded mt-1 cursor-pointer" />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SCALE & COMPLEXITY */}
              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-xs">
                  <div>
                    <h2 className="text-2xl font-bold text-white">System Complexity & Scale</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Choose your launch maturity level. This multiplier calibrates code review, testing, and deployment overhead.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { id: 'BASIC_MVP', title: 'Basic MVP', mult: '1.0x', desc: 'Core feature validation, rapid market testing, minimal overhead' },
                      { id: 'INTERMEDIATE', title: 'Intermediate Production', mult: '1.35x', desc: 'High-availability architecture, automated tests, clean UI and security' },
                      { id: 'ADVANCED', title: 'Advanced High-Concurrency', mult: '1.75x', desc: 'Multi-role RBAC, background job workers, high-throughput caching' },
                      { id: 'ENTERPRISE', title: 'Mission-Critical Enterprise', mult: '2.25x', desc: 'Multi-region redundancy, SOC2 audit logs, failover clustering' },
                    ].map((lvl) => {
                      const active = formData.complexity === lvl.id;
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => setFormData({ ...formData, complexity: lvl.id })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            active ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-center font-bold text-sm">
                            <span>{lvl.title}</span>
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{lvl.mult}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{lvl.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="text-slate-300 font-mono font-semibold block mb-1">EXPECTED YEAR 1 USERS</label>
                    <select
                      value={formData.expectedUsers}
                      onChange={(e) => setFormData({ ...formData, expectedUsers: e.target.value })}
                      className="w-full glass-input px-4 py-2.5 rounded-xl text-white text-xs focus:border-cyan-400"
                    >
                      <option>Under 1,000 active users</option>
                      <option>1,000 - 10,000 active users</option>
                      <option>10,000 - 50,000 active users</option>
                      <option>50,000+ enterprise scale</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: TECH STRATEGY */}
              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-xs">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Technology Stack Strategy</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Would you like Cynbit to formulate an optimal architecture, or do you have existing repo constraints?
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/25 space-y-3">
                    <span className="text-cyan-400 font-mono font-bold block uppercase tracking-wider text-xs">
                      CYNBIT RECOMMENDED ARCHITECTURE STACK:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">FRONTEND</span>
                        <span className="text-white font-semibold">React.js (Vite) + Tailwind</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">BACKEND</span>
                        <span className="text-white font-semibold">Node.js & Express.js</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">DATABASE</span>
                        <span className="text-white font-semibold">MongoDB Atlas</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">AI ENGINE</span>
                        <span className="text-white font-semibold">Groq LLM + Vector DB</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">SECURITY</span>
                        <span className="text-white font-semibold">Stateless JWT + bcrypt</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">CLOUD</span>
                        <span className="text-white font-semibold">AWS / Docker / Vercel</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: BUDGET & VELOCITY */}
              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-xs">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Target Budget & Delivery Velocity</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Align your internal expectations with engineering sprint capabilities.
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-300 font-mono font-semibold block mb-2">TARGET BUDGET BAND</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {['Below ₹50,000', '₹50,000–₹1,00,000', '₹1,00,000–₹3,00,000', '₹3,00,000–₹5,00,000', 'Above ₹5,00,000', 'Flexible'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.budgetRange === b ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md' : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-mono font-semibold block mb-2">LAUNCH VELOCITY PREFERENCE</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {['Within 2–4 weeks', '1–2 months', '3–4 months', '5–6 months', 'Flexible roadmap'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({ ...formData, timelinePreference: t })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.timelinePreference === t ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-md' : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 7: CONTACT & REVIEW */}
              {currentStep === 7 && (
                <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 text-xs">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Review & Synthesize Blueprint</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Enter your contact information to bind this project blueprint to your consultation record.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="font-bold text-white text-sm">{formData.projectName || 'Untitled Project'}</span>
                      <span className="font-mono text-cyan-400">{formData.category.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-slate-400">
                      <div>Tier: <span className="text-white">{formData.complexity}</span></div>
                      <div>Features: <span className="text-white">{formData.selectedCapabilities.length} Selected</span></div>
                      <div>Velocity: <span className="text-white">~{liveMetrics.weeks} Weeks</span></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-mono font-semibold block mb-1">FULL NAME *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full glass-input px-4 py-2.5 rounded-xl text-white focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-mono font-semibold block mb-1">BUSINESS EMAIL *</label>
                      <input
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full glass-input px-4 py-2.5 rounded-xl text-white focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-mono font-semibold block mb-1">COMPANY NAME (OPTIONAL)</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Innovations Ltd."
                        className="w-full glass-input px-4 py-2.5 rounded-xl text-white focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-mono font-semibold block mb-1">PHONE NUMBER (OPTIONAL)</label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full glass-input px-4 py-2.5 rounded-xl text-white focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="consentBox"
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                      className="accent-cyan-500 rounded mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="consentBox" className="text-[11px] text-slate-400 cursor-pointer">
                      I agree to allow Cynbit Technologies to process this technical specification to generate an architectural blueprint.
                    </label>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Wizard Navigation Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
              ) : <div />}

              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-primary-gradient text-white text-xs font-bold shadow-md shadow-cyan-500/20"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-bold tracking-wide shadow-xl shadow-emerald-500/25 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Project Blueprint</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Sticky Real-Time HUD Sidebar */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-cyan-500/25 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-cyan-400" /> REAL-TIME ESTIMATION HUD
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">ESTIMATED DEV EFFORT</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
                  {liveMetrics.hours} <span className="text-xs text-cyan-400 font-normal">hours</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-mono block">INDICATIVE BUDGET BAND</span>
                <div className="text-xl font-bold text-cyan-300 font-sans mt-0.5">
                  {liveMetrics.minBudget} – {liveMetrics.maxBudget}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">₹900–₹1,350/hr calibrated team velocity</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-mono block">PROJECTED VELOCITY</span>
                <div className="text-2xl font-bold text-indigo-300 font-mono mt-0.5">
                  ~{liveMetrics.weeks} <span className="text-xs text-slate-400 font-normal">weeks</span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">4 distinct sprint delivery phases</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Discipline:</span>
                <span className="text-white font-mono">{formData.category.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Features:</span>
                <span className="text-cyan-400 font-mono font-bold">{formData.selectedCapabilities.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Maturity Tier:</span>
                <span className="text-indigo-400 font-mono font-bold">{formData.complexity}</span>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200/90 leading-relaxed">
              <span className="font-semibold text-cyan-300 block mb-0.5">Deterministic Planning:</span>
              Metrics are calculated using verified engineering effort models. Binding delivery dates are confirmed during technical discovery.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
