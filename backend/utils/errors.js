/**
 * CustomErrorHandler will extend Error class.
 * And populate with custom error message and provide a getCode()
 * utility function.
 */
class CustomErrorHandler extends Error {
  constructor(errors) {
    /**
     * By calling the super() method in the constructor method,
     * we call the parent's constructor
     * method and gets access to the parent's properties and methods.
     */
    super();
    this.errors = errors;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    } else if (this instanceof PageNotFound) {
      return 404;
    } else if(this instanceof ForbiddenError) {
      return 403;
    } 
    else {
      return 500;
    }
  }
}

class BadRequest extends CustomErrorHandler {}
class PageNotFound extends CustomErrorHandler {}
class ForbiddenError extends CustomErrorHandler {}

/**
 * errorHandler is a utility function.
 * To handle custom error based on instanceof error object.
 */
const errorHandler = (error, request, response, next) => {
  if (error instanceof CustomErrorHandler) {
    return response.status(error.getCode()).json({
      errors: error.errors,
    });
  }
  return response.status(500).json({
    errors: error.message,
  });
};

module.exports = { CustomErrorHandler, BadRequest, PageNotFound, ForbiddenError, errorHandler };
