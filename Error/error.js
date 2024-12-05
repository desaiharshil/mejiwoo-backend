const errorHandler = require('../midlewere/errorhandler');

module.exports = (err, req, res, next) => {
    err.code = err.code || 500;
    err.message = err.message || "Internal Server Error";

    err = new errorHandler(err.message, err.code);

    return res.status(err.code).json({
        code: err.code,
        success: false,
        message: err.message
    });
};