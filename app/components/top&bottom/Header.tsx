'use client'
import React, { useEffect, useState } from "react";
import '../components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from "@/hooks/use-current-user";
import ToggleSwitch from "./toggleSwitch";
import Link from "next/link";

import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { CartProduct } from "@/app/(products)/products/[name]/page";





export default function Header() {


  const user = useCurrentUser();
  //actulizeaza in timp real nr produe din cos
  const [data, setData] = useState<CartProduct[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
      setData(cart);
    }
  }, []);


  return (
    <>

      <div className="bg-gray-700 text-center py-4 px-2 text-[12px] md:text-[20px] text-white">

        <h4>Informează clienții de posibile reduceri sau sesizează probleme</h4>

      </div>

      <header className='container mx-auto lg:py-8'>

        <div className="flex w-full p-5 p-8">

          <div className="w-1/4 lg:hidden flex justify-start ">

            <ToggleSwitch />


          </div>

          <div className="w-2/4 lg:w-1/4 flex  items-center justify-center lg:justify-start ">

            <Link href="/">
              <h1 className="sm:text-[23px] md:text-[25px] font-bold">GandgetGrid</h1>
            </Link>

          </div>

          <ul className="w-2/4 hidden lg:flex space-x-4 justify-center items-center  lg:text-[18px] xl:text-[20px] clr-gray">
            <Link href='/collections/category?category=laptops'>Laptop</Link>
            <Link href='/collections/category?category=tablets'>Tablet</Link>
            <Link href='/collections/category?category=smartphones'>Smartphone</Link>
            <Link href='/collections/category?category=tv'>TV</Link>
            <Link href='/collections/category?category=contact'>Contact</Link>
            <Link href='/collections/category?category=story'>Us Story</Link>
          </ul>

          <div className="flex w-1/4 space-x-4  justify-end items-center">

            <div className="relative">

              <div
                style={{ top: '-10px', right: '-10px' }}
                className="absolute w-5 h-5 text-center flex justify-center rounded-xl bg-red-500">
                <p
                  className="m-0 text-[13px] text-white">
                  {data?.length}
                </p>
              </div>

              <Link href="/shoppingCart">
                <FontAwesomeIcon
                  className="text-[14px] sm:text-[23px] md:text-[25px]"
                  icon={faCartShopping}
                />
              </Link>

            </div>

            <Link href={"/settings"}>
              {user?.image ? <img className="w-5 sm:w-6 md:w-8 rounded-full" src={user?.image}></img> : <FontAwesomeIcon className="text-[14px] sm:text-[23px] md:text-[25px]" icon={faUser} />}
            </Link>
          </div>

        </div>

      </header>


    </>

  )
}