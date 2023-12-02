import Sidebar from './_components/Sidebar';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='flex h-full w-full'>
      <div className='hidden w-64 shrink-0 p-2 md:block'>
        <Sidebar />
      </div>
      <div className='mx-auto max-w-6xl grow px-4 2xl:max-w-screen-xl'>
        <main className='pt-8'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
