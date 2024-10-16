import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableField } from "./student.constants";

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

  const studentQuery = new QueryBuilder(Student.find()
        .populate("academicSemester")
        .populate({
          path: "academicDepartment",
          populate: "academicFaculty",
        }), query).search(searchableField).filter().sort().pagination().fields()

  const result = await studentQuery.modelQuery;
  return result;


//   const queryObj = {...query}; //copy of query

//   let searchTerm = "";
//   if(query?.searchTerm){
//     searchTerm = query.searchTerm as string;
//   }

//   const searchableField = ['email', 'name.firstName', 'name.lastName', 'presentAddress'];

//   const searchQuery = Student.find({
//     $or : searchableField.map((field)=>({
//       [field] : {$regex : searchTerm, $options : 'i'}
//     }))
//   }).populate("academicSemester").populate({
//     path: "academicDepartment",
//     populate: "academicFaculty",
//   });

//   // filtering
//   const excludeFields = ['searchTerm','sort', 'limit', 'page', 'fields'];
//   excludeFields.forEach(elem =>(delete queryObj[elem]))

//   const filterQuery = searchQuery.find(queryObj)

// // sort
// let sort = 'createdAt';
// if(query.sort){
//   sort = query.sort as string;
// }

// const sortedQuery =   filterQuery.sort(sort);

// // limit
// let limit = 1;
// if(query.limit){
//   limit = Number(query.limit) ;
// }

// // paginatio with limit
// let page = 1;
// let skip = 0;

// if(query.page){
//   page = Number(query.page);
//   skip = (page - 1)*limit
// }

// const paginateQuery = sortedQuery.skip(skip)

// const limitedQuery =  await paginateQuery.limit(limit)

// // fields
// let fields = '-__v'; 

// if (query.fields) {
//   fields = (query.fields as string).split(',').join(' ');

// }

// const fieldQuery = await limitedQuery.select(fields);

// return fieldQuery;

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
