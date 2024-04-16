'use client'

import Banner from "./components/Banner";
import Header from "./components/top&bottom/Header";
import HeaderBanner from "./components/top&bottom/headerBanner";

import BestPrice from "./components/BestPrice";

export default function Home() {

  return (

    <>

      <HeaderBanner />
      <Header />
      <Banner />
      <BestPrice />

    </>

  );
}
