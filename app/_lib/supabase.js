import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are set
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY environment variable');
}

// Custom fetch configuration to handle SSL properly in Node.js
const customFetch = (url, options = {}) => {
  return fetch(url, {
    ...options,
    // Disable SSL verification for development (use only in dev!)
    // In production, remove this or configure proper SSL certs
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
