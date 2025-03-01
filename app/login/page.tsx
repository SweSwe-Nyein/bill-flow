import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-25">
          <div className="w-32 text-white md:w-36">
            <h1 className='text-2xl text-white'>BillFlow</h1>
          </div>
        </div>
        <Suspense>
          <LoginForm />
          <p className='text-center'>Dont&apos;t have an account? <a href="/subscriptions" className="text-blue-600">Sign up</a></p>
        </Suspense>
      </div>
    </main>
  );
}