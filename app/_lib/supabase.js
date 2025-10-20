import { createClient } from '@supabase/supabase-js';
import { fetch } from 'undici';

// Ensure environment variables are set
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY environment variable');
}

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
