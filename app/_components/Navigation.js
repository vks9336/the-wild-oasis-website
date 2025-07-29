import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-[#D2AF84] transition-colors hover:scale-3d"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-[#D2AF84] transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-[#D2AF84] transition-colors"
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
