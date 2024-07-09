import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchSync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // const zodParseData = studentValidationSchema.parse(studentData);

  //   will call service func to send this data
  const result = await userServices.createStudentIntoDB(password, studentData);

  // will send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student has been created successfully",
    data: result,
  });
});

export const userControllers = { createStudent };
