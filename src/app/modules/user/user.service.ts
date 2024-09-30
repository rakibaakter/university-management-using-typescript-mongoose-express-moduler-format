import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
// import { TNewUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.util";

// create user as student
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // const result = await Student.create(payload); //built in static method

  //   const student = new Student(payload); //create an instance
  //   if (await student.isStudentExist(payload.id)) {
  //     throw new AppError("student already exists");
  //   }

  //   const result = await student.save(); // built in instance method

  // create a new user
  const userData: Partial<TUser> = {};
  //   set user password, if not given then set default password
  userData.password = password || (config.defaultPassword as string);
  //   set user role as student
  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    payload.academicSemester
  );
  //   set manual generated id
  // userData.id = "2024100423";

  //   generated id
  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    payload.password = newUser.password;

    const newStudent = await Student.create(payload);

    return newStudent;
  } else {
    throw new AppError();
  }
};

export const userServices = {
  createStudentIntoDB,
};
