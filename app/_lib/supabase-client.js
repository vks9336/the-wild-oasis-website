'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://ggnhqfrwcovqlprhobzj.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbmhxZnJ3Y292cWxwcmhvYnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDkzNTIsImV4cCI6MjA2NTEyNTM1Mn0.QNUeUcwU6MaZ4ova9npEAOFi60KHvxPyDnpci7xJeF4';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
