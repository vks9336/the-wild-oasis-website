import Image from 'next/image';
import Link from 'next/link';
import bg from '../public/bg.png';

export default function Page() {
  return (
    <main className="mt-24 relative min-h-screen">
      <Image
        className="object-cover object-top"
        src={bg}
        fill
        quality={80}
        placeholder="blur"
        alt="Mountains and forests with two cabins"
        priority
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-[#E1E8EF] mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-[#C69963] px-8 py-6 text-[#2C3D4F] text-lg font-semibold rounded-xl transition-all duration-300 ease-in-out hover:bg-[#B78343] hover:scale-110 hover:shadow-[0_0_25px_#C69963]"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
