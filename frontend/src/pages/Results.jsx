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
  Database,
  RefreshCw
} from 'lucide-react';
import { projectService } from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Card, Badge } from '../components/ui/Primitives';

export default function Results() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [consultationDone, setConsultationDone] = useState(false);
  const reportRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectService.getProjectById(id);
      if (res.data?.data) {
        setProject(res.data.data);
      } else if (res.data) {
        setProject(res.data);
      } else {
        throw new Error('Project blueprint record not found.');
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to retrieve project blueprint from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#07090e',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Cynbit-Blueprint-${project?.projectId || id}.pdf`);
    } catch (err) {
      console.error('PDF generation error', err);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Loading Architectural Blueprint...</h2>
        <p className="text-sm text-slate-400">Querying project dossier {id} from database</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-5 text-center px-4 max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-white">Blueprint Not Found</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {error || `No verified project record was found matching ID: ${id}. Please ensure you submitted through the Project Planner.`}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Button onClick={loadData} variant="secondary" size="md" icon={RefreshCw}>
            Retry Request
          </Button>
          <Link to="/planner">
            <Button variant="primary" size="md">
              Create New Blueprint
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { projectScope, estimation, blueprint, clientInfo, technicalRequirements } = project;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 font-sans">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="cyan" icon={Sparkles}>
              VERIFIED BLUEPRINT DOSSIER
            </Badge>
            <span className="text-xs text-slate-400 font-mono">
              Project ID: {project.projectId}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {projectScope?.projectName || 'Project Architecture'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={handleExportPDF}
            isLoading={exporting}
            icon={Download}
          >
            Export Dossier (PDF)
          </Button>
          <a
            href="https://www.cynbit.in/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="primary" size="md" icon={ExternalLink} iconPosition="right">
              Book Call with Cynbit
            </Button>
          </a>
        </div>
      </div>

      {/* Main Report Container */}
      <div ref={reportRef} className="space-y-8">
        
        {/* Executive Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 border-white/10">
            <div className="text-xs font-medium text-slate-400 mb-1">Total Effort</div>
            <div className="text-3xl font-extrabold text-white">
              {estimation?.totalEffortHours || 0} <span className="text-xs text-cyan-400 font-normal">hours</span>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Calibrated engineering effort
            </div>
          </Card>

          <Card className="p-6 border-white/10">
            <div className="text-xs font-medium text-slate-400 mb-1">Estimated Timeline</div>
            <div className="text-3xl font-extrabold text-white">
              {estimation?.estimatedDurationWeeks || 0} <span className="text-xs text-indigo-400 font-normal">weeks</span>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              4 distinct milestone phases
            </div>
          </Card>

          <Card className="p-6 border-white/10 md:col-span-2 bg-gradient-to-br from-cyan-950/20 via-slate-900/60 to-indigo-950/20 border-cyan-500/30">
            <div className="text-xs font-medium text-slate-400 mb-1">Indicative Investment Range</div>
            <div className="text-3xl font-extrabold text-cyan-300">
              ₹{(estimation?.indicativeCostMinINR || 0).toLocaleString()} – ₹{(estimation?.indicativeCostMaxINR || 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Deterministic WBS calculation based on scope & selected capabilities
            </div>
          </Card>
        </div>

        {/* Executive Summary */}
        <Card className="p-8 border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> Executive Architectural Summary
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {blueprint?.executiveSummary || projectScope?.description}
          </p>
          {blueprint?.suggestedArchitecture && (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 mt-4 leading-relaxed font-sans">
              <span className="text-cyan-400 font-bold block mb-1">Recommended System Architecture:</span>
              {blueprint.suggestedArchitecture}
            </div>
          )}
        </Card>

        {/* Core Modules & Scope Breakdown */}
        {blueprint?.coreModules && blueprint.coreModules.length > 0 && (
          <Card className="p-8 border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> Core Engineering Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {blueprint.coreModules.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Roadmap Milestones */}
        {blueprint?.phases && blueprint.phases.length > 0 && (
          <Card className="p-8 border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" /> Development Roadmap & Delivery Milestones
            </h2>
            <div className="space-y-4">
              {blueprint.phases.map((ph, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-white text-sm">{ph.phase}</span>
                    <span className="text-xs text-cyan-400 font-mono font-semibold">{ph.duration}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {ph.deliverables}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Stakeholder Details */}
        <Card className="p-6 border-white/10">
          <h3 className="text-sm font-bold text-white mb-3">Client Contact & Record Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">CLIENT NAME</span>
              <span className="text-slate-200 font-medium">{clientInfo?.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">BUSINESS EMAIL</span>
              <span className="text-slate-200 font-medium">{clientInfo?.businessEmail}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">ORGANIZATION</span>
              <span className="text-slate-200 font-medium">{clientInfo?.companyName || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">DATE RECORDED</span>
              <span className="text-slate-200 font-medium font-mono">
                {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Active'}
              </span>
            </div>
          </div>
        </Card>

      </div>

      {/* Consultation Action Footer */}
      <Card className="p-8 border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-white">
          Ready to Bring This Architecture to Life?
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Cynbit Technologies partners with ambitious founders and enterprise leadership to design, develop, and deploy production software.
        </p>
        <div className="pt-2">
          <a href="https://www.cynbit.in/" target="_blank" rel="noreferrer">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Initiate Discovery with Cynbit
            </Button>
          </a>
        </div>
      </Card>

    </div>
  );
}
