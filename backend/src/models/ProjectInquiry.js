import mongoose from 'mongoose';

const projectInquirySchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    clientInfo: {
      fullName: { type: String, required: true, trim: true },
      businessEmail: { type: String, required: true, trim: true, lowercase: true, index: true },
      companyName: { type: String, default: 'Undisclosed' },
      phone: { type: String, default: 'Not provided' },
      additionalNotes: { type: String, default: '' }
    },
    projectScope: {
      category: {
        type: String,
        required: true,
        enum: [
          'AI_POWERED_APP',
          'SAAS_PLATFORM',
          'WEB_APP',
          'MOBILE_APP',
          'BUSINESS_AUTOMATION',
          'ECOMMERCE',
          'CUSTOM_ENTERPRISE',
          'OTHER'
        ],
        index: true
      },
      categoryCustom: { type: String, default: '' },
      projectName: { type: String, required: true, trim: true },
      description: { type: String, required: true },
      problemStatement: { type: String, required: true },
      targetAudience: { type: String, default: 'General B2B / Consumer' },
      industry: { type: String, default: 'Technology' },
      mainObjective: { type: String, default: 'Deliver production MVP' }
    },
    technicalRequirements: {
      selectedCapabilities: [{ type: String }],
      complexity: {
        type: String,
        required: true,
        enum: ['BASIC_MVP', 'INTERMEDIATE', 'ADVANCED', 'ENTERPRISE'],
        default: 'INTERMEDIATE'
      },
      expectedUsers: { type: String, default: '1,000 - 10,000 active users' },
      expectedTraffic: { type: String, default: 'Moderate' },
      scalabilityTier: { type: String, default: 'Cloud auto-scaling' },
      securityTier: { type: String, default: 'Standard encrypted' },
      preferredTechnology: {
        mode: { type: String, enum: ['CYNBIT_RECOMMENDED', 'USER_CUSTOM'], default: 'CYNBIT_RECOMMENDED' },
        frontend: { type: String, default: 'React.js' },
        backend: { type: String, default: 'Node.js & Express.js' },
        database: { type: String, default: 'MongoDB Atlas' },
        infrastructure: { type: String, default: 'AWS / Docker' },
        ai: { type: String, default: 'Groq LLM + Vector DB' }
      }
    },
    userPreferences: {
      budgetRange: { type: String, default: '₹1,00,000–₹3,00,000' },
      isBudgetFlexible: { type: Boolean, default: true },
      timelinePreference: { type: String, default: '1–2 months' }
    },
    estimation: {
      totalEffortHours: { type: Number, required: true },
      foundationHours: { type: Number, default: 30 },
      frontendHours: { type: Number, default: 80 },
      backendHours: { type: Number, default: 90 },
      aiWorkflowHours: { type: Number, default: 40 },
      testingQaHours: { type: Number, default: 30 },
      deploymentHours: { type: Number, default: 20 },
      indicativeCostMinINR: { type: Number, required: true },
      indicativeCostMaxINR: { type: Number, required: true },
      estimatedDurationWeeks: { type: Number, required: true },
      complexityClassification: { type: String, default: 'Intermediate' }
    },
    blueprint: {
      executiveSummary: { type: String },
      suggestedArchitecture: { type: String },
      coreModules: [{ type: String }],
      phases: [
        {
          phase: { type: String },
          duration: { type: String },
          deliverables: { type: String }
        }
      ],
      scalabilityConsiderations: { type: String },
      riskMitigation: { type: String },
      isAiGenerated: { type: Boolean, default: false }
    },
    inquiryStatus: {
      type: String,
      enum: ['NEW', 'UNDER_REVIEW', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED', 'REJECTED'],
      default: 'NEW',
      index: true
    }
  },
  {
    timestamps: true
  }
);

export const ProjectInquiry = mongoose.model('ProjectInquiry', projectInquirySchema);
