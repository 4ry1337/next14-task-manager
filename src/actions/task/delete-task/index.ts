'use server';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import gerCurrentUser from '@/lib/getCurrentUser';
import db from '@/lib/prismadb';
import { ACTION, ENTITY_TYPE, Roles } from '@prisma/client';
import { DeleteTask } from './schema';
import { InputType, ReturnType } from './type';

const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const user = await gerCurrentUser();

  if (!user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { workspaceId, taskId } = data;
  let task;

  try {
    const memberRole = await db.member.findUnique({
      where: {
        userId_workspaceId: {
          workspaceId,
          userId: user.id,
        },
      },
    });

    if (!memberRole?.role) {
      return {
        error: 'You are not member of this workspace',
      };
    }

    if (memberRole.role === Roles.user) {
      task = await db.task.delete({
        where: {
          id: taskId,
          createdBy: user.id,
        },
      });
    } else if (
      memberRole.role === Roles.owner ||
      memberRole.role === Roles.admin
    ) {
      task = await db.task.delete({
        where: {
          id: taskId,
        },
      });
    } else {
      return {
        error:
          "You don't have permission to delete this task. You have to be admin or owner, or be creator of this task.",
      };
    }
    await createAuditLog({
      entityId: task.id,
      entityTitle: task.title,
      entityType: ENTITY_TYPE.TASK,
      action: ACTION.DELETE,
      workspaceId: workspaceId,
    });
  } catch (error) {
    return {
      error: 'Failed to delete.',
    };
  }

  return { data: task };
};

export const createCard = createSafeAction(
  DeleteTask,
  handler
);
