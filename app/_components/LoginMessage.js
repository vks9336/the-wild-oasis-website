import Link from 'next/link';

function LoginMessage() {
  return (
    <div className="bg-[#1E2831] text-center flex flex-col gap-6 items-center justify-center rounded-r-xl">
      <p className="text-xl text-[#D4DEE7]">
        Please{' '}
        <Link href="/login" className="text-[#C69963] font-semibold underline hover:text-[#B78343] transition-colors">
          login
        </Link>{' '}
        to reserve this cabin
      </p>
      <p className="text-[#B7C7D7]">Sign in with your Google account to continue</p>
    </div>
  );
}

export default LoginMessage;

