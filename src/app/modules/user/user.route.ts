import express from "express";
import { userControllers } from "./user.controllers";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// create user as student
router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent
);
// router.post("/create-student", userControllers.createStudent);

export const UserRoutes = router;
