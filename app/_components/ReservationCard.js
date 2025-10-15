import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="flex border border-[#4C6B8A] rounded-lg overflow-hidden">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#C69963]">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-[#6b7280] text-[#1e2831] h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-[#16a34a] text-[#f0fdf4] h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-[#B7C7D7]">
          {format(new Date(startDate), 'MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'MMM dd yyyy')}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-[#C69963]">${totalPrice}</p>
          <p className="text-[#B7C7D7]">&bull;</p>
          <p className="text-lg text-[#B7C7D7]">
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className="ml-auto text-sm text-[#99B0C7]">
            Booked {format(new Date(created_at), 'MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-[#4C6B8A] w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-[#D4DEE7] border-b border-[#4C6B8A] flex-grow px-3 hover:bg-[#C69963] transition-colors hover:text-[#1E2831] justify-center"
            >
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
