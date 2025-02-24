import { z } from 'zod';
import { emailValidation } from "@/lib/validations";

export const registerFormSchema = z.object({
  name: z
    .string({
      required_error: 'nameIsRequired',
    })
    .min(1, { message: 'nameIsRequired' }),
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

export type TRegisterForm = z.infer<typeof registerFormSchema>;
