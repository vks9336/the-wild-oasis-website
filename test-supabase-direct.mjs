import { createClient } from '@supabase/supabase-js';

const url = 'https://ggnhqfrwcovqlprhobzj.supabase.co';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbmhxZnJ3Y292cWxwcmhvYnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDkzNTIsImV4cCI6MjA2NTEyNTM1Mn0.QNUeUcwU6MaZ4ova9npEAOFi60KHvxPyDnpci7xJeF4';

console.log('Testing Supabase connection...');
console.log('URL:', url);
console.log('Key exists:', !!key);

const supabase = createClient(url, key);

try {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name')
    .limit(1);

  if (error) {
    console.error('❌ Supabase error:', error);
  } else {
    console.log('✅ SUCCESS! Cabin:', data[0]?.name || 'No cabins found');
  }
} catch (err) {
  console.error('❌ Fetch exception:', err.message);
  console.error('Stack:', err.stack);
}
