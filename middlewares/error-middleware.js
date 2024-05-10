const constants = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

export default function (err, req, res, next) {
    console.log(err);

    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "Validation Failed",
          message: err.message,
        });
        break;
      case constants.NOT_FOUND:
        res.json({
          title: "Not Found",
          message: err.message,
        });
      case constants.UNAUTHORIZED:
        res.json({
          title: "Unauthorized",
          message: err.message,
        });
      case constants.FORBIDDEN:
        res.json({
          title: "Forbidden",
          message: err.message,
        });
      case constants.SERVER_ERROR:
        res.json({
          title: "Server Error",
          message: err.message,
        });
      default:
        console.log("All good");
        break;
    }
};  

