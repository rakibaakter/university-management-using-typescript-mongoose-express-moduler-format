import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParseData = studentValidationSchema.parse(studentData);

    //   will call service func to send this data
    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );

    // will send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student has been created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = { createStudent };
