import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/app/_lib/auth';
import { getBookings } from '@/app/_lib/data-service';
import ReservationList from '@/app/_components/ReservationList';

export const metadata = {
  title: 'Reservations',
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-[#D2AF84] mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg text-[#B7C7D7]">
          You have no reservations yet. Check out our{' '}
          <Link className="underline text-[#C69963]" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
