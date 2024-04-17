import { z } from 'zod';

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be 3 character log')
    .max(20, 'Username must be no longer than 20 characters'),
  email: z.string().includes('@').email('This is not a valid email'),
  password: z.string().min(6, "Password can't be less than 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password can't be less than 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email().includes('@').min(3).max(20),
  password: z.string().min(6).max(20),
});

export const projectSchema = z.object({
  name: z.string().min(3).max(20),
  image: z.string().min(3).max(20),
  containerPort: z.number().min(3000).max(4000),
});

export type User = {
  id: number;
  email: string;
  hashedPassword: string;
  name: string | null;
  role: string;
};

export type userPayload = {
  id: string;
  email: string;
};
