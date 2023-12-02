import db from '@/lib/prismadb';
import { z } from 'zod';

export const DeleteTask = z.object({
  workspaceId: z.string(),
  taskId: z.string().refine(async (value) => {
    const task = await db.task.findUnique({
      where: {
        id: value,
      },
    });
    return !!task;
  }, 'Task with this ID does not exist'),
});
