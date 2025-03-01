import { Suspense } from 'react';
import RegisterForm from '../ui/register-form';
 
export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-25">
          <div className="w-32 text-white md:w-36">
            <h1 className='text-2xl text-white'>BillFlow</h1>
          </div>
        </div>
        <Suspense>
          <RegisterForm />
          <p className='text-center'>Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
        </Suspense>
      </div>
    </main>
  );
}