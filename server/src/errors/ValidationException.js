module.exports = function ValidationException(message) {
  this.message = message || "Data is not provided";
  this.status = 400;
};
