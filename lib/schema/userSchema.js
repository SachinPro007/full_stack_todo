import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password max length is 10"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
