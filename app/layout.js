import './_styles/globals.css';
import Header from './_components/Header';
import Logo from './_components/Logo';
import Navigation from './_components/Navigation';
import { Josefin_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const font = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  // title: 'The Wild Oasis Website', this is v-1
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Customer facing website for the the wild oasis hotel management application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased bg-[#141C24] text-[#D4DEE7] min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className=" flex-1 px-8 py-12 grid">
          <main className=" mx-auto max-w-7xl w-full">{children}</main>
        </div>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: '#16a34a',
                color: '#f0fdf4',
                fontSize: '16px',
                fontWeight: '600',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#dc2626',
                color: '#fee2e2',
                fontSize: '16px',
                fontWeight: '600',
              },
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: '#1e2831',
              color: '#d4dee7',
            },
          }}
        />
      </body>
    </html>
  );
}
