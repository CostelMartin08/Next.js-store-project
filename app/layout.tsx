
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false
import { Lato } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { AppWrapper } from './context';
import "./globals.css";

import Footer from './components/top&bottom/Footer';
import Head from 'next/head';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'GadgetGrid',
  description: 'Online Store',
  icons: {
    icon: '/favicon/favicon-32x32.png',
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
  }
}

const GA_TRACKING_ID = 'G-J8JSQ88T1J';

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
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </Head>
        <body className={lato.className} >

          <AppWrapper>

            {children}
            <Footer />

          </AppWrapper>
        </body>
      </html>

    </SessionProvider>
  );
};

