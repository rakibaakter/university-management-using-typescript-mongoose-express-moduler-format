import { z } from "zod";

export const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: "Password can not be more than 20 characters" }),
  needPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(["admin", "student", "faculty"]),
  status: z.enum(["in-progress", "blocked"]),
  isDeleted: z.boolean().default(false),
});
