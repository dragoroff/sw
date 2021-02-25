module.exports = function ValidationException() {
  this.message = "Data is not provided";
  this.status = 400;
};
