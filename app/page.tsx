
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Banner from "./components/Banner";
import ProductGrid from "./components/productGrid";
config.autoAddCss = false

import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Home() {


  const session = await getServerSession(options)

  return (
    <>

      {session ? (
        <>
          <Banner />
          <ProductGrid />
        </>
      ) : (
        <h2>Conecteaza-te!</h2>
      )}
    </>
  );
}
