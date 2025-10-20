import { UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

function CabinCard({ cabin }) {
  // console.log(cabin);
  const {
    id,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image: cabinImage,
  } = cabin;
  // console.log(cabin)

  return (
    <div className="flex border-[#2C3D4F] border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-[#C69963] hover:-translate-y-2 card-animate group">
      <div className="flex-1 relative overflow-hidden">
        <Image
          src={cabinImage}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-[#2C3D4F] transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-[#141C24] transition-colors duration-300">
          <h3 className="text-[#C69963] font-semibold text-2xl mb-3 transition-all duration-300 group-hover:text-[#D2AF84] group-hover:scale-105 inline-block">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2 group/icon transition-all duration-300 hover:translate-x-2">
            <UsersIcon className="h-5 w-5 text-[#4C6B8A] transition-all duration-300 group-hover/icon:text-[#C69963] group-hover/icon:scale-125" />
            <p className="text-lg text-[#B7C7D7] transition-colors duration-300">
              For up to{' '}
              <span className="font-bold text-[#C69963]">{maxCapacity}</span>{' '}
              guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350] text-[#C69963] transition-all duration-300 hover:scale-110 inline-block">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-[#4C6B8A] transition-opacity duration-300">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350] text-[#C69963] transition-all duration-300 hover:scale-110 inline-block">
                ${regularPrice}
              </span>
            )}
            <span className="text-[#B7C7D7]">/ night</span>
          </p>
        </div>

        <div className="bg-[#141C24] border-t border-t-[#1B2631] text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-[#1B2631] py-4 px-6 inline-block hover:bg-[#C69963] transition-all duration-300 hover:text-[#1E2831] font-semibold hover:shadow-lg hover:px-8"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
