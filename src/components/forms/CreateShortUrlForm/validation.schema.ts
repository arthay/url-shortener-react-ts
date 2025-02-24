import { z } from 'zod';
import { urlValidation } from "@/lib/validations";

export const createShortUrlFormSchema = z.object({
  url: z
    .string({
      required_error: 'url.required',
    })
    .refine(urlValidation, {
      message: 'url.invalid',
    }).default(''),
});

export type TCreateShortUrlForm = z.infer<typeof createShortUrlFormSchema>;
