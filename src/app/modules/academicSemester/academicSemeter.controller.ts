import httpStatus from "http-status";
import catchAsync from "../../utils/catchSync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is created Successfully!",
    data: result,
  });
});

export const academicSemesterControllers = { createAcademicSemester };
