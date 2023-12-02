import AuthForm from './components/AuthForm';

const AuthPage = () => {
  return (
    <div className='flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
