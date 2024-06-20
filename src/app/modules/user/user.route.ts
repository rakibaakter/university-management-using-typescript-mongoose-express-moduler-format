import express from "express";
import { userControllers } from "./user.controllers";

const router = express.Router();

// create user as student
router.post("/create-student", userControllers.createStudent);

export const UserRoutes = router;
