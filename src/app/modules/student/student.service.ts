import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(studentData); //built in static method

  const student = new Student(studentData); //create an instance
  if( await student.isStudentExist(studentData.id)){
    throw new Error("student already exists");
  }
  const result = await student.save() ;// built in instance method


  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentByIDFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentByIDFromDB,
};
