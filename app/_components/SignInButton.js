'use client';

import { useState } from 'react';
import { supabaseClient } from '../_lib/supabase-client';
import { useRouter } from 'next/navigation';

function SignInButton() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
          },
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Set cookies for server-side auth
        if (data.session) {
          document.cookie = `sb-access-token=${
            data.session.access_token
          }; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
          document.cookie = `sb-refresh-token=${
            data.session.refresh_token
          }; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days

          // Small delay to ensure cookies are set
          await new Promise((resolve) => setTimeout(resolve, 100));

          router.push('/account');
          router.refresh();
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-center">
        {isSignUp ? 'Create Account' : 'Sign in to your account'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#2C3D4F] border border-[#4C6B8A] rounded-md text-[#D4DEE7] focus:outline-none focus:ring-2 focus:ring-[#C69963]"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 bg-[#2C3D4F] border border-[#4C6B8A] rounded-md text-[#D4DEE7] focus:outline-none focus:ring-2 focus:ring-[#C69963]"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#C69963] px-8 py-4 text-[#2C3D4F] text-lg font-semibold rounded-xl transition-all duration-300 ease-in-out hover:bg-[#B78343] hover:scale-105 hover:shadow-[0_0_20px_#C69963] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <button
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError('');
        }}
        className="text-[#C69963] hover:underline text-sm"
      >
        {isSignUp
          ? 'Already have an account? Sign in'
          : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}

export default SignInButton;
