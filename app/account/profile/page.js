import { redirect } from 'next/navigation';
import { auth } from '@/app/_lib/auth';
import { getGuest, getCountries } from '@/app/_lib/data-service';
import { updateGuest } from '@/app/_lib/actions';
import UpdateProfileForm from '@/app/_components/UpdateProfileForm';

export const metadata = {
  title: 'Update profile',
};

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const [guest, countries] = await Promise.all([
    getGuest(session.user.email),
    getCountries(),
  ]);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-[#D2AF84] mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-[#B7C7D7]">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm
        guest={guest}
        countries={countries}
        action={updateGuest}
      />
    </div>
  );
}
