import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  return (
    <nav className="border-r border-[#1B2631]">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              className={`py-3 px-5 hover:bg-[#1B2631] hover:text-[#D4DEE7] transition-colors flex items-center gap-4 font-semibold text-[#B7C7D7]`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
