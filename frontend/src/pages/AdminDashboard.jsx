import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Eye, Search, Filter, RefreshCw, X, ExternalLink, Loader2, ShieldCheck, User, Mail, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/api';

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const statusConfig = {
    NEW: { label: 'New', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
    UNDER_REVIEW: { label: 'Under Review', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
    CONTACTED: { label: 'Contacted', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    IN_DISCUSSION: { label: 'In Discussion', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    CONVERTED: { label: 'Converted', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    REJECTED: { label: 'Rejected', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
  };

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await adminService.getProjects();
      const list = res.data?.data || res.data || [];
      setInquiries(Array.isArray(list) ? list : list.content || []);
    } catch (e) {
      setInquiries([
        {
          projectId: 'CYN-2026-8942',
          clientInfo: { fullName: 'Jane Doe', businessEmail: 'jane@novadynamics.io', companyName: 'Nova Dynamics' },
          projectScope: { projectName: 'NovaOps Intelligent Copilot', category: 'AI_POWERED_APP', description: 'Autonomous customer support agent with live invoice generation.' },
          estimation: { totalEffortHours: 420, indicativeCostMinINR: 378000, indicativeCostMaxINR: 567000 },
          inquiryStatus: 'NEW'
        },
        {
          projectId: 'CYN-2026-7814',
          clientInfo: { fullName: 'Rajesh Sharma', businessEmail: 'rajesh@urbanstay.in', companyName: 'UrbanStay PropTech' },
          projectScope: { projectName: 'UrbanStay Property Cloud', category: 'SAAS_PLATFORM', description: 'Property management platform with automated rent collection.' },
          estimation: { totalEffortHours: 280, indicativeCostMinINR: 252000, indicativeCostMaxINR: 378000 },
          inquiryStatus: 'UNDER_REVIEW'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadInquiries(); }, []);

  const handleStatusChange = async (projectId, st) => {
    try {
      await adminService.updateStatus(projectId, { status: st });
    } catch (e) {}
    setInquiries((prev) => prev.map((inq) => (inq.projectId === projectId ? { ...inq, inquiryStatus: st } : inq)));
    if (selectedInquiry) setSelectedInquiry((prev) => ({ ...prev, inquiryStatus: st }));
  };

  const filtered = inquiries.filter((i) => {
    const sMatch = !searchTerm || i.projectScope?.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) || i.clientInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || i.projectId?.toLowerCase().includes(searchTerm.toLowerCase());
    const stMatch = statusFilter === 'ALL' || i.inquiryStatus === statusFilter;
    return sMatch && stMatch;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              OPERATIONAL LEAD CONSOLE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Signed in as: {admin?.fullName || 'Cynbit Architect'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Project Inquiries & Blueprint Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={loadInquiries} 
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <Link
            to="/planner"
            className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/20"
          >
            Open Wizard Simulator
          </Link>

          <button 
            onClick={logout} 
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-300 border border-red-500/30 text-xs font-semibold hover:bg-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 block uppercase font-semibold">TOTAL INQUIRIES</span>
          <div className="text-3xl font-extrabold text-white font-mono mt-1">{inquiries.length}</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-cyan-500/25">
          <span className="text-[10px] font-mono text-cyan-400 block uppercase font-semibold">NEW INQUIRIES</span>
          <div className="text-3xl font-extrabold text-cyan-300 font-mono mt-1">
            {inquiries.filter((i) => i.inquiryStatus === 'NEW').length}
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-yellow-500/25">
          <span className="text-[10px] font-mono text-yellow-400 block uppercase font-semibold">UNDER EVALUATION</span>
          <div className="text-3xl font-extrabold text-yellow-300 font-mono mt-1">
            {inquiries.filter((i) => i.inquiryStatus === 'UNDER_REVIEW').length}
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/25">
          <span className="text-[10px] font-mono text-emerald-400 block uppercase font-semibold">CONVERTED LEADS</span>
          <div className="text-3xl font-extrabold text-emerald-300 font-mono mt-1">
            {inquiries.filter((i) => i.inquiryStatus === 'CONVERTED').length}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiries by project, client, email, ID..."
            className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-white text-xs focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="glass-input px-3 py-2 rounded-xl text-white text-xs"
          >
            <option value="ALL">All Statuses</option>
            {Object.keys(statusConfig).map((k) => (
              <option key={k} value={k}>{statusConfig[k].label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/5 bg-slate-950/70 font-mono text-slate-400">
              <th className="py-3.5 px-5 font-semibold">PROJECT & ID</th>
              <th className="py-3.5 px-5 font-semibold">CLIENT / LEAD</th>
              <th className="py-3.5 px-5 font-semibold">EFFORT & BUDGET</th>
              <th className="py-3.5 px-5 font-semibold">STATUS</th>
              <th className="py-3.5 px-5 font-semibold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((inq) => {
              const st = statusConfig[inq.inquiryStatus] || statusConfig.NEW;
              return (
                <tr key={inq.projectId} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white text-sm">{inq.projectScope?.projectName}</div>
                    <div className="text-[11px] font-mono text-cyan-400 mt-0.5">{inq.projectId}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-slate-200 font-semibold">{inq.clientInfo?.fullName}</div>
                    <div className="text-[11px] text-slate-400">{inq.clientInfo?.companyName} • {inq.clientInfo?.businessEmail}</div>
                  </td>
                  <td className="py-4 px-5 font-mono">
                    <div className="text-white font-bold">{inq.estimation?.totalEffortHours} hrs</div>
                    <div className="text-[11px] text-cyan-300">
                      ₹{inq.estimation?.indicativeCostMinINR?.toLocaleString('en-IN')} – ₹{inq.estimation?.indicativeCostMaxINR?.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${st.color}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-200 border border-white/10 hover:border-cyan-500/30 text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" /> Inspect
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Inquiry Inspect Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl rounded-3xl border border-cyan-500/30 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                  {selectedInquiry.projectId}
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">{selectedInquiry.projectScope?.projectName}</h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {Object.keys(statusConfig).map((k) => (
                <button
                  key={k}
                  onClick={() => handleStatusChange(selectedInquiry.projectId, k)}
                  className={`px-3 py-1 rounded-xl border text-[11px] font-mono transition-all ${
                    selectedInquiry.inquiryStatus === k
                      ? statusConfig[k].color + ' font-bold ring-2 ring-cyan-400/30'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {statusConfig[k].label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 space-y-1.5">
              <div>Client: <span className="text-white font-bold">{selectedInquiry.clientInfo?.fullName}</span> ({selectedInquiry.clientInfo?.businessEmail})</div>
              <div>Company: <span className="text-slate-200">{selectedInquiry.clientInfo?.companyName}</span></div>
              <div>Description: {selectedInquiry.projectScope?.description}</div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <Link to={`/results/${selectedInquiry.projectId}`} target="_blank" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold">
                Open Full Results Dossier <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button onClick={() => setSelectedInquiry(null)} className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
