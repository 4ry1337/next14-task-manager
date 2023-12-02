import { Workspace } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';

import { DeleteWorkspace } from './schema';

export type InputType = z.infer<typeof DeleteWorkspace>;
export type ReturnType = ActionState<InputType, Workspace>;
