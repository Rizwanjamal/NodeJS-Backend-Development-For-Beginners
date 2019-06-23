const logger = (req, res, next) => {
    console.log('First Middleware');
    next();
};

module.exports = logger;