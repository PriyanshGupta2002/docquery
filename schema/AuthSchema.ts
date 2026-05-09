import * as z from "zod";

export const registerFormSchema = z.object({
  email: z.email({ message: "Invalid Email" }),
  name: z.string().min(2, "Name must be at least 2 characters."),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid Email" }),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});
