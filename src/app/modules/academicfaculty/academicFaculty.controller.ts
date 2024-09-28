import httpStatus from "http-status";
import catchAsync from "../../utils/catchSync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty created successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculties are retrived successfully",
    data: result,
  });
});

const getSingleAcademicFacultyById = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty retrived successfully",
    data: result,
  });
});

const updateSingleAcademicFacultyById = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.updateSingleAcadmicFacultyIntoDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty updated successfully",
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFacultyById,
  updateSingleAcademicFacultyById,
};
