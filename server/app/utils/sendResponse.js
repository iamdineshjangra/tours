exports.sendErrorResponse = (statusCode, errMessage, res, modelError) => {
    if(!modelError) {
       return res.status(statusCode).json({
            status: 'fail',
            errMessage: errMessage
        })
    }
    res.status(statusCode).json({
        status: 'fail',
        errMessage: errMessage,
        isModelError: true
    });
}