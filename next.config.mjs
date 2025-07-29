/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://ggnhqfrwcovqlprhobzj.supabase.co/storage/v1/object/public/cabin-images/**'
      ),
    ],
  },
};

export default nextConfig;
