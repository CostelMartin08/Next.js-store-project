
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false
import { Lato } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

import "./globals.css";

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900']
})

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
        <body className={`bg-slate-50  ${lato.className}`}>
          {children}

        </body>
      </html>
    </SessionProvider>
  );
};

