
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false
//import { Lato } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { AppWrapper } from './context';
import "./globals.css";
import Head from 'next/head';


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
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className={`bg-slate-50`}>
          
          <AppWrapper>

            {children}

          </AppWrapper>
        </body>
      </html>

    </SessionProvider>
  );
};

