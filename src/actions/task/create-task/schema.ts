import { z } from 'zod';

export const CreateTask = z.object({
  workspaceId: z.string(),
  title: z.string(),
  options: z.array(
    z.object({
      optionId: z.string(),
    })
  ),
  description: z.string().nullable(),
  projectId: z.string(),
  parentId: z.string().nullable(),
  index: z.number().nullable(),
  due: z.date().nullable(),
  assignedTo: z.string().nullable(),
});
