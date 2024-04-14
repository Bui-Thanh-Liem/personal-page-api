export const errorHandlingMiddleware = (err, req, res, next) => {
    if(!err.statusCode) err.statusCode = 500;
    const responseError = {
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack
    }

    res.status(err.statusCode).json(responseError);
}
