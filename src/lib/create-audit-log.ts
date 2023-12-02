import { ACTION, ENTITY_TYPE } from '@prisma/client';

import getCurrentUser from './getCurrentUser';
import db from './prismadb';

interface AuditLogsProps {
  workspaceId: string;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (
  props: AuditLogsProps
) => {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      throw new Error('User not found!');
    }

    const {
      workspaceId,
      entityId,
      entityType,
      entityTitle,
      action,
    } = props;

    await db.auditLog.create({
      data: {
        workspace: {
          connect: {
            id: workspaceId,
          },
        },
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.image,
        userName: user?.name,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
