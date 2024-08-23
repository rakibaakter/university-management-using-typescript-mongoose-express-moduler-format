import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchSync";

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrived successfully",
    data: result,
  });
});

const getStudentByStudentId = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentByIDFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrived successfully",
    data: result,
  });
});

const deleteStudentByStudentId = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteSingleStudentByIDFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted successfully",
    data: result,
  });
});

export const studentControllers = {
  getAllStudent,
  getStudentByStudentId,
  deleteStudentByStudentId,
};
