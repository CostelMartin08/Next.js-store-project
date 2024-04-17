
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false
import { Lato } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { AppWrapper } from './context';
import "./globals.css";
import Head from 'next/head';
import Link from 'next/link';
import Footer from './components/top&bottom/Footer';


const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
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
      
        <body  className={lato.className} >
          
          <AppWrapper>

            {children}
            <Footer/>

          </AppWrapper>
        </body>
      </html>

    </SessionProvider>
  );
};

