import { z } from "zod";

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().default(false),
});

export const loginDefaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

/**
 * Registration form validation schema
 */
export const registrationSchema = z
  .object({
    companyName: z
      .string()
      .min(1, "Company name is required")
      .min(2, "Company name must be at least 2 characters long")
      .max(100, "Company name cannot be longer than 100 characters"),
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters long")
      .max(100, "Full name cannot be longer than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password cannot be longer than 50 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(1, "Password confirmation is required"),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the terms of use",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirmation password do not match",
    path: ["confirmPassword"], // This sets which field the error appears on
  });

export const registrationDefaultValues = {
  companyName: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};
