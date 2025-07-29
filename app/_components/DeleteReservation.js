import { TrashIcon } from '@heroicons/react/24/solid';

function DeleteReservation({ bookingId }) {
  return (
    <button className="group flex items-center gap-2 uppercase text-xs font-bold text-[#99B0C7] flex-grow px-3 hover:bg-[#B78343] transition-colors hover:text-[#1B2631]">
      <TrashIcon className="h-5 w-5 text-[#B78343] group-hover:text-[#1B2631] transition-colors" />
      <span className="mt-1">Delete</span>
    </button>
  );
}

export default DeleteReservation;
