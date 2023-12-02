import { createWorkspace } from '@/actions/workspace/create';
import { CreateWorkspace } from '@/actions/workspace/create/schema';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useAction } from '@/hooks/useAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const AddWorkspaceDialog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateWorkspace>>({
    resolver: zodResolver(CreateWorkspace),
    defaultValues: {
      title: '',
    },
  });

  const { execute } = useAction(createWorkspace, {
    onSuccess(data) {
      toast({
        title: data.title,
        description: 'Successully created a new workspace',
      });
    },
    onError(error) {
      toast({
        variant: 'destructive',
        description: error,
      });
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspace>
  > = (data) => {
    console.log('hello');
    setIsLoading(true);
    execute(data).finally(() => setIsLoading(false));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Briefcase className='mr-2 h-4 w-4' />
          Add a workspace.
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add a new workspace.</DialogTitle>
          <DialogDescription>
            Start managing workspace
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id='workspace'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Home 🏠'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type='submit'
            form='workspace'
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkspaceDialog;
