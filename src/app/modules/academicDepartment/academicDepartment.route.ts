import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidations } from "./academicDepartment.validation";
import { academicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(
    academicDepartmentValidations.createAcademicDepartmentValidation
  ),
  academicDepartmentControllers.createAcademicDepartment
);

router.get("/", academicDepartmentControllers.getAllAcademicDepartment);

router.get(
  "/:departmentId",
  academicDepartmentControllers.getAcademicDepartmentById
);

router.patch(
  "/:departmentId",
  validateRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidation
  ),
  academicDepartmentControllers.updateAcademicDepartmentById
);

export const academicDepartmentRoutes = router;
