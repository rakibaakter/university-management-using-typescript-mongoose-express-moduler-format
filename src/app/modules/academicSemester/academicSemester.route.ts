import express from "express";
import { academicSemesterControllers } from "./academicSemeter.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();

router.use(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  academicSemesterControllers.createAcademicSemester
);

export const AcademicSemesterRoute = router;
