import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
// import { TNewUser } from "./user.interface";
import { User } from "./user.model";

// create user as student
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // const result = await Student.create(studentData); //built in static method

  //   const student = new Student(studentData); //create an instance
  //   if (await student.isStudentExist(studentData.id)) {
  //     throw new Error("student already exists");
  //   }

  //   const result = await student.save(); // built in instance method

  // create a new user
  const userData: Partial<TUser> = {};
  //   set user password, if not given then set default password
  userData.password = password || (config.defaultPassword as string);
  //   set user role as student
  userData.role = "student";
  //   set manual generated id
  userData.id = "20241001";

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    studentData.password = newUser.password;

    const newStudent = await Student.create(studentData);

    return newStudent;
  } else {
    throw new Error();
  }
};

export const userServices = {
  createStudentIntoDB,
};
