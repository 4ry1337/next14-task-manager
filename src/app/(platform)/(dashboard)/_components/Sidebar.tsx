'use client';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Plus,
  Sidebar as SidebarIcon,
} from 'lucide-react';
import Link from 'next/link';
import AddWorkspaceDialog from './AddWorkspaceDialog';
import UserButton from './UserButton';

const Sidebar = () => {
  return (
    <aside className='h-full items-center text-xs font-medium'>
      <div className='flex flex-col gap-y-3'>
        <div className='mt-3 flex justify-between'>
          <UserButton />
          <Button
            variant={'ghost'}
            size={'icon'}
          >
            <SidebarIcon />
          </Button>
        </div>
        <div className='flex flex-col'>
          <Button
            className='justify-start'
            variant={'ghost'}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Task
          </Button>
          <Button
            className='justify-start'
            variant={'ghost'}
            asChild
          >
            <Link href='/today'>
              <Calendar className='mr-2 h-4 w-4' />
              Today
            </Link>
          </Button>
        </div>
        <div>
          <AddWorkspaceDialog />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
