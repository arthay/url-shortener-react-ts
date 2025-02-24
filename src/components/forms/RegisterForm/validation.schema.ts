import { z } from 'zod';
import { emailValidation } from "@/lib/validations";

export const registerFormSchema = z.object({
  name: z
    .string({
      required_error: 'name.required',
    })
    .min(1, { message: 'name.required' }),
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

export type TRegisterForm = z.infer<typeof registerFormSchema>;
