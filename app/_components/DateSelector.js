'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import 'react-day-picker/dist/style.css';

function DateSelector({ settings, bookedDates, cabin, range, setRange }) {
  const { regularPrice, discount } = cabin;
  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;

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
    ? `${range.from.toLocaleDateString()} — ${
        range.to?.toLocaleDateString() || '...'
      }`
    : 'Select check-in and check-out dates';

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-gradient-to-br from-[#1E2831] to-[#141C24] rounded-2xl p-6 shadow-2xl border border-[#2C3D4F]">
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
          showOutsideDays={false}
        />
      </div>

      <div className="flex items-center justify-between px-8 bg-gradient-to-r from-[#C69963] via-[#D2AF84] to-[#C69963] text-[#1E2831] min-h-[88px] rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(198,153,99,0.4)] hover:scale-[1.02] border-2 border-[#D2AF84]">
        <div className="flex items-baseline gap-8">
          <div className="flex gap-3 items-baseline transition-all duration-300">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-bold transition-all duration-300 hover:scale-110 inline-block text-[#1E2831] drop-shadow-lg">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-[#4B351B] transition-opacity duration-300 text-xl">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold transition-all duration-300 hover:scale-110 inline-block text-[#1E2831] drop-shadow-lg">
                ${regularPrice}
              </span>
            )}
            <span className="text-[#2C3D4F] font-semibold text-lg">
              / night
            </span>
          </div>
          {numNights > 0 && (
            <div className="flex items-baseline gap-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center gap-2 bg-[#1E2831] px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="text-[#C69963] text-2xl font-bold">
                  &times;
                </span>
                <span className="text-[#C69963] text-2xl font-bold">
                  {numNights}
                </span>
                <span className="text-[#B7C7D7] text-sm ml-1">
                  {numNights === 1 ? 'night' : 'nights'}
                </span>
              </div>
              <div className="transition-all duration-300 hover:scale-105 bg-[#1E2831] px-5 py-3 rounded-xl shadow-lg">
                <span className="text-[#B7C7D7] text-sm font-bold uppercase tracking-wide block">
                  Total Price
                </span>
                <span className="text-[#C69963] text-3xl font-bold">
                  ${cabinPrice}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-[#2C3D4F] text-xs font-semibold uppercase tracking-wide mb-1">
            Selected Dates
          </p>
          <p className="text-[#1E2831] text-base font-bold transition-all duration-300">
            {displayRange}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DateSelector;
