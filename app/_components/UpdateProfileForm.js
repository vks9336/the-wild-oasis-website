'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-[#C69963] px-8 py-6 text-[#2C3D4F] text-lg font-semibold rounded-xl transition-all duration-300 ease-in-out hover:bg-[#B78343] hover:scale-110 hover:shadow-[0_0_25px_#C69963] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
    >
      {pending ? 'Updating...' : 'Update profile'}
    </button>
  );
}

export default function UpdateProfileForm({ guest, countries, action }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest || {};
  const [success, setSuccess] = useState(false);

  const flag =
    countries.find((country) => country.name === nationality)?.flag ?? '';

  async function handleAction(formData) {
    setSuccess(false);
    try {
      await action(formData);
      setSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      // Error will be caught by error boundary
      throw error;
    }
  }

  return (
    <form
      action={handleAction}
      className="bg-[#1B2631] py-8 px-12 text-lg flex gap-6 flex-col rounded-xl"
    >
      {success && (
        <div className="bg-green-600 text-white px-6 py-4 rounded-lg text-center font-semibold animate-pulse">
          ✓ Profile updated successfully!
        </div>
      )}

      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {(countryFlag || flag) && (
            <span className="text-2xl">{countryFlag || flag}</span>
          )}
        </div>

        <select
          name="nationality"
          id="nationality"
          defaultValue={`${nationality}%${flag}`}
          className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm"
        >
          <option value="">Select country...</option>
          {countries.map((c) => (
            <option key={c.name} value={`${c.name}%${c.flag}`}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm"
          placeholder="Optional (6-12 alphanumeric)"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton />
      </div>
    </form>
  );
}
