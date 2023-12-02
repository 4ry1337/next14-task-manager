'use server';
import { createSafeAction } from '@/lib/create-safe-action';
import gerCurrentUser from '@/lib/getCurrentUser';
import db from '@/lib/prismadb';
import { Roles } from '@prisma/client';
import { DeleteWorkspace } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const user = await gerCurrentUser();

  if (!user?.id || !user?.email) {
    return {
      error: 'Unauthorized',
    };
  }
  const { id } = data;
  let workspace;
  try {
    const memberRole = await db.member.findUnique({
      where: {
        userId_workspaceId: {
          workspaceId: id,
          userId: user.id,
        },
      },
    });

    if (!memberRole?.role) {
      return {
        error: 'You are not member of this workspace',
      };
    }
    if (memberRole.role === Roles.owner) {
      workspace = await db.workspace.delete({
        where: {
          id: id,
        },
      });
    } else {
      return {
        error:
          "You don't have permission to delete this workspace. You have to be owner",
      };
    }
  } catch (error) {
    return {
      error: 'Failed to delete.',
    };
  }
  return { data: workspace };
};

export const deleteWorkspace = createSafeAction(
  DeleteWorkspace,
  handler
);
