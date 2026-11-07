import projectService from '../services/projectService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getAdminProjects = async (req, res, next) => {
  try {
    const { page = 0, size = 20, status, category, search } = req.query;
    const result = await projectService.getAllProjects({
      page: parseInt(page),
      size: parseInt(size),
      status,
      category,
      search
    });

    return successResponse(res, result.content, 'Project inquiries retrieved.');
  } catch (error) {
    next(error);
  }
};

export const getAdminProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);

    if (!project) {
      return errorResponse(res, `No project found with ID: ${id}`, 404);
    }

    return successResponse(res, project, 'Project dossier retrieved.');
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['NEW', 'UNDER_REVIEW', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return errorResponse(res, `Invalid status value. Must be one of: ${validStatuses.join(', ')}`, 400);
    }

    const updated = await projectService.updateProjectStatus(id, status);

    if (!updated) {
      return errorResponse(res, `No project found with ID: ${id}`, 404);
    }

    return successResponse(res, updated, 'Inquiry status updated successfully.');
  } catch (error) {
    next(error);
  }
};
