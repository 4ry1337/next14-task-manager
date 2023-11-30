import { User } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';

import { RegisterSchema } from './schema';

export type InputType = z.infer<typeof RegisterSchema>;
export type ReturnType = ActionState<InputType, User>;
