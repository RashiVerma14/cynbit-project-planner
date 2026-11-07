import { config } from '../config/environment.js';

// Deterministic rule-based blueprint fallback generator
export const generateFallbackBlueprint = (projectScope, technicalRequirements, estimation) => {
  const { projectName, category, description, problemStatement, industry, targetAudience } = projectScope;
  const capabilities = technicalRequirements.selectedCapabilities || [];
  const duration = estimation?.estimatedDurationWeeks || 8;

  const phase1Weeks = Math.max(1, Math.round(duration * 0.2));
  const phase2Weeks = Math.max(2, Math.round(duration * 0.45));
  const phase3Weeks = Math.max(1, Math.round(duration * 0.25));
  const phase4Weeks = Math.max(1, duration - (phase1Weeks + phase2Weeks + phase3Weeks));

  return {
    executiveSummary: `The architectural blueprint for ${projectName} defines a resilient, high-throughput digital solution tailored for ${industry}. The system decouples interactive client interfaces from modular REST/WebSocket services to eliminate manual bottlenecks in ${problemStatement}.`,
    suggestedArchitecture: `A modern three-tier decoupled architecture: (1) Presentation layer powered by React.js with Tailwind CSS, (2) Application gateway & business logic handled by Node.js & Express with JWT security filters, and (3) Data persistence tier hosted on MongoDB Atlas with automated indexing and transaction logging.`,
    coreModules: [
      'Identity & Role-Based Access Control (RBAC)',
      'High-Throughput Business Process Orchestrator',
      capabilities.some((c) => c.includes('AI'))
        ? 'Cognitive AI Pipeline & Context Vector Store'
        : 'Modular Business Logic & Reporting Engine',
      'Audit Trail, Security Logging & Analytics Ledger'
    ],
    phases: [
      {
        phase: 'Phase 1: Architectural Scoping & UI/UX Wireframing',
        duration: `${phase1Weeks} Weeks`,
        deliverables: 'Interactive Figma design tokens, OpenAPI specification contracts, database schema models.'
      },
      {
        phase: 'Phase 2: Core Engineering & Backend Implementation',
        duration: `${phase2Weeks} Weeks`,
        deliverables: 'REST micro-endpoints, MongoDB schema indexes, stateful React client components, authentication flows.'
      },
      {
        phase: 'Phase 3: Integration, AI Orchestration & Third-Party APIs',
        duration: `${phase3Weeks} Weeks`,
        deliverables: 'External webhook integrations, automated cron queues, end-to-end integration test suites.'
      },
      {
        phase: 'Phase 4: Security Hardening, QA & Cloud Rollout',
        duration: `${phase4Weeks} Weeks`,
        deliverables: 'Load testing, penetration security audit, containerized staging/production deployment.'
      }
    ],
    scalabilityConsiderations: `Containerization via Docker combined with multi-AZ cloud load balancing allows automated vertical and horizontal autoscaling to handle rapid request surges from ${targetAudience}.`,
    riskMitigation: `All external dependencies implement circuit breakers, retry policies, and deterministic fallbacks to guarantee 99.9% application uptime regardless of upstream API latency.`,
    isAiGenerated: false
  };
};

export const generateProjectBlueprint = async (projectScope, technicalRequirements, estimation) => {
  // If no Groq API Key is configured, use deterministic architectural fallback
  if (!config.groqApiKey) {
    console.log('[AI Service] No GROQ_API_KEY detected. Utilizing deterministic rule-based blueprint generator.');
    return generateFallbackBlueprint(projectScope, technicalRequirements, estimation);
  }

  const prompt = `
You are the Chief Technology Officer at Cynbit Technologies (cynbit.in), an enterprise software and AI agency.
Analyze the following project parameters and generate an architectural blueprint formatted STRICTLY as a valid JSON object.

PROJECT DETAILS:
- Name: ${projectScope.projectName}
- Category: ${projectScope.category}
- Description: ${projectScope.description}
- Problem Statement: ${projectScope.problemStatement}
- Target Audience: ${projectScope.targetAudience}
- Industry: ${projectScope.industry}
- Selected Capabilities: ${technicalRequirements.selectedCapabilities?.join(', ') || 'Standard Features'}
- Complexity: ${technicalRequirements.complexity}
- Estimated Velocity: ${estimation?.estimatedDurationWeeks || 8} weeks (${estimation?.totalEffortHours || 300} effort hours)

OUTPUT REQUIREMENT:
Output ONLY valid JSON matching this exact structure with no extra markdown wrapping:
{
  "executiveSummary": "Concise 2-3 sentence technical thesis explaining the core product vision.",
  "suggestedArchitecture": "Detailed description of the frontend, backend, database and middleware tiers.",
  "coreModules": ["Module 1", "Module 2", "Module 3", "Module 4"],
  "phases": [
    { "phase": "Phase 1: Architecture & UX", "duration": "X Weeks", "deliverables": "Deliverables list" },
    { "phase": "Phase 2: Core Engineering", "duration": "X Weeks", "deliverables": "Deliverables list" },
    { "phase": "Phase 3: Integrations & AI", "duration": "X Weeks", "deliverables": "Deliverables list" },
    { "phase": "Phase 4: QA & Deployment", "duration": "X Weeks", "deliverables": "Deliverables list" }
  ],
  "scalabilityConsiderations": "Explanation of caching, DB indexing, and cloud auto-scaling strategy.",
  "riskMitigation": "Analysis of data security, rate limiting, and technical failovers."
}
`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.groqApiKey}`
      },
      body: JSON.stringify({
        model: config.groqModel || 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a senior software architect. Return only strict JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Groq API responded with status ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(rawContent);

    return {
      ...parsed,
      isAiGenerated: true
    };
  } catch (error) {
    console.warn(`[AI Service] Groq call failed (${error.message}). Gracefully reverting to deterministic blueprint fallback.`);
    return generateFallbackBlueprint(projectScope, technicalRequirements, estimation);
  }
};

export default {
  generateProjectBlueprint,
  generateFallbackBlueprint
};

