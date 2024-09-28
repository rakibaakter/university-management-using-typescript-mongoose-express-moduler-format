import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidations } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema
  ),
  academicFacultyControllers.createAcademicFaculty
);

router.get("/", academicFacultyControllers.getAllAcademicFaculties);

router.get(
  "/:facultyId",
  academicFacultyControllers.getSingleAcademicFacultyById
);

router.patch(
  "/:facultyId",
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema
  ),
  academicFacultyControllers.updateSingleAcademicFacultyById
);

export const AcademicFacultyRoutes = router;
