export const generateRecommendations = (category, capabilities = [], complexity = 'INTERMEDIATE') => {
  // Category-based tech mappings
  let frontend = 'React.js (Vite) + Tailwind CSS';
  let frontendReason = 'Component modularity, optimized bundle size, and responsive interface agility.';

  let backend = 'Node.js & Express.js';
  let backendReason = 'Event-driven non-blocking I/O, rapid API prototyping, and seamless JSON document pipelines.';

  let database = 'MongoDB Atlas';
  let databaseReason = 'High flexibility for dynamic domain schemas, nested capabilities, and automated cluster scaling.';

  let infrastructure = 'AWS ECS & Docker + Vercel CDN';
  let infrastructureReason = 'Containerized server isolation paired with global edge caching for low-latency delivery.';

  let ai = 'Groq LLM (Llama 3.3 70B) + Pinecone Vector Store';
  let aiReason = 'Sub-second inference velocity via LPU acceleration and semantic context retrieval.';

  // Adjustments based on category
  if (category === 'CUSTOM_ENTERPRISE') {
    backend = 'Node.js (NestJS / Express) + Microservices';
    backendReason = 'Strict type separation, dependency injection, and horizontal domain scaling.';
    database = 'MongoDB Atlas + PostgreSQL (Hybrid)';
    databaseReason = 'Relational consistency for transactional ledger alongside document store for rapid queries.';
  } else if (category === 'MOBILE_APP') {
    frontend = 'React Native (Expo) / Flutter';
    frontendReason = 'Shared cross-platform codebase compiling to native iOS and Android experiences.';
  } else if (category === 'SAAS_PLATFORM') {
    frontend = 'React.js + Tailwind CSS';
    database = 'MongoDB Atlas (Multi-Tenant Partitioned)';
    databaseReason = 'Tenant isolation by organization key with automated index optimization.';
  }

  // Adjustments based on capabilities
  if (capabilities.includes('REALTIME_NOTIFICATIONS') || capabilities.includes('AI_AGENTS')) {
    backend += ' + Socket.io / WebSockets';
    backendReason += ' Real-time bidirectional event channel for live agent outputs and push triggers.';
  }

  return {
    frontend: { technology: frontend, justification: frontendReason },
    backend: { technology: backend, justification: backendReason },
    database: { technology: database, justification: databaseReason },
    infrastructure: { technology: infrastructure, justification: infrastructureReason },
    ai: { technology: ai, justification: aiReason }
  };
};

export default {
  generateRecommendations
};

