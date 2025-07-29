import Link from 'next/link';

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-[#C69963] text-p[#2C3D4F] px-6 py-3 text-lg rounded-3xl"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
