exports.sendErrorResponse = (statusCode, errMessage, res) => {
    res.status(statusCode).json({
        status: 'fail',
        errMessage: errMessage
    })
}