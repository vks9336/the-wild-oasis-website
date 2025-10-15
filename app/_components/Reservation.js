'use client';

import { useState } from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import LoginMessage from './LoginMessage';

function Reservation({ cabin, settings, bookedDates, user }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const resetRange = () => setRange({ from: undefined, to: undefined });

  return (
    <div className="grid grid-cols-2 border border-[#4C6B8A] min-h-[400px] rounded-xl overflow-hidden">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
        range={range}
        setRange={setRange}
      />

      {user ? (
        <ReservationForm
          cabin={cabin}
          user={user}
          range={range}
          resetRange={resetRange}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;

