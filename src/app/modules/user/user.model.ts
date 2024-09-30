import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ["admin", "student", "faculty"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// middlewares | hook pre for save
userSchema.pre("save", async function (next) {
  const student = this;
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcryptSaltRound)
  );
  next();
});

// post save middleware / hook
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
