import estimationService from '../services/estimationService.js';
import recommendationService from '../services/recommendationService.js';
import { successResponse } from '../utils/apiResponse.js';

export const calculateEstimatePreview = (req, res, next) => {
  try {
    const { category, selectedCapabilities, complexity } = req.body;

    const estimation = estimationService.calculateEstimation({
      category,
      selectedCapabilities,
      complexity
    });

    const recommendations = recommendationService.generateRecommendations(
      category,
      selectedCapabilities,
      complexity
    );

    return successResponse(
      res,
      { estimation, recommendations },
      'Indicative estimate computed successfully.'
    );
  } catch (error) {
    next(error);
  }
};

