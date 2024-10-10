// import { path } from 'path';
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from 'zod';
import config from "../config";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import handleValidationError from "../errors/handleValidationError";



const globalErrorHandler : ErrorRequestHandler = (err, req, res, next) => {

  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources : TErrorSources = [{
    path : "",
    message :"Something went wrong !"
  }];



  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

  }else if(err?.name ==="ValidationError"){
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack : config.NODE_ENV === "development" ? err.stack : null,
    // err,
  });
};

export default globalErrorHandler;
