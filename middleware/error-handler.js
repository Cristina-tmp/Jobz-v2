import { StatusCodes } from "http-status-codes";

const errorHandleMiddleware = (err, req, res, next) => {
  // console.log(err.message);
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  //check for missing fields
  if (err.name === "ValidationError") {
    err.statusCode = StatusCodes.BAD_REQUEST;
    //defaultError.msg = err.message;

    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  //check for unique fields

  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    //acces the keys of the object
    defaultError.msg = `${Object.keys(err.keyValue)} has to be unique`;
  }

  // res.status(defaultError.statusCode).json({ msg: err });
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandleMiddleware;
