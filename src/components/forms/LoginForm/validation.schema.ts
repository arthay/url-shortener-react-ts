import { z } from 'zod';
import { emailValidation } from "@/lib/validations";

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'emailIsRequired',
    })
    .refine(emailValidation, {
      message: 'invalidEmailAddress',
    }).default(''),

  password: z
    .string({
      required_error: 'passwordIsRequired',
    })
    .min(8, { message: 'passwordValidation' }).default(''),
});

export type TLoginForm = z.infer<typeof loginFormSchema>;
