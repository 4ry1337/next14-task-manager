'use server';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import gerCurrentUser from '@/lib/getCurrentUser';
import db from '@/lib/prismadb';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { CreateTask } from './schema';
import { InputType, ReturnType } from './type';

const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const user = await gerCurrentUser();

  if (!user?.id || !user?.email) {
    return {
      error: 'Unauthorized',
    };
  }

  const {
    workspaceId,
    projectId,
    parentId,
    index,
    title,
    options,
    description,
    due,
    assignedTo,
  } = data;
  let task;

  try {
    task = await db.task.create({
      data: {
        projectId,
        parentId,
        index,
        options: {
          create: options,
        },
        due,
        title,
        description,
        createdBy: user.id,
        updatedBy: user.id,
        assignedTo: assignedTo,
        assignedBy: user.id,
      },
      include: {
        options: true,
      },
    });

    await createAuditLog({
      entityId: task.id,
      entityTitle: task.title,
      entityType: ENTITY_TYPE.TASK,
      action: ACTION.CREATE,
      workspaceId: workspaceId,
    });
  } catch (error) {
    return {
      error: 'Failed to create.',
    };
  }

  return { data: task };
};

export const createCard = createSafeAction(
  CreateTask,
  handler
);
