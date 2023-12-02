'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  ActivityIcon,
  ChevronDown,
  LogOut,
  Settings,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useMemo } from 'react';

const UserButton = () => {
  const session = useSession();

  const { image, name, initials, email } = useMemo(() => {
    const image = session.data?.user?.image;
    const name = session.data?.user?.name;
    const initials = name
      ?.split(' ')
      .map((n) => n[0])
      .join();
    const email = session.data?.user?.email;
    return { image, name, initials, email };
  }, [
    session.data?.user?.email,
    session.data?.user?.name,
    session.data?.user?.image,
  ]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          className='flex gap-x-2'
        >
          <Avatar className='h-8 w-8'>
            {image && (
              <AvatarImage
                src={image}
                alt='@avater'
              />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>{name}</div>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        //className='w-60'
        align={'start'}
      >
        <div className='flex flex-col gap-y-2'>
          <Button
            variant={'secondary'}
            className='justify-start'
            asChild
          >
            <Link href={'/activity'}>
              <ActivityIcon className='mr-2 h-4 w-4' />
              Activity Log
            </Link>
          </Button>
          <Button
            variant={'secondary'}
            className='justify-start'
            asChild
          >
            <Link href={'/settings'}>
              <Settings className='mr-2 h-4 w-4' />
              Setings
            </Link>
          </Button>
          <Separator />
          <Button
            variant={'destructive'}
            className='justify-start'
            onClick={() => signOut()}
          >
            <LogOut className='mr-2 h-4 w-4' />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
