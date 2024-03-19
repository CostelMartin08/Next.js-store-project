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

  console.log(user?.image)

  return (
    <section className="text-sm md:text-md">

      <div className="bg-gray-700 text-center p-2 text-white z-10">

        <h4>For orders over $1000 shipping is free</h4>

      </div>

      <header className='container mx-auto lg:py-8'>

        <div className="flex w-full p-4">

          <div className="w-1/4 lg:hidden flex justify-start">

            <ToggleSwitch />

          </div>

          <div className="w-2/4 lg:w-1/4 flex  items-center justify-center lg:justify-start ">

            <Link href="/">
              <h1 className="text-xl xl:text-2xl font-black">GandgetGrid</h1>
            </Link>

          </div>

          <ul className="text-lg w-2/4 hidden lg:flex space-x-4 justify-center items-center clr-gray text-lg xl:text-xl">
            <Link href='/collections/category?category=laptops'>Laptop</Link>
            <Link href='/collections/category?category=tablets'>Tablet</Link>
            <Link href='/collections/category?category=smartphones'>Smartphone</Link>
            <Link href='/collections/category?category=tv'>TV</Link>
            <Link href='/collections/category?category=contact'>Contact</Link>
            <Link href='/collections/category?category=story'>Us Story</Link>
          </ul>

          <div className="flex w-1/4 space-x-4 justify-end items-center">

            <div className="relative">

              <div
                style={{ top: '-10px', right: '-10px' }}
                className="absolute size-4 sm:size-5 text-center flex justify-center rounded-xl bg-red-500">
                <p
                  className="m-0 text-xs sm:text-sm text-white">
                  {data?.length}
                </p>
              </div>

              <Link href="/shoppingCart">
                <FontAwesomeIcon
                  className="text-md sm:text-lg"
                  icon={faCartShopping}
                />
              </Link>

            </div>

            <Link href="/settings">

              {user?.image ? <img className="size-7 rounded-full" src={`/photo/${user?.image}`}></img>
                :
                <FontAwesomeIcon className="text-md sm:text-lg px-1" icon={faUser}
                />
              }
            </Link>

          </div>

        </div>

      </header>

    </section>

  )
}