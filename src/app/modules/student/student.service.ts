import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(studentData); //built in static method

  const student = new Student(studentData); //create an instance
  if (await student.isStudentExist(studentData.id)) {
    throw new Error("student already exists");
  }
  const result = await student.save(); // built in instance method

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find().populate("academicSemester").populate({
    path: "academicDepartment",
    populate: "academicFaculty",
  });
  return result;
};

const getSingleStudentByIDFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("academicSemester")
    .populate({
      path: "academicDepartment",
      populate: "academicFaculty",
    });
  return result;
};

const deleteSingleStudentByIDFromDB = async (id: string) => {
  const session =await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
  }
  
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentByIDFromDB,
  deleteSingleStudentByIDFromDB,
};
