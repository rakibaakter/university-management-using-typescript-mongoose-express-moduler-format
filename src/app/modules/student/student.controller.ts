import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrived successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getStudentByStudentId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentByIDFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is retrived successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudentByStudentId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result =
      await studentServices.deleteSingleStudentByIDFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudent,
  getStudentByStudentId,
  deleteStudentByStudentId,
};
