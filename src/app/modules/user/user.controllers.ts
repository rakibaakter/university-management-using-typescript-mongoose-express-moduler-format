import { Request, Response } from "express";
import { userServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParseData = studentValidationSchema.parse(studentData);

    //   will call service func to send this data
    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );

    // will send response
    res.status(200).json({
      success: true,
      message: "Student has been created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

export const userControllers = { createStudent };
