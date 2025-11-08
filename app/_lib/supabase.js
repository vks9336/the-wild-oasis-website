import { createClient } from '@supabase/supabase-js';
import { fetch } from 'undici';

// Supabase configuration with fallback values
const supabaseUrl =
  process.env.SUPABASE_URL || 'https://ggnhqfrwcovqlprhobzj.supabase.co';
const supabaseKey =
  process.env.SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbmhxZnJ3Y292cWxwcmhvYnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDkzNTIsImV4cCI6MjA2NTEyNTM1Mn0.QNUeUcwU6MaZ4ova9npEAOFi60KHvxPyDnpci7xJeF4';

// Custom fetch with longer timeout and connection settings
const customFetch = (url, options = {}) => {
  return fetch(url, {
    ...options,
    keepalive: true,
    // Increase timeouts for slow network
    signal: options.signal || AbortSignal.timeout(60000), // 60 second timeout
  });
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Server-side, we don't need session persistence
  },
  global: {
    fetch: customFetch,
  },
});
