import { Schema, model } from "mongoose";
import {
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
// import bcrypt from "bcrypt";
// import config from "../../config";

const userNameSchema = new Schema<TUserName, StudentModel, StudentMethods>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father Name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No is required"],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: [true, "ID is required"], unique: true },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      unique: true,
      ref: "User",
    },
    name: { type: userNameSchema, required: [true, "Name is required"] },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message:
          '{VALUE} is not valid, it must be one of "male", "female", "other" ',
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency ContactNo number is required"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present Address number is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "permanentAddress number is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, " Local guardian information is required"],
    },
    profileImage: { type: String },
    academicSemester: { type: Schema.Types.ObjectId, ref: AcademicSemester },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
  }
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName || ""} ${this.name.lastName}`;
});

// query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// creating instance method
studentSchema.methods.isStudentExist = async function (id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
