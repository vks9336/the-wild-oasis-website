import Image from 'next/image';
import { getCabin, getCabins, getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';
import Reservation from '@/app/_components/Reservation';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
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
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-[#4C6B8A] py-3 px-10 mb-24 rounded-xl">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div>
          <h3 className="text-[#C69963] font-black text-7xl mb-5 translate-x-[-254px] bg-[#1E2831] p-6 pb-1 w-[150%] rounded-tl-xl rounded-br-xl">
            Cabin {name}
          </h3>

          <p className="text-lg text-[#B7C7D7] mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-[#C69963]" />
              <span className="text-lg text-[#D4DEE7]">
                For up to <span className="font-bold">{maxCapacity}</span> guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-[#C69963]" />
              <span className="text-lg text-[#D4DEE7]">
                Located in the heart of the{' '}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-[#C69963]" />
              <span className="text-lg text-[#D4DEE7]">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-[#C69963]">
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
