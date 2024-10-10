import { TErrorSources, TGenericErrorResponse } from "../interface/error"

const handleDuplicateError = (err : any):TGenericErrorResponse =>{
    const statusCode = 400;

    const errorSources : TErrorSources = [{
        path : Object.keys(err.errorResponse.keyValue)[0],
        message : `${Object.values(err.errorResponse.keyValue)} is a duplicate value `
    }]

    return {
      statusCode,
      message : "Duplicate value identified",
      errorSources,
    }
}



export default handleDuplicateError