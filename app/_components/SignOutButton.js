import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

function SignOutButton() {
  return (
    <button className="py-3 px-5 hover:bg-[#1B2631] hover:text-[#D4DEE7] transition-colors flex items-center gap-4 font-semibold text-[#B7C7D7] w-full">
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-[#4C6B8A]" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
