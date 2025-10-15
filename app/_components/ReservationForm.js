'use client';

import { useState } from 'react';
import { differenceInDays } from 'date-fns';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { createBookingAction } from '../_lib/actions';

function SubmitButton({ numNights }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-[#C69963] px-8 py-4 text-[#2C3D4F] text-lg font-semibold rounded-xl transition-all duration-300 ease-in-out hover:bg-[#B78343] hover:scale-105 hover:shadow-[0_0_20px_#C69963] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
      disabled={!numNights || pending}
    >
      {pending ? 'Reserving...' : 'Reserve now'}
    </button>
  );
}

function ReservationForm({ cabin, user, range, resetRange }) {
  const [numGuests, setNumGuests] = useState(1);
  const [observations, setObservations] = useState('');
  const router = useRouter();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  // Breakfast is optional - settings.breakfastPrice per guest per night
  const breakfastPrice = 0; // Can be added later

  const totalPrice = cabinPrice + breakfastPrice;

  async function handleSubmit(formData) {
    try {
      const bookingData = {
        startDate: range.from.toISOString(),
        endDate: range.to.toISOString(),
        numNights,
        numGuests,
        cabinPrice,
        extrasPrice: breakfastPrice,
        totalPrice,
        observations,
        cabinId: id,
        status: 'unconfirmed',
        hasBreakfast: false,
        isPaid: false,
      };

      await createBookingAction(bookingData);

      toast.success(`🎉 Cabin ${cabin.name} reserved successfully!`);
      resetRange();
      setNumGuests(1);
      setObservations('');

      // Redirect to reservations page after short delay
      setTimeout(() => {
        router.push('/account/reservations');
      }, 1500);
    } catch (error) {
      toast.error('Failed to create reservation. Please try again.');
      console.error('Booking error:', error);
    }
  }

  return (
    <div className="scale-100">
      <div className="bg-[#1E2831] text-[#D4DEE7] px-16 py-8 flex justify-between items-center rounded-t-xl">
        <p className="text-xl">Logged in as</p>

        <div className="flex gap-4 items-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#C69963] flex items-center justify-center">
            <span className="text-[#2C3D4F] font-bold text-lg">
              {user.email?.[0]?.toUpperCase() || 'G'}
            </span>
          </div>
          <p className="text-lg">{user.email?.split('@')[0] || 'Guest'}</p>
        </div>
      </div>

      <form
        action={handleSubmit}
        className="bg-[#2C3D4F] py-10 px-16 text-lg flex gap-5 flex-col rounded-b-xl"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-[#D4DEE7] font-medium">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            value={numGuests}
            onChange={(e) => setNumGuests(Number(e.target.value))}
            className="px-5 py-3 bg-[#1E2831] text-[#D4DEE7] w-full shadow-sm rounded-md border border-[#4C6B8A] focus:outline-none focus:ring-2 focus:ring-[#C69963]"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="text-[#D4DEE7] font-medium">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="px-5 py-3 bg-[#1E2831] text-[#D4DEE7] w-full shadow-sm rounded-md border border-[#4C6B8A] focus:outline-none focus:ring-2 focus:ring-[#C69963]"
            placeholder="Any pets, allergies, special requirements, etc.?"
            rows={4}
          />
        </div>

        <div className="flex justify-between items-center">
          {!numNights ? (
            <p className="text-[#D4DEE7] text-base">
              Please select dates to see total price
            </p>
          ) : (
            <div className="flex gap-2 items-baseline">
              <span className="text-3xl font-semibold text-[#C69963]">
                ${totalPrice}
              </span>
              <span className="text-[#B7C7D7]">
                for {numNights} {numNights === 1 ? 'night' : 'nights'}
              </span>
            </div>
          )}

          <SubmitButton numNights={numNights} />
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
