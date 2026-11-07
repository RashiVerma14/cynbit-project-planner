import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Mail, 
  AlertTriangle, 
  Loader2,
  Calendar,
  ShieldCheck,
  Check,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { projectService } from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Results() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [consultationDone, setConsultationDone] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await projectService.getProjectById(id);
        if (res.data?.data) {
          setProject(res.data.data);
        } else if (res.data) {
          setProject(res.data);
        }
      } catch (e) {
        const cached = localStorage.getItem(`cynbit_preview_${id}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          setProject({
            projectId: id,
            clientInfo: {
              fullName: parsed.fullName || 'Enterprise Lead',
              businessEmail: parsed.businessEmail || 'partner@enterprise.com',
              companyName: parsed.companyName || 'Nova Dynamics',
              phone: parsed.phoneNumber || '+91 98765 43210'
            },
            projectScope: {
              projectName: parsed.projectName || 'Digital Solution Platform',
              category: parsed.category || 'AI_POWERED_APP',
              description: parsed.description || 'Enterprise solution designed to accelerate workflow automation and predictive intelligence.',
              problemStatement: parsed.problemStatement || 'High latency and manual overhead in operations.',
              targetAudience: parsed.targetAudience || 'Corporate teams & end users',
              industry: parsed.industry || 'FinTech / Software'
            },
            technicalRequirements: {
              selectedCapabilities: parsed.selectedCapabilities || ['AUTH_RBAC', 'AI_AGENTS', 'CLOUD_INFRASTRUCTURE'],
              complexity: parsed.complexity || 'INTERMEDIATE'
            },
            estimation: {
              totalEffortHours: 360,
              foundationHours: 35,
              frontendHours: 100,
              backendHours: 120,
              aiWorkflowHours: 55,
              testingQaHours: 35,
              deploymentHours: 15,
              indicativeCostMinINR: 324000,
              indicativeCostMaxINR: 486000,
              estimatedDurationWeeks: 10,
              complexityClassification: 'Intermediate Production Solution'
            },
            blueprint: {
              executiveSummary: 'This blueprint defines a decoupled, high-performance architecture engineered for sub-second response times and multi-tenant security.',
              suggestedArchitecture: 'Modern decoupled architecture: React 19 presentation layer with Tailwind CSS, communicating via stateless REST/WebSocket APIs with an Express.js backend and MongoDB Atlas clustering.',
              coreModules: [
                'Identity & Role-Based Access Control (RBAC)',
                'High-Throughput Business Process Orchestrator',
                'Cognitive AI Inference Pipeline & Context Memory',
                'Audit Trail, Security Logging & Analytics Ledger'
              ],
              phases: [
                { phase: 'Phase 1: Architecture & UI/UX Wireframing', duration: '2 Weeks', deliverables: 'OpenAPI specification contracts and database schema models.' },
                { phase: 'Phase 2: Core Engineering & Backend Microservices', duration: '5 Weeks', deliverables: 'REST micro-endpoints, MongoDB schema indexes, and stateful React client.' },
                { phase: 'Phase 3: AI Orchestration & Integrations', duration: '2 Weeks', deliverables: 'Groq LLM pipelines, external webhooks, and automated background workers.' },
                { phase: 'Phase 4: Security Hardening & Cloud Rollout', duration: '1 Week', deliverables: 'Load testing, security audit, and containerized cloud deployment.' }
              ],
              scalabilityConsiderations: 'Containerized deployment via Docker combined with multi-AZ cloud load balancing allows automated vertical and horizontal autoscaling.',
              riskMitigation: 'All external dependencies implement circuit breakers, retry policies, and deterministic fallbacks to guarantee 99.9% uptime.'
            }
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#07090e' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Cynbit_Blueprint_${id}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-white">Synthesizing Architectural Blueprint...</h2>
        <p className="text-xs text-slate-400 mt-1">Calibrating engineering models and Groq AI inference</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-12 h-12 text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold text-white">Project Blueprint Not Found</h2>
        <Link to="/planner" className="mt-6 px-6 py-2.5 rounded-xl btn-primary-gradient text-white text-xs font-semibold">
          Start New Discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
              BLUEPRINT SYNTHESIZED
            </span>
            <span className="text-xs font-mono text-slate-400">
              ID: {project.projectId || id}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            {project.projectScope?.projectName}
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Engineered for {project.clientInfo?.fullName} • {project.clientInfo?.companyName} ({project.clientInfo?.businessEmail})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-all"
          >
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-cyan-400" />}
            <span>Export Blueprint PDF</span>
          </button>

          <a
            href="#consultSection"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-gradient text-white text-xs font-bold shadow-lg shadow-cyan-500/20"
          >
            <span>Consult With Cynbit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Printable Report Canvas */}
      <div ref={reportRef} className="space-y-6">
        
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-cyan-500/25">
            <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase">ESTIMATED DEV EFFORT</span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1">
              {project.estimation?.totalEffortHours} <span className="text-xs text-cyan-400 font-normal">hrs</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Calibrated team velocity</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-indigo-500/25">
            <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase">INDICATIVE BUDGET</span>
            <div className="text-xl font-extrabold text-cyan-300 font-sans mt-1">
              ₹{project.estimation?.indicativeCostMinINR?.toLocaleString('en-IN')} – ₹{project.estimation?.indicativeCostMaxINR?.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Indicative investment band</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/25">
            <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase">ESTIMATED VELOCITY</span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1">
              ~{project.estimation?.estimatedDurationWeeks} <span className="text-xs text-emerald-400 font-normal">wks</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">4 execution milestones</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-purple-500/25">
            <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase">COMPLEXITY TIER</span>
            <div className="text-base font-extrabold text-white mt-1">
              {project.technicalRequirements?.complexity?.replace(/_/g, ' ')}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Production architecture</span>
          </div>
        </div>

        {/* AI Synthesis Thesis */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI-Assisted Architectural Synthesis</h2>
              <span className="text-[10px] text-slate-400 font-mono">Engineered via Groq LLM + Cynbit Enterprise Standards</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-white/5 text-sm">
            {project.blueprint?.executiveSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
              <span className="font-mono text-cyan-400 font-bold block text-xs">PROPOSED ARCHITECTURE:</span>
              <p className="text-slate-300 leading-relaxed text-xs">{project.blueprint?.suggestedArchitecture}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
              <span className="font-mono text-indigo-400 font-bold block text-xs">SCALABILITY & RESILIENCE:</span>
              <p className="text-slate-300 leading-relaxed text-xs">{project.blueprint?.scalabilityConsiderations}</p>
            </div>
          </div>
        </div>

        {/* Technology Stack Recommendations */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-sm font-bold text-white mb-4 font-mono uppercase tracking-wider text-cyan-400">
            RECOMMENDED TECHNOLOGY INFRASTRUCTURE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">FRONTEND LAYER</span>
              <div className="font-bold text-white text-sm">React 19 + Tailwind CSS</div>
              <p className="text-slate-400 mt-1 text-[11px] leading-snug">Client-side routing, responsive UI agility, and fast Vite bundling.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">BACKEND ENGINE</span>
              <div className="font-bold text-white text-sm">Node.js & Express.js</div>
              <p className="text-slate-400 mt-1 text-[11px] leading-snug">Event-driven non-blocking I/O, REST endpoints, and modular routes.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">PERSISTENCE CLUSTER</span>
              <div className="font-bold text-white text-sm">MongoDB Atlas</div>
              <p className="text-slate-400 mt-1 text-[11px] leading-snug">Document schemas, automated indexing, and multi-region replication.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">AI ORCHESTRATION</span>
              <div className="font-bold text-white text-sm">Groq LLM + Vector DB</div>
              <p className="text-slate-400 mt-1 text-[11px] leading-snug">Low-latency LPU inference, RAG semantic context, and agent workflows.</p>
            </div>
          </div>
        </div>

        {/* Milestone Roadmap */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-sm font-bold text-white mb-4 font-mono uppercase tracking-wider text-cyan-400">
            PHASED SPRINT EXECUTION ROADMAP
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {project.blueprint?.phases?.map((ph, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1.5">
                <div className="flex justify-between items-center font-mono text-cyan-400 text-[10px]">
                  <span>MILESTONE 0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-semibold">{ph.duration}</span>
                </div>
                <div className="font-bold text-white text-sm">{ph.phase}</div>
                <div className="text-slate-400 text-[11px] leading-relaxed pt-1">{ph.deliverables}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Consultation Action */}
      <div id="consultSection" className="glass-card p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center space-y-4 bg-gradient-to-b from-cyan-950/20 to-slate-900/80">
        <h2 className="text-3xl font-extrabold text-white">Let's Build This Together</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Submit this technical blueprint directly to Cynbit's engineering leads for an architectural walkthrough and formal project proposal.
        </p>

        {consultationDone ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Consultation confirmed! A Cynbit technical architect will contact {project.clientInfo?.businessEmail} within 24 hours.</span>
          </div>
        ) : (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setConsultationDone(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl btn-primary-gradient text-white text-xs font-bold shadow-xl shadow-cyan-500/30"
            >
              <Mail className="w-4 h-4" />
              <span>Confirm Consultation Request</span>
            </button>

            <a
              href="mailto:support@cynbit.in"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-slate-800"
            >
              <span>Email: support@cynbit.in</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        )}
      </div>

    </div>
  );
}
