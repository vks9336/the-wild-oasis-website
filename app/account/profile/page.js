import SelectCountry from '@/app/_components/SelectCountry';
import Image from 'next/image';

export const metadata = {
  title: 'Update profile',
};

export default function Profile() {
  // CHANGE
  const countryFlag = '/logo.png';
  const nationality = 'portugal';

  return (
    <div>
      <h2 className="font-semibold text-2xl text-[#D2AF84] mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-[#B7C7D7]">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <form className="bg-[#1B2631] py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <Image
              src={countryFlag}
              width={20}
              height={20}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>

          <SelectCountry
            name="nationality"
            id="nationality"
            className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm"
            defaultCountry={nationality}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            className="px-5 py-3 bg-[#B7C7D7] text-[#2C3D4F] w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <button className="bg-[#C69963] px-8 py-6 text-[#2C3D4F] text-lg font-semibold rounded-xl transition-all duration-300 ease-in-out hover:bg-[#B78343]  hover:scale-110 hover:shadow-[0_0_25px_#C69963]">
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
}
