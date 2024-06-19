import { Model } from "mongoose";

//  name
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// guardian
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

// local guardian
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// student
export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted: boolean;
};

//instance methods
export type StudentMethods = {
  isStudentExist(id: string): Promise<TStudent | null>;
};

// Create a new Model type that knows about StudentMethods
export type StudentModel = Model<TStudent, {}, StudentMethods>;
