import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
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
    res.status(200).json({
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
    res.status(200).json({
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
