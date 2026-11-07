// Configurable baseline assumptions
const ESTIMATION_CONFIG = {
  HOURLY_RATE_MIN_INR: 900,
  HOURLY_RATE_MAX_INR: 1350,
  WEEKLY_SPRINT_HOURS: 36,

  // Base effort hours by category
  BASE_HOURS_BY_CATEGORY: {
    AI_POWERED_APP: 130,
    SAAS_PLATFORM: 110,
    WEB_APP: 70,
    MOBILE_APP: 85,
    BUSINESS_AUTOMATION: 75,
    ECOMMERCE: 90,
    CUSTOM_ENTERPRISE: 150,
    OTHER: 80
  },

  // Effort points per capability (in hours)
  CAPABILITY_EFFORT_HOURS: {
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
  },

  // Complexity multipliers
  COMPLEXITY_MULTIPLIERS: {
    BASIC_MVP: 1.0,
    INTERMEDIATE: 1.35,
    ADVANCED: 1.75,
    ENTERPRISE: 2.25
  }
};

export const calculateEstimation = (input = {}) => {
  const category = input.category || 'AI_POWERED_APP';
  const capabilities = Array.isArray(input.selectedCapabilities) ? input.selectedCapabilities : [];
  const complexity = input.complexity || 'INTERMEDIATE';

  // 1. Base category effort
  const baseEffort = ESTIMATION_CONFIG.BASE_HOURS_BY_CATEGORY[category] || 80;

  // 2. Capabilities effort
  let capabilitiesEffort = 0;
  capabilities.forEach((cap) => {
    capabilitiesEffort += ESTIMATION_CONFIG.CAPABILITY_EFFORT_HOURS[cap] || 18;
  });

  // 3. Complexity multiplier
  const multiplier = ESTIMATION_CONFIG.COMPLEXITY_MULTIPLIERS[complexity] || 1.35;

  // 4. Total hours
  const rawTotalHours = (baseEffort + capabilitiesEffort) * multiplier;
  const totalEffortHours = Math.round(rawTotalHours);

  // 5. Work Breakdown Structure (WBS)
  const foundationHours = Math.round(totalEffortHours * 0.10);
  const frontendHours = Math.round(totalEffortHours * 0.28);
  const backendHours = Math.round(totalEffortHours * 0.32);
  const aiWorkflowHours = capabilities.some((c) => c.includes('AI')) ? Math.round(totalEffortHours * 0.15) : 0;
  const testingQaHours = Math.round(totalEffortHours * 0.10);
  const deploymentHours = totalEffortHours - (foundationHours + frontendHours + backendHours + aiWorkflowHours + testingQaHours);

  // 6. Indicative Cost Band (INR)
  const indicativeCostMinINR = Math.round(totalEffortHours * ESTIMATION_CONFIG.HOURLY_RATE_MIN_INR);
  const indicativeCostMaxINR = Math.round(totalEffortHours * ESTIMATION_CONFIG.HOURLY_RATE_MAX_INR);

  // 7. Timeline duration in weeks
  const estimatedDurationWeeks = Math.max(
    3,
    Math.ceil(totalEffortHours / ESTIMATION_CONFIG.WEEKLY_SPRINT_HOURS)
  );

  // 8. Complexity classification text
  const complexityLabels = {
    BASIC_MVP: 'Rapid Market Validation Prototype (MVP)',
    INTERMEDIATE: 'Production-Ready Scalable Application',
    ADVANCED: 'High-Concurrency Modular Solution',
    ENTERPRISE: 'Mission-Critical Enterprise Infrastructure'
  };

  return {
    totalEffortHours,
    foundationHours,
    frontendHours,
    backendHours,
    aiWorkflowHours,
    testingQaHours,
    deploymentHours,
    indicativeCostMinINR,
    indicativeCostMaxINR,
    estimatedDurationWeeks,
    complexityClassification: complexityLabels[complexity] || 'Production Solution',
    calculationVersion: 'v1.4'
  };
};

export default {
  calculateEstimation,
  ESTIMATION_CONFIG
};
