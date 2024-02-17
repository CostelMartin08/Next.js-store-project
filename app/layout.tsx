
import {Inter} from 'next/font/google';
import AuthProvider from "./context/AuthProvider";
import Head from "next/head";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'StoreApp',
  description: 'Project'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (

    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>

  );
};

