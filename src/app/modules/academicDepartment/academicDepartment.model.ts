import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExist) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "This academic department already exists"
//     );
//   }
//   next();
// });

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  // console.log(query);
  const update = this.getUpdate() as Partial<TAcademicDepartment>;

  const isDepartmentExist = await AcademicDepartment.findOne(query);
  const isDepartmentNameExist = await AcademicDepartment.findOne({
    name: update?.name,
  });
  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic department does not exists"
    );
  }
  if (isDepartmentNameExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This academic department exists");
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
