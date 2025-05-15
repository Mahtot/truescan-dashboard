// validation.ts
import { z, ZodType } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
};

export const loginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const signupSchema: ZodType<SignupFormData> = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    companyName: z.string().min(3).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterProductFormData = {
  productName: string;
  serialNumber: number;
};

export const RegisterProductSchema: ZodType<RegisterProductFormData> = z.object(
  {
    productName: z.string().min(2),
    serialNumber: z.coerce
      .number()
      .int()
      .positive("Quantity must be a positive number"),
  }
);
