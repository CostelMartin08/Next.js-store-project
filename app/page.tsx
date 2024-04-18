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
      <Header />
      <Banner />
      <BestPrice />
      <Promo/>
      <FreshIn />
      
    </>

  );
}
