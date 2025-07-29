import ReservationCard from '@/app/_components/ReservationCard';

export const metadata = {
  title: 'Reservations',
};

export default function Reservations() {
  // CHANGE
  const bookings = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-[#D2AF84] mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg text-[#D2AF84]">
          You have no reservations yet. Check out our{' '}
          <a className="underline text-[#C69963]" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
