import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is require" })
    .min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string({ required_error: "This field is required" }),
});
