import { z } from 'zod';

export const updateShortUrlFormSchema = z.object({
  slug: z
    .string({
      required_error: 'slug.required',
    })
    .min(1, { message: 'slug.required' }),
});

export type TUpdateShortUrlForm = z.infer<typeof updateShortUrlFormSchema>;
