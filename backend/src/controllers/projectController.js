import projectService from '../services/projectService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const submitProjectInquiry = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    return successResponse(
      res,
      project,
      'Project blueprint and inquiry registered successfully.',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getProjectDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);

    if (!project) {
      return errorResponse(res, `No project found with ID: ${id}`, 404);
    }

    return successResponse(res, project, 'Project blueprint retrieved.');
  } catch (error) {
    next(error);
  }
};
