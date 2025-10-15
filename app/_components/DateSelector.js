'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { differenceInDays, isPast, isSameDay, isWithinInterval } from 'date-fns';
import 'react-day-picker/dist/style.css';

function DateSelector({ settings, bookedDates, cabin, range, setRange }) {

  const { regularPrice, discount } = cabin;
  const numNights = range?.from && range?.to 
    ? differenceInDays(range.to, range.from) 
    : 0;

  // Calculate cabin price based on nights
  const cabinPrice = numNights * (regularPrice - discount);

  // Disable past dates and already booked dates
  const isDateDisabled = (date) => {
    // Disable past dates
    if (isPast(date) && !isSameDay(date, new Date())) return true;

    // Check if date is within any booked range
    return bookedDates.some((bookedDate) => isSameDay(date, bookedDate));
  };

  // Prevent selecting ranges that include booked dates
  const isDateInRange = (date, range) => {
    if (!range?.from || !range?.to) return false;
    return isWithinInterval(date, { start: range.from, end: range.to });
  };

  const handleSelect = (selectedRange) => {
    // Check if any booked date falls within the selected range
    if (selectedRange?.from && selectedRange?.to) {
      const hasBookedDateInRange = bookedDates.some((bookedDate) =>
        isDateInRange(bookedDate, selectedRange)
      );

      if (hasBookedDateInRange) {
        // Don't allow selection if it includes a booked date
        return;
      }
    }

    setRange(selectedRange);
  };

  const displayRange = range?.from
    ? `${range.from.toLocaleDateString()} — ${range.to?.toLocaleDateString() || '...'}`
    : 'Select check-in and check-out dates';

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center"
        mode="range"
        selected={range}
        onSelect={handleSelect}
        disabled={isDateDisabled}
        min={settings.minBookingLength}
        max={settings.maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 1}
        captionLayout="dropdown"
        numberOfMonths={2}
        styles={{
          day: {
            fontSize: '1rem',
            padding: '0.75rem',
          },
        }}
        modifiersClassNames={{
          selected: 'bg-[#C69963] text-white',
          today: 'font-bold text-[#C69963]',
          disabled: 'text-gray-400 line-through',
        }}
      />

      <div className="flex items-center justify-between px-8 bg-[#C69963] text-[#2C3D4F] h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-semibold">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-[#1E2831]">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold">${regularPrice}</span>
            )}
            <span className="text-[#1E2831]">/ night</span>
          </p>
          {numNights > 0 && (
            <>
              <p className="bg-[#C69963] px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        <p className="text-[#1E2831] text-sm">{displayRange}</p>
      </div>
    </div>
  );
}

export default DateSelector;
