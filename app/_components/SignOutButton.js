'use client';

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { supabaseClient } from '../_lib/supabase-client';
import { useRouter } from 'next/navigation';

function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await supabaseClient.auth.signOut();

    // Clear cookies
    document.cookie =
      'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie =
      'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    router.push('/');
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="py-3 px-5 hover:bg-[#1B2631] hover:text-[#D4DEE7] transition-colors flex items-center gap-4 font-semibold text-[#B7C7D7] w-full"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-[#4C6B8A]" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
