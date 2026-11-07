export const validateProjectSubmission = (req, res, next) => {
  const { clientInfo, projectScope } = req.body;

  if (!clientInfo || !clientInfo.fullName || !clientInfo.businessEmail) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: clientInfo requires fullName and a valid businessEmail.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clientInfo.businessEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: Please provide a valid email format.'
    });
  }

  if (!projectScope || !projectScope.projectName || !projectScope.description) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: projectScope requires projectName and description.'
    });
  }

  next();
};

export const validateEstimationRequest = (req, res, next) => {
  const { category } = req.body;
  if (!category) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: Project category is required.'
    });
  }
  next();
};

