import { cookies } from 'next/headers';
import { supabase } from './supabase';

export async function getUser() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('sb-access-token');
  const refresh_token = cookieStore.get('sb-refresh-token');

  if (!access_token || !refresh_token) {
    return { user: null };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(access_token.value);

  if (error || !user) {
    return { user: null };
  }

  // Get or create guest record for this user
  const { data: guestData } = await supabase
    .from('guests')
    .select('*')
    .eq('email', user.email)
    .single();

  // If guest doesn't exist, create one
  if (!guestData) {
    const { data: newGuest, error: createError } = await supabase
      .from('guests')
      .insert([
        {
          fullName: user.email.split('@')[0], // Use email username as name
          email: user.email,
          nationality: '',
          countryFlag: '🏳️',
          nationalID: '',
        },
      ])
      .select()
      .single();

    if (!createError && newGuest) {
      return { user: { ...user, guestId: newGuest.id } };
    }
  }

  return { user: { ...user, guestId: guestData?.id } };
}

export const auth = getUser;
