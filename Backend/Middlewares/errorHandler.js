const { CustomApiError } = require("../Middlewares/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something Went Wrong, Please try again" });
};

module.exports = errorHandlerMiddleware;
