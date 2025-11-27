export const sendSuccessResponse = (res, message, data, statusCode, req) => {
  res.status(statusCode || 200).json({
    route: req.originalUrl,
    success: true,  
    statusCode: statusCode || 200,
    message,
    data: data || {},
  });
}

export const sendErrorResponse = (res, message, statusCode, req) => {
  res.status(statusCode || 500).json({
    route: req.originalUrl,
    success: false,
    statusCode: statusCode || 500,
    message,
  });
}

export const sendClientErrorResponse = (res, message, statusCode, req) => {
  res.status(statusCode || 400).json({
    route: req.originalUrl,
    success: false,
    statusCode: statusCode || 400,
    message,
  });
}