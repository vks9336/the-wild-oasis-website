// Server Actions for the guest portal
'use server';

import { revalidatePath } from 'next/cache';
import { auth } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  if (!session.user.guestId) {
    throw new Error('Guest ID not found. Please log out and log back in.');
  }

  const nationalID = formData.get('nationalID');
  const nationality = formData.get('nationality');
  const countryFlag = formData.get('countryFlag');

  // Validate nationalID only if it's provided
  if (
    nationalID &&
    nationalID.trim() !== '' &&
    !/^[a-zA-Z0-9]{6,12}$/.test(nationalID)
  ) {
    throw new Error('National ID must be 6-12 alphanumeric characters');
  }

  const updateData = { nationality, countryFlag, nationalID: nationalID || '' };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error('Supabase update error:', error);
    throw new Error(`Guest could not be updated: ${error.message}`);
  }

  revalidatePath('/account/profile');

  // Return success (will show in form state)
  return { success: true };
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function createReview(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const rating = Number(formData.get('rating'));
  const title = formData.get('title');
  const comment = formData.get('comment');
  const cabinId = Number(formData.get('cabinId'));
  const bookingId = Number(formData.get('bookingId'));

  // Validation
  if (!rating || rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  if (!comment || comment.length < 10) {
    throw new Error('Comment must be at least 10 characters');
  }

  const reviewData = {
    rating,
    title,
    comment,
    cabin_id: cabinId,
    guest_id: session.user.guestId,
    booking_id: bookingId,
    status: 'pending',
    is_verified: true, // Verified because it's from an actual booking
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('reviews').insert([reviewData]);

  if (error) {
    console.error('Review error:', error);
    throw new Error('Review could not be created');
  }

  revalidatePath('/account/reservations');
  revalidatePath(`/cabins/${cabinId}`);
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) {
    console.error('Booking error:', error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
}

export async function createBookingAction(bookingData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    startDate: bookingData.startDate,
    endDate: bookingData.endDate,
    numNights: bookingData.numNights,
    numGuests: bookingData.numGuests,
    cabinPrice: bookingData.cabinPrice,
    extrasPrice: bookingData.extrasPrice || 0,
    totalPrice: bookingData.totalPrice,
    status: bookingData.status || 'unconfirmed',
    hasBreakfast: bookingData.hasBreakfast || false,
    isPaid: bookingData.isPaid || false,
    observations: bookingData.observations?.slice(0, 1000) || '',
    cabinId: bookingData.cabinId,
    guestId: session.user.guestId,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) {
    console.error('Booking error:', error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get('bookingId'));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to update this booking');

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error('Booking could not be updated');

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');
}
