import db from '@/lib/prismadb';
import getSession from './getSession';

export default async function gerCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error: any) {
    return null;
  }
}
