/**
 * CustomErrorHandler will extend Error class.
 * And populate with custom error message and provide a getCode()
 * utility function.
 */
class CustomErrorHandler extends Error {
  constructor(message) {
    /**
     * By calling the super() method in the constructor method,
     * we call the parent's constructor
     * method and gets access to the parent's properties and methods.
     */
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    } else if (this instanceof PageNotFound) {
      return 404;
    } else {
      return 500;
    }
  }
}

class BadRequest extends CustomErrorHandler {}
class PageNotFound extends CustomErrorHandler {}

/**
 * errorHandler is a utility function.
 * To handle custom error based on instanceof error object.
 */
const errorHandler = (error, request, response, next) => {
  if (error instanceof CustomErrorHandler) {
    return response.status(error.getCode()).json({
      message: error.message,
    });
  }
  return response.status(500).json({
    message: error.message,
  });
};

module.exports = { CustomErrorHandler, BadRequest, PageNotFound, errorHandler };
