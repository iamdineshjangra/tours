exports.sendErrorResponse = (statusCode, errMessage, res, modelError) => {
  return res.status(statusCode).json({
    status: "fail",
    errMessage: errMessage,
  });
};
