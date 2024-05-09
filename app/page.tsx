'use client'

import Banner from "./components/Banner";
import Header from "./components/top&bottom/Header";
import HeaderBanner from "./components/top&bottom/headerBanner";

import BestPrice from "./components/BestPrice";
import FreshIn from "./components/FreshIn";
import { Promo } from "./components/Promo";

export default function Home() {

  return (

    <>

      <HeaderBanner />
      <div style={{backgroundColor: 'rgb(233 233 233)'}} className="sticky top-0 z-20">
        <Header />
      </div>
      <Banner />
      <BestPrice />
      <Promo />
      <FreshIn />

    </>

  );
}
