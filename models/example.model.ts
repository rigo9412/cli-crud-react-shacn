import { z } from 'zod';

export const ExampleModel = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Example = z.infer<typeof ExampleModel>;