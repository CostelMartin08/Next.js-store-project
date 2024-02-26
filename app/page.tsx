'use client'

import Banner from "./components/Banner";
import ProductGrid from "./components/product/productGrid";
import Header from './components/top&bottom/Header';

export default function Home() {


  return (


     
        <>
          <Header  pagetype={"Client"} />
          <Banner />
          <ProductGrid />
        </>
     

 
  );
}
