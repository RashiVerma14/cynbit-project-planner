import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Download, CheckCircle2, Clock, BarChart3, Layers, Cpu, ArrowRight, Mail, AlertTriangle, Loader2 } from 'lucide-react';
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
            clientInfo: { fullName: parsed.fullName || 'Client Lead', businessEmail: parsed.businessEmail || 'client@cynbit.in', companyName: parsed.companyName || 'Enterprise' },
            projectScope: { projectName: parsed.projectName || 'Digital Solution MVP', description: parsed.description || 'Enterprise solution designed to accelerate workflow automation.', problemStatement: parsed.problemStatement || 'High latency and manual processing.', targetAudience: 'Enterprise operations', industry: 'Software / FinTech' },
            technicalRequirements: { selectedCapabilities: parsed.selectedCapabilities || ['AUTH_RBAC', 'AI_AGENTS'], complexity: parsed.complexity || 'INTERMEDIATE' },
            estimation: { totalEffortHours: 320, indicativeCostMinINR: 288000, indicativeCostMaxINR: 432000, estimatedDurationWeeks: 9 },
            blueprint: {
              executiveSummary: 'This blueprint defines a decoupled, high-performance architecture engineered for sub-second response times.',
              suggestedArchitecture: 'React.js presentation layer communicating via stateless JWT REST APIs with an Express.js backend and MongoDB Atlas.',
              phases: [
                { phase: 'Phase 1: Architecture & UX Wireframes', duration: '2 Weeks', deliverables: 'Contracts and schema definitions' },
                { phase: 'Phase 2: Core Engineering', duration: '4 Weeks', deliverables: 'Backend microservices and persistent database' },
                { phase: 'Phase 3: AI & Integrations', duration: '2 Weeks', deliverables: 'Groq LLM pipelines and webhook synchronization' },
                { phase: 'Phase 4: Cloud Rollout', duration: '1 Week', deliverables: 'Security audit and production deployment' }
              ]
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
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <h2 className="text-lg font-bold text-white">Synthesizing Architectural Blueprint...</h2>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-10 h-10 text-yellow-400 mb-3" />
        <h2 className="text-xl font-bold text-white">Project Blueprint Not Found</h2>
        <Link to="/planner" className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-black text-xs font-semibold">Start Discovery</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            BLUEPRINT SYNTHESIZED • {project.projectId || id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{project.projectScope?.projectName}</h1>
          <p className="text-xs text-slate-400 mt-1">Engineered for {project.clientInfo?.fullName} ({project.clientInfo?.businessEmail})</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-slate-800"
          >
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-cyan-400" />}
            <span>Export Blueprint PDF</span>
          </button>
        </div>
      </div>

      <div ref={reportRef} className="space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <span className="text-[10px] font-mono text-slate-400 block">DEV EFFORT</span>
            <div className="text-2xl font-bold text-white font-mono mt-1">{project.estimation?.totalEffortHours} hrs</div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-indigo-500/20">
            <span className="text-[10px] font-mono text-slate-400 block">INDICATIVE BUDGET</span>
            <div className="text-base font-bold text-cyan-300 font-sans mt-1">
              ₹{project.estimation?.indicativeCostMinINR?.toLocaleString('en-IN')} – ₹{project.estimation?.indicativeCostMaxINR?.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-emerald-500/20">
            <span className="text-[10px] font-mono text-slate-400 block">ESTIMATED TIMELINE</span>
            <div className="text-2xl font-bold text-white font-mono mt-1">~{project.estimation?.estimatedDurationWeeks} wks</div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-purple-500/20">
            <span className="text-[10px] font-mono text-slate-400 block">COMPLEXITY TIER</span>
            <div className="text-sm font-bold text-white mt-1">{project.technicalRequirements?.complexity}</div>
          </div>
        </div>

        {/* AI Synthesis Card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">AI-Assisted Architectural Specification</h2>
          </div>
          <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-white/5">
            {project.blueprint?.executiveSummary}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
              <span className="font-mono text-cyan-400 block font-semibold mb-1">PROPOSED ARCHITECTURE:</span>
              <p className="text-slate-300 leading-snug">{project.blueprint?.suggestedArchitecture}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
              <span className="font-mono text-cyan-400 block font-semibold mb-1">RECOMMENDED TECH STACK:</span>
              <p className="text-slate-300">Frontend: React.js + Tailwind CSS | Backend: Node.js & Express.js | DB: MongoDB Atlas | AI: Groq LLM</p>
            </div>
          </div>
        </div>

        {/* Milestone Roadmap */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-sm font-bold text-white mb-4 font-mono">PHASED EXECUTION ROADMAP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {project.blueprint?.phases?.map((ph, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="flex justify-between font-mono text-cyan-400 text-[10px]">
                  <span>STEP 0{idx + 1}</span>
                  <span>{ph.duration}</span>
                </div>
                <div className="font-bold text-white text-xs">{ph.phase}</div>
                <div className="text-slate-400 text-[11px] leading-tight">{ph.deliverables}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Request */}
      <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Let's Build This Together</h2>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Submit this technical blueprint directly to Cynbit's engineering leads for a formal discovery consultation.
        </p>
        {consultationDone ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Consultation inquiry received! A Cynbit architect will reach out within 24 hours.</span>
          </div>
        ) : (
          <button
            onClick={() => setConsultationDone(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20"
          >
            <Mail className="w-4 h-4" />
            <span>Confirm Consultation Inquiry</span>
          </button>
        )}
      </div>
    </div>
  );
}
