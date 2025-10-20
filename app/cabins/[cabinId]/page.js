import Image from 'next/image';
import {
  getCabin,
  getCabins,
  getBookedDatesByCabinId,
  getSettings,
} from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';
import Reservation from '@/app/_components/Reservation';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8 page-enter">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-[#4C6B8A] py-3 px-10 mb-24 rounded-xl card-animate shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-[#C69963]">
        <div className="relative scale-[1.15] -translate-x-3 overflow-hidden rounded-xl group">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-[#C69963] font-black text-7xl mb-5 translate-x-[-254px] bg-[#1E2831] p-6 pb-1 w-[150%] rounded-tl-xl rounded-br-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:translate-x-[-250px]">
            Cabin {name}
          </h3>

          <p className="text-lg text-[#B7C7D7] mb-10 leading-relaxed transition-colors duration-300 hover:text-[#D4DEE7]">
            {description}
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center group transition-all duration-300 hover:translate-x-2">
              <UsersIcon className="h-5 w-5 text-[#C69963] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
              <span className="text-lg text-[#D4DEE7]">
                For up to{' '}
                <span className="font-bold text-[#C69963]">{maxCapacity}</span>{' '}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center group transition-all duration-300 hover:translate-x-2">
              <MapPinIcon className="h-5 w-5 text-[#C69963] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
              <span className="text-lg text-[#D4DEE7]">
                Located in the heart of the{' '}
                <span className="font-bold text-[#C69963]">Dolomites</span>{' '}
                (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center group transition-all duration-300 hover:translate-x-2">
              <EyeSlashIcon className="h-5 w-5 text-[#C69963] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
              <span className="text-lg text-[#D4DEE7]">
                Privacy <span className="font-bold text-[#C69963]">100%</span>{' '}
                guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="animate-[fadeIn_0.8s_ease-out_0.3s_both]">
        <h2 className="text-5xl font-semibold text-center mb-10 text-[#C69963] transition-all duration-500 hover:scale-105 hover:text-[#D2AF84]">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Reservation
          cabin={cabin}
          settings={settings}
          bookedDates={bookedDates}
          user={session?.user}
        />
      </div>
    </div>
  );
}
