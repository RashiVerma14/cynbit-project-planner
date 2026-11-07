import projectService from '../services/projectService.js';
import aiService from '../services/aiService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const regenerateBlueprint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);

    if (!project) {
      return errorResponse(res, `No project found with ID: ${id}`, 404);
    }

    const newBlueprint = await aiService.generateProjectBlueprint(
      project.projectScope,
      project.technicalRequirements,
      project.estimation
    );

    project.blueprint = newBlueprint;
    return successResponse(res, newBlueprint, 'Blueprint re-synthesized successfully.');
  } catch (error) {
    next(error);
  }
};
