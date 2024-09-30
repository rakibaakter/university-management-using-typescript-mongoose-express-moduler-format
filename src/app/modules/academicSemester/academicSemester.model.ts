import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: AcademicSemesterName },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    startMonth: { type: String, required: true, enum: Months },
    endMonth: { type: String, required: true, enum: Months },
  },
  {
    timestamps: true,
  }
);

// check if semester already exists
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester already exists for this year"
    );
  }
  next();
});

// Pre-update hook to check if the semester already exists
academicSemesterSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const update = this.getUpdate() as Partial<TAcademicSemester>;

  const isAcademicSemesterExist = await AcademicSemester.findOne(query);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester does not exists"
    );
  }

  const isSemesterExist = await AcademicSemester.findOne({
    year: update.year,
    name: update.name,
  });
  if (isSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester already exists for this year"
    );
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
