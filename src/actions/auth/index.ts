'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import db from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import { SignupSchema } from './schema';
import { InputType, ReturnType } from './type';

const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const { name, email, password } = data;
  let user;
  try {
    const hashedpassword = await bcrypt.hash(password, 12);
    user = await db.user.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return {
      error: 'Internal Error',
    };
  }

  //revalidatePath(`/`);
  return { data: user };
};

export const register = createSafeAction(
  SignupSchema,
  handler
);
