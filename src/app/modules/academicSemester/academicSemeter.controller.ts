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

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester are retrived successfully",
    data: result,
  });
});

const getSingleAcademicSemesterById = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterByIdFromDB(
      semesterId
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrived successfully",
    data: result,
  });
});

const updateAcademicSemesterById = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const payload = req.body;
  const result = await academicSemesterServices.updateSemesterByIDIntoDB(
    semesterId,
    payload
  );
  console.log("contoller", result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester has been updated successfully!",
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesterById,
  updateAcademicSemesterById,
};
