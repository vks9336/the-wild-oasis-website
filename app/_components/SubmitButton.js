'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-[#C69963] px-8 py-4 text-[#2C3D4F] font-semibold rounded-lg hover:bg-[#B78343] transition-all disabled:cursor-not-allowed disabled:bg-[#7C6B5A] disabled:text-[#C4C4C4]"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
