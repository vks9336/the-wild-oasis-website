import { auth } from '../_lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Guest area',
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  // Get email and use first part as name
  const email = session.user.email || 'Guest';
  const firstName = email.split('@')[0];

  return (
    <h2 className="font-semibold text-2xl text-[#D2AF84] mb-7">
      Welcome, {firstName}!
    </h2>
  );
}
