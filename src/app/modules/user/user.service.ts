import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
// import { TNewUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.util";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// create user as student
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // const result = await Student.create(payload); //built in static method

  //   const student = new Student(payload); //create an instance
  //   if (await student.isStudentExist(payload.id)) {
  //     throw new AppError("student already exists");
  //   }

  //   const result = await student.save(); // built in instance method

  // create an user object
  const userData: Partial<TUser> = {};
  //   set user password, if not given then set default password
  userData.password = password || (config.defaultPassword as string);
  //   set user role as student
  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    payload.academicSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //   generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a new user - transaction 1
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.password = newUser[0].password;

    // create a new student - transaction 2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
  }
};

export const userServices = {
  createStudentIntoDB,
};
