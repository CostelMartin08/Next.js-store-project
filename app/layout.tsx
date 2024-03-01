
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import Head from 'next/head';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StoreApp',
  description: 'Project'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode

}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&display=swap" rel="stylesheet" />
        </Head>
        <body className={inter.className}>

          {children}

        </body>
      </html>
    </SessionProvider>
  );
};

