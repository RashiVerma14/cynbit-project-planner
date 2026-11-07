import assert from 'node:assert';
import test from 'node:test';
import { calculateEstimation } from '../src/services/estimationService.js';
import { generateRecommendations } from '../src/services/recommendationService.js';
import { generateFallbackBlueprint } from '../src/services/aiService.js';

test('Estimation Service: Calculates deterministic effort for MVP', () => {
  const result1 = calculateEstimation({
    category: 'AI_POWERED_APP',
    selectedCapabilities: ['AUTH_RBAC', 'AI_AGENTS'],
    complexity: 'BASIC_MVP'
  });

  const result2 = calculateEstimation({
    category: 'AI_POWERED_APP',
    selectedCapabilities: ['AUTH_RBAC', 'AI_AGENTS'],
    complexity: 'BASIC_MVP'
  });

  assert.strictEqual(result1.totalEffortHours, result2.totalEffortHours);
  assert.strictEqual(result1.indicativeCostMinINR, result2.indicativeCostMinINR);
  assert.strictEqual(result1.indicativeCostMaxINR, result2.indicativeCostMaxINR);
  assert(result1.totalEffortHours > 100, 'Effort should exceed baseline');
});

test('Estimation Service: Scales with complexity tiers', () => {
  const mvp = calculateEstimation({ category: 'SAAS_PLATFORM', complexity: 'BASIC_MVP' });
  const enterprise = calculateEstimation({ category: 'SAAS_PLATFORM', complexity: 'ENTERPRISE' });

  assert(enterprise.totalEffortHours > mvp.totalEffortHours * 2, 'Enterprise multiplier should double MVP effort');
});

test('Recommendation Service: Generates appropriate stack for category', () => {
  const aiRec = generateRecommendations('AI_POWERED_APP', ['AI_AGENTS']);
  assert(aiRec.ai.technology.includes('Groq') || aiRec.ai.technology.includes('Vector'), 'AI stack should include Groq/Vector');
  assert(aiRec.backend.technology.includes('WebSockets'), 'AI Agents should trigger WebSockets recommendation');
});

test('AI Service: Fallback blueprint provides complete specification', () => {
  const blueprint = generateFallbackBlueprint(
    {
      projectName: 'Test Platform',
      category: 'SAAS_PLATFORM',
      description: 'A test platform description exceeding twenty characters.',
      problemStatement: 'Manual friction',
      targetAudience: 'Enterprises',
      industry: 'Software'
    },
    { selectedCapabilities: ['AUTH_RBAC'] },
    { estimatedDurationWeeks: 8, totalEffortHours: 250 }
  );

  assert(blueprint.executiveSummary.length > 20);
  assert(Array.isArray(blueprint.phases));
  assert.strictEqual(blueprint.phases.length, 4);
  assert.strictEqual(blueprint.isAiGenerated, false);
});
