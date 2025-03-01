import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
        <h1 className='text-2xl text-white'>BillFlow</h1>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/2 md:px-20">
        <div className={styles.shape} />
          <p className={`text-xl text-gray-800 md:text-2xl md:leading-normal`}>
            <strong>Welcome to BillFlow</strong> is a smart and intuitive invoice management platform. Whether you&apos;re a freelancer, small business, or enterprise, BillFlow helps you stay organized in one powerful dashboard.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-1/2 md:px-10 md:py-12">
        <Image
          src="/hero.png"
          width={1000}
          height={1000}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/hero.png"
          width={560}
          height={620}
          className="block md:hidden"
          alt="Screenshot of the dashboard project showing mobile version"
        />
        </div>
      </div>
    </main>
  );
}
