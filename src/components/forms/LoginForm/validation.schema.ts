import { z } from 'zod';
import { emailValidation } from "@/lib/validations";

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'email.required',
    })
    .refine(emailValidation, {
      message: 'email.invalid',
    }).default(''),

  password: z
    .string({
      required_error: 'password.required',
    })
    .min(8, { message: 'password.invalid' }).default(''),
});

export type TLoginForm = z.infer<typeof loginFormSchema>;
