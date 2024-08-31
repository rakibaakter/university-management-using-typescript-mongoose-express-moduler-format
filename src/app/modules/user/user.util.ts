import { TAcademicSemester } from "./../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async (year: String, code: String) => {
  const lastStudent = await User.findOne(
    { role: "student", id: { $regex: `^${year}${code}` } },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId(payload.year, payload.code); //   2024010004

  //   const lastStudentSemesterYear = lastStudentId?.substring(0, 4); //2024
  //   const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //2024
  //   const currentStudentSemesterYear = payload.year;
  //   const currentStudentSemesterCode = payload.code;

  //   if (
  //     lastStudentId &&
  //     lastStudentSemesterCode === currentStudentSemesterCode &&
  //     lastStudentSemesterYear === currentStudentSemesterYear
  //   ) {
  //     currentId = lastStudentId.substring(6); //last 4 digit
  //   }

  if (lastStudentId) {
    currentId = lastStudentId.substring(6); // Extract the last 4 digits
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  const generatedId = `${payload.year}${payload.code}${incrementId}`;

  return generatedId;
};
