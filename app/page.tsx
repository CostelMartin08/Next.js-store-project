'use client'

import Banner from "./components/Banner";
import Header from "./components/top&bottom/Header";
import HeaderBanner from "./components/top&bottom/headerBanner";


export default function Home() {


  return (



    <>
      <HeaderBanner />
      <Header />

      <section className="container">
        <Banner />
      </section>
    </>



  );
}
