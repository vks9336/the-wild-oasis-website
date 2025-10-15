'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import { deleteReservation } from '../_lib/actions';

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm('Are you sure you want to delete this reservation?'))
      startTransition(() => deleteReservation(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-[#D4DEE7] flex-grow px-3 hover:bg-[#DC2626] transition-colors hover:text-[#FEE2E2] justify-center"
      disabled={isPending}
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-[#4C6B8A] group-hover:text-[#FEE2E2] transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">Deleting...</span>
      )}
    </button>
  );
}

export default DeleteReservation;
