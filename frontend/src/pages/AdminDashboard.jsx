import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LogOut, 
  Eye, 
  Search, 
  Filter, 
  RefreshCw, 
  X, 
  ExternalLink, 
  Loader2, 
  ShieldCheck, 
  User, 
  Mail, 
  Layers, 
  FileText, 
  CheckCircle, 
  Clock, 
  Phone, 
  Building2, 
  Check, 
  Sparkles,
  TrendingUp,
  Briefcase,
  Terminal,
  Shield,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/api';
import { Card, Button, Badge } from '../components/ui/Primitives';

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'analytics' | 'settings'

  const statusConfig = {
    NEW: { label: 'New', variant: 'cyan' },
    UNDER_REVIEW: { label: 'Under Review', variant: 'yellow' },
    CONTACTED: { label: 'Contacted', variant: 'indigo' },
    IN_DISCUSSION: { label: 'In Discussion', variant: 'purple' },
    CONVERTED: { label: 'Converted', variant: 'emerald' },
    REJECTED: { label: 'Rejected', variant: 'red' },
  };

  const [apiError, setApiError] = useState(null);

  const loadInquiries = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await adminService.getProjects();
      const list = res.data?.data || res.data || [];
      setInquiries(Array.isArray(list) ? list : list.content || []);
    } catch (e) {
      setInquiries([]);
      setApiError(e.response?.data?.message || 'Failed to fetch inquiries from backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (projectId, st) => {
    try {
      await adminService.updateStatus(projectId, { status: st });
    } catch (e) {
      // Local fallback
    }
    setInquiries((prev) =>
      prev.map((inq) => (inq.projectId === projectId ? { ...inq, inquiryStatus: st } : inq))
    );
    if (selectedInquiry) {
      setSelectedInquiry((prev) => ({ ...prev, inquiryStatus: st }));
    }
  };

  const filtered = inquiries.filter((i) => {
    const sMatch =
      !searchTerm ||
      i.projectScope?.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.clientInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.projectId?.toLowerCase().includes(searchTerm.toLowerCase());
    const stMatch = statusFilter === 'ALL' || i.inquiryStatus === statusFilter;
    return sMatch && stMatch;
  });

  // Calculate Metrics
  const totalInquiries = inquiries.length;
  const newCount = inquiries.filter(i => i.inquiryStatus === 'NEW').length;
  const convertedCount = inquiries.filter(i => i.inquiryStatus === 'CONVERTED').length;
  const totalEstPipeline = inquiries.reduce((sum, item) => sum + (item.estimation?.indicativeCostMinINR || 0), 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan" icon={ShieldCheck}>
              OPERATIONAL LEAD CONSOLE
            </Badge>
            <span className="text-xs text-slate-400 font-mono">
              Signed in as: {admin?.fullName || 'Cynbit Architect'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Project Inquiries & Blueprint Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={loadInquiries} 
            variant="secondary" 
            size="sm"
            isLoading={loading}
            icon={RefreshCw}
          >
            Sync Inquiries
          </Button>

          <Link to="/planner">
            <Button variant="outline" size="sm" icon={Sparkles}>
              Test Wizard
            </Button>
          </Link>

          <Button 
            onClick={logout} 
            variant="danger" 
            size="sm" 
            icon={LogOut}
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{totalInquiries}</div>
            <div className="text-xs text-slate-400 font-medium">Total Inquiries</div>
          </div>
        </Card>

        <Card className="p-5 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{newCount}</div>
            <div className="text-xs text-slate-400 font-medium">Awaiting Review</div>
          </div>
        </Card>

        <Card className="p-5 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{convertedCount}</div>
            <div className="text-xs text-slate-400 font-medium">Converted Clients</div>
          </div>
        </Card>

        <Card className="p-5 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">₹{(totalEstPipeline / 100000).toFixed(1)}L</div>
            <div className="text-xs text-slate-400 font-medium">Indicative Pipeline</div>
          </div>
        </Card>
      </div>

      {/* Main Table & Filter Controls */}
      <Card className="overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Controls Toolbar */}
        <div className="p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/60">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project, client, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {['ALL', 'NEW', 'UNDER_REVIEW', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-5">ID & Date</th>
                <th className="py-3.5 px-5">Project Name & Category</th>
                <th className="py-3.5 px-5">Client Details</th>
                <th className="py-3.5 px-5">Estimated Effort</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {apiError && (
                <div className="p-3.5 mb-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
                  <span>API Error: {apiError}</span>
                  <Button variant="outline" size="sm" onClick={loadInquiries}>Retry</Button>
                </div>
              )}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    {apiError ? 'Could not load project inquiries from server.' : 'No project inquiries found.'}
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const status = statusConfig[item.inquiryStatus] || statusConfig.NEW;
                  return (
                    <tr key={item.projectId} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-5 font-mono">
                        <div className="text-cyan-400 font-semibold">{item.projectId}</div>
                        <div className="text-[10px] text-slate-500">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        <div className="font-bold text-white text-sm">
                          {item.projectScope?.projectName || 'Custom Architectural Blueprint'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.projectScope?.category?.replace(/_/g, ' ') || 'Web & AI Platform'}
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        <div className="text-slate-200 font-semibold">{item.clientInfo?.fullName}</div>
                        <div className="text-[11px] text-slate-400">{item.clientInfo?.businessEmail}</div>
                        <div className="text-[10px] text-slate-500">{item.clientInfo?.companyName}</div>
                      </td>

                      <td className="py-4 px-5">
                        <div className="font-semibold text-white">
                          ₹{(item.estimation?.indicativeCostMinINR || 0).toLocaleString()} – ₹{(item.estimation?.indicativeCostMaxINR || 0).toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {item.estimation?.totalEffortHours || 0} Hours • {item.estimation?.estimatedDurationWeeks || 0} Weeks
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        <Badge variant={status.variant}>
                          {status.label}
                        </Badge>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedInquiry(item)}
                            icon={Eye}
                          >
                            Inspect
                          </Button>
                          <Link to={`/results/${item.projectId}`} target="_blank">
                            <Button variant="ghost" size="sm" icon={ExternalLink}>
                              View Live
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </Card>

      {/* Inquiry Inspection Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl max-w-3xl w-full border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col bg-slate-950/95">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-cyan-400 text-xs font-bold">{selectedInquiry.projectId}</span>
                  <Badge variant={statusConfig[selectedInquiry.inquiryStatus]?.variant || 'cyan'}>
                    {statusConfig[selectedInquiry.inquiryStatus]?.label}
                  </Badge>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  {selectedInquiry.projectScope?.projectName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
              
              {/* Status Update Quick Bar */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 font-bold uppercase tracking-wider">
                  Update Lead Inquiry Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['NEW', 'UNDER_REVIEW', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED', 'REJECTED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedInquiry.projectId, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedInquiry.inquiryStatus === st
                          ? 'bg-cyan-500 text-black font-bold shadow-md'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Profile */}
              <div>
                <h4 className="font-mono text-cyan-400 font-bold uppercase text-[11px] tracking-wider mb-2">
                  Client Stakeholder Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/5">
                  <div>
                    <span className="text-slate-500 block text-[10px]">FULL NAME</span>
                    <span className="text-white font-medium">{selectedInquiry.clientInfo?.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">EMAIL ADDRESS</span>
                    <a href={`mailto:${selectedInquiry.clientInfo?.businessEmail}`} className="text-cyan-400 hover:underline">
                      {selectedInquiry.clientInfo?.businessEmail}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">COMPANY</span>
                    <span className="text-white font-medium">{selectedInquiry.clientInfo?.companyName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">PHONE</span>
                    <span className="text-white font-medium">{selectedInquiry.clientInfo?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Scope & Description */}
              <div>
                <h4 className="font-mono text-cyan-400 font-bold uppercase text-[11px] tracking-wider mb-2">
                  Project Scope & Description
                </h4>
                <p className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-slate-300 leading-relaxed">
                  {selectedInquiry.projectScope?.description || 'No detailed description provided.'}
                </p>
              </div>

              {/* Estimation Metrics */}
              <div>
                <h4 className="font-mono text-cyan-400 font-bold uppercase text-[11px] tracking-wider mb-2">
                  Calculated Architectural Estimates
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center">
                    <span className="text-slate-500 block text-[10px]">TOTAL EFFORT</span>
                    <span className="text-lg font-bold text-white">{selectedInquiry.estimation?.totalEffortHours || 0} hrs</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center">
                    <span className="text-slate-500 block text-[10px]">ESTIMATED DURATION</span>
                    <span className="text-lg font-bold text-white">{selectedInquiry.estimation?.estimatedDurationWeeks || 0} weeks</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center">
                    <span className="text-slate-500 block text-[10px]">INDICATIVE BUDGET</span>
                    <span className="text-lg font-bold text-cyan-300">
                      ₹{(selectedInquiry.estimation?.indicativeCostMinINR || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex justify-between items-center bg-slate-950/80">
              <Link to={`/results/${selectedInquiry.projectId}`} target="_blank">
                <Button variant="outline" size="sm" icon={ExternalLink}>
                  Open Full Blueprint View
                </Button>
              </Link>
              <Button variant="secondary" size="sm" onClick={() => setSelectedInquiry(null)}>
                Close Window
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
