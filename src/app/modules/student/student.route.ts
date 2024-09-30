import express from "express";
import { studentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", studentControllers.getAllStudent);
router.get("/:studentId", studentControllers.getStudentByStudentId);
router.delete("/:studentId", studentControllers.deleteStudentByStudentId);
router.patch("/:studentId",validateRequest(studentValidations.updateStudentValidationSchema), studentControllers.updateStudentByStudentId);

export const StudentRoutes = router;
