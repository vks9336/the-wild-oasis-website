import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import Image from 'next/image';
import DeleteReservation from './DeleteReservation';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex border border-[#2C3D4F]">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover border-r border-[#2C3D4F]"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-[#99B0C7]">
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-[#D2AF84]">${totalPrice}</p>
          <p className="text-[#99B0C7]">&bull;</p>
          <p className="text-lg text-[#99B0C7]">
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className="ml-auto text-sm text-[#7C99B6]">
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-[#2C3D4F] w-[100px]">
        <a
          href={`/account/reservations/edit/${id}`}
          className="group flex items-center gap-2 uppercase text-xs font-bold text-[#99B0C7] border-b border-[#1B2631] flex-grow px-3 hover:bg-[#6C4D28] transition-colors hover:text-[#1B2631]"
        >
          <PencilSquareIcon className="h-5 w-5 text-[#4C6B8A] group-hover:text-[#2C3D4F] transition-colors" />
          <span className="mt-1">Edit</span>
        </a>
        <DeleteReservation bookingId={id} />
      </div>
    </div>
  );
}

export default ReservationCard;
