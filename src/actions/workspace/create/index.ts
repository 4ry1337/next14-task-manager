'use server';
import { createSafeAction } from '@/lib/create-safe-action';
import gerCurrentUser from '@/lib/getCurrentUser';
import db from '@/lib/prismadb';
import { Roles } from '@prisma/client';
import { CreateWorkspace } from './schema';
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
  const { title } = data;
  let workspace;
  try {
    workspace = await db.workspace.create({
      data: {
        title,
        members: {
          create: {
            userId: user.id,
            role: Roles.owner,
            assignedBy: user.id,
          },
        },
        projects: {
          create: {
            title: 'Set up your worksapce',
            createdBy: user.id,
            updatedBy: user.id,
            parameters: {
              create: {
                title: 'Status',
                index: 0,
                options: {
                  createMany: {
                    data: [
                      {
                        label: 'To Do',
                        createdBy: user.id,
                        updatedBy: user.id,
                      },
                      {
                        label: 'Doing',
                        createdBy: user.id,
                        updatedBy: user.id,
                      },
                      {
                        label: 'Done',
                        createdBy: user.id,
                        updatedBy: user.id,
                      },
                    ],
                  },
                },
                createdBy: user.id,
                updatedBy: user.id,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error, 'CREATE_WORKSPACE_ERROR');
    return {
      error: 'Failed to create.',
    };
  }
  return { data: workspace };
};

export const createWorkspace = createSafeAction(
  CreateWorkspace,
  handler
);
