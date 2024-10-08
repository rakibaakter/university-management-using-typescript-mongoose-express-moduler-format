import express from "express";
import { academicSemesterControllers } from "./academicSemeter.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();

// router.post(
//   "/create-academic-semester",
//   academicSemesterControllers.createAcademicSemester
// );
router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  academicSemesterControllers.createAcademicSemester
);
router.get("/", academicSemesterControllers.getAllAcademicSemesters);
router.get(
  "/:semesterId",
  academicSemesterControllers.getSingleAcademicSemesterById
);
router.patch(
  "/:semesterId",
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  academicSemesterControllers.updateAcademicSemesterById
);

export const AcademicSemesterRoutes = router;
