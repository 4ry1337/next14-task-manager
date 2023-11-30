import { z } from 'zod';

export const RegisterSchema = z
  .object({
    variant: z.boolean(),
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 3 characters.',
      })
      .or(z.literal('')),
    email: z.string().email(),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
  })
  .superRefine((values, ctx) => {
    if (values.variant === false) {
      ctx.addIssue({
        message: 'Name is required',
        code: z.ZodIssueCode.custom,
        path: ['name'],
      });
    }
  });
