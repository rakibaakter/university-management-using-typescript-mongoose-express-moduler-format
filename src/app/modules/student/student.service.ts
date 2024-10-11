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

const getAllStudentFromDB = async (query : Record<string, unknown>) => {

  const queryObj = {...query}; //copy of query

  let searchTerm = "";
  if(query?.searchTerm){
    searchTerm = query.searchTerm as string;
  }

  const searchableField = ['email', 'name.firstName', 'name.lastName', 'presentAddress'];

  const searchQuery = Student.find({
    $or : searchableField.map((field)=>({
      [field] : {$regex : searchTerm, $options : 'i'}
    }))
  });

  // filtering
  const excludeFields = ['searchTerm','sort', 'limit'];
  excludeFields.forEach(elem =>(delete queryObj[elem]))

  const filterQuery = searchQuery.find(queryObj)

// sort
let sort = 'createdAt';
if(query.sort){
  sort = query.sort as string;
}

const sortedQuery =   filterQuery.sort(sort);

// limit
let limit = 1;
if(query.limit){
  limit = query.limit as number;
}

const limitedQuery =  await sortedQuery.limit(limit).populate("academicSemester").populate({
  path: "academicDepartment",
  populate: "academicFaculty",
});

  return limitedQuery;
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

const updateStudentIntoDB = async(id : string, payload:Partial<TStudent>)=>{
  const {name, localGuardian, guardian, ...remainingStudentData} = payload;
  const modifiedUpdatedData :Record<string, unknown>= {...remainingStudentData}

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({id}, modifiedUpdatedData, {new: true, runValidators: true})
  return result;

}

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentByIDFromDB,
  deleteSingleStudentByIDFromDB,
  updateStudentIntoDB
};
