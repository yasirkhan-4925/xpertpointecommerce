
const customErrorHandler = (err,req,res,next) => {

    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    })

    next();
    
}


const notFind = (req,res,next) => {
    const error = new Error(`not found - ${req.originalUrl}`)
    res.status(400);
    next(error);
}

export { customErrorHandler , notFind };