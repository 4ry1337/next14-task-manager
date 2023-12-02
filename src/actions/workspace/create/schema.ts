import { z } from 'zod';

export const CreateWorkspace = z.object({
  title: z.string(),
});
