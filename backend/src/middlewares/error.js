class MiddlewareError {
  static async error(err, _, res, __) {
    let code;
    let message;
    let data;

    console.log("Error:", err)

    switch(err.name) {
      case "SequelizeDatabaseError":
        code = 400
        message = err.message
        data = [err.message]
        break
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        code = 400
        message = err.errors[0].message
        data = err.errors.map(error => error.message)
        break
    }
    
    return res.status(code).json({
      status: false,
      message,
      data,
    });
  }
}

module.exports = MiddlewareError
