module.exports = (err, req, res, next) => {
  const { status, message } = err;

  res.status(status).json({
    timestamp: new Date().getTime(),
    message: message,
  });
};
