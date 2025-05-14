import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'JingleBox - AI Jingle Generator',
    template: '%s | JingleBox',
  },
  description: 'The #1 AI Jingle Generator. Create jingles, DJ drops, sweepers, and more in seconds!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </UserProvider>
  );
}
