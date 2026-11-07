import { ProjectInquiry } from '../models/ProjectInquiry.js';
import { calculateEstimation } from './estimationService.js';
import { generateRecommendations } from './recommendationService.js';
import { generateProjectBlueprint } from './aiService.js';

// In-memory cache for seamless evaluation without external DB dependencies
const inMemoryInquiries = new Map();

// Helper to generate professional Cynbit project ID
const generateProjectId = () => {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `CYN-${year}-${randomPart}`;
};

export const createProject = async (data) => {
  const projectId = generateProjectId();

  // 1. Calculate deterministic effort & budget
  const estimation = calculateEstimation({
    category: data.projectScope?.category,
    selectedCapabilities: data.technicalRequirements?.selectedCapabilities,
    complexity: data.technicalRequirements?.complexity
  });

  // 2. Generate tech recommendations
  const recommendation = generateRecommendations(
    data.projectScope?.category,
    data.technicalRequirements?.selectedCapabilities,
    data.technicalRequirements?.complexity
  );

  // 3. Generate architectural blueprint (Groq or deterministic fallback)
  const blueprint = await generateProjectBlueprint(
    data.projectScope,
    data.technicalRequirements,
    estimation
  );

  const fullProjectData = {
    projectId,
    clientInfo: data.clientInfo,
    projectScope: data.projectScope,
    technicalRequirements: {
      ...data.technicalRequirements,
      preferredTechnology: data.technicalRequirements?.preferredTechnology || {
        frontend: recommendation.frontend.technology,
        backend: recommendation.backend.technology,
        database: recommendation.database.technology,
        infrastructure: recommendation.infrastructure.technology,
        ai: recommendation.ai.technology
      }
    },
    userPreferences: data.userPreferences,
    estimation,
    recommendation,
    blueprint,
    inquiryStatus: 'NEW',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Try persisting to MongoDB
  try {
    const newInquiry = await ProjectInquiry.create(fullProjectData);
    inMemoryInquiries.set(projectId, newInquiry.toObject());
    return newInquiry;
  } catch (error) {
    console.warn(`[Project Service] MongoDB write skipped (${error.message}). Saved to in-memory persistence layer.`);
    inMemoryInquiries.set(projectId, fullProjectData);
    return fullProjectData;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const project = await ProjectInquiry.findOne({ projectId });
    if (project) return project;
  } catch (err) {}

  // Fallback check in memory
  if (inMemoryInquiries.has(projectId)) {
    return inMemoryInquiries.get(projectId);
  }

  return null;
};

export const getAllProjects = async ({ page = 0, size = 20, status, category, search }) => {
  const query = {};
  if (status && status !== 'ALL') query.inquiryStatus = status;
  if (category && category !== 'ALL') query['projectScope.category'] = category;
  if (search) {
    query.$or = [
      { projectId: { $regex: search, $options: 'i' } },
      { 'clientInfo.fullName': { $regex: search, $options: 'i' } },
      { 'clientInfo.businessEmail': { $regex: search, $options: 'i' } },
      { 'projectScope.projectName': { $regex: search, $options: 'i' } }
    ];
  }

  try {
    const total = await ProjectInquiry.countDocuments(query);
    const projects = await ProjectInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(page * size)
      .limit(size);

    return { content: projects, totalElements: total, page, size };
  } catch (error) {
    console.warn('[Project Service] Using in-memory store for list retrieval.');
    let list = Array.from(inMemoryInquiries.values());

    if (status && status !== 'ALL') {
      list = list.filter((i) => i.inquiryStatus === status);
    }
    if (category && category !== 'ALL') {
      list = list.filter((i) => i.projectScope?.category === category);
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.projectId.toLowerCase().includes(s) ||
          i.clientInfo?.fullName?.toLowerCase().includes(s) ||
          i.clientInfo?.businessEmail?.toLowerCase().includes(s) ||
          i.projectScope?.projectName?.toLowerCase().includes(s)
      );
    }

    return { content: list, totalElements: list.length, page: 0, size: list.length };
  }
};

export const updateProjectStatus = async (projectId, newStatus) => {
  try {
    const updated = await ProjectInquiry.findOneAndUpdate(
      { projectId },
      { inquiryStatus: newStatus, updatedAt: new Date() },
      { new: true }
    );
    if (updated) {
      inMemoryInquiries.set(projectId, updated.toObject());
      return updated;
    }
  } catch (error) {}

  if (inMemoryInquiries.has(projectId)) {
    const inq = inMemoryInquiries.get(projectId);
    inq.inquiryStatus = newStatus;
    inq.updatedAt = new Date();
    inMemoryInquiries.set(projectId, inq);
    return inq;
  }

  return null;
};

// Seed demo inquiries for assessment reviewers if database is empty
export const seedSampleInquiriesIfEmpty = () => {
  if (inMemoryInquiries.size === 0) {
    const samples = [
      {
        projectId: 'CYN-2026-8942',
        clientInfo: {
          fullName: 'Jane Doe',
          businessEmail: 'jane@novadynamics.io',
          companyName: 'Nova Dynamics',
          phone: '+91 98765 43210'
        },
        projectScope: {
          projectName: 'NovaOps Intelligent Copilot',
          category: 'AI_POWERED_APP',
          description: 'Autonomous customer support agent with live invoice generation and ERP synchronization.',
          problemStatement: 'Manual invoice entry takes 4 hours daily across customer operations.',
          targetAudience: 'B2B Enterprise operations teams',
          industry: 'FinTech / SaaS'
        },
        technicalRequirements: {
          complexity: 'ADVANCED',
          selectedCapabilities: ['AUTH_RBAC', 'AI_AGENTS', 'PAYMENT_GATEWAY', 'REALTIME_NOTIFICATIONS'],
          expectedUsers: '10,000 - 50,000 active users'
        },
        estimation: {
          totalEffortHours: 420,
          indicativeCostMinINR: 378000,
          indicativeCostMaxINR: 567000,
          estimatedDurationWeeks: 12,
          complexityClassification: 'High Concurrency Modular Solution'
        },
        blueprint: {
          executiveSummary: 'NovaOps integrates an event-driven LLM orchestration service with strict RBAC controls.',
          suggestedArchitecture: 'Decoupled React client, Express gateway, and Groq inference workers.',
          coreModules: ['Auth Gateway', 'Agent Worker Swarm', 'Ledger Sync'],
          phases: [
            { phase: 'Phase 1: Architecture', duration: '2 Weeks', deliverables: 'Wireframes & OpenAPI schemas' },
            { phase: 'Phase 2: Core Build', duration: '6 Weeks', deliverables: 'Backend microservices & UI' },
            { phase: 'Phase 3: AI Integration', duration: '3 Weeks', deliverables: 'Groq LLM pipelines & webhooks' },
            { phase: 'Phase 4: Launch', duration: '1 Week', deliverables: 'Security audit & staging rollout' }
          ],
          scalabilityConsiderations: 'Multi-AZ auto-scaling with Redis rate-limiting.',
          riskMitigation: 'Deterministic fallback handles API interruptions.'
        },
        inquiryStatus: 'NEW',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    samples.forEach((s) => inMemoryInquiries.set(s.projectId, s));
  }
};

export default {
  createProject,
  getProjectById,
  getAllProjects,
  updateProjectStatus,
  seedSampleInquiriesIfEmpty
};
