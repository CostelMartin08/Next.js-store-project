'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CartProduct } from "@/app/types";
import ToggleSwitch from "./toggleSwitch";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from "@/hooks/use-current-user";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";

import '../components.css';
import { useAppContext } from "@/app/context";

export default function Header() {

  const user = useCurrentUser();
  const [data, setData] = useState<CartProduct[]>([]);

  const { state } = useAppContext();

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
      setData(cart);

    }
  }, [state]);

  let imagePath = user?.image ;

  return (

    <header className="container">

      <section className="text-sm md:text-md flex py-6 w-full  sm:px-6 px-2">

        <div className="w-1/4 lg:hidden flex justify-start">

          <ToggleSwitch />

        </div>

        <div className="w-2/4 lg:w-1/4 flex  items-center justify-center lg:justify-start ">

          <Link href="/">
            <h1 className="text-xl xl:text-2xl font-black">GadgetGrid</h1>
          </Link>

        </div>

        <ul className="text-lg xl:text-xl w-3/4 hidden lg:flex lg:space-x-3 xl:space-x-4 justify-center items-center">
          <Link href='/collections/category?category=laptops'>Laptop</Link>
          <Link href='/collections/category?category=tablets'>Tablet</Link>
          <Link href='/collections/category?category=smartphones'>Smartphone</Link>
          <Link href='/collections/category?category=smartwatches'>Smartwatches</Link>
          <Link href='/contact'>Contact</Link>
          <Link className="truncate" href='/usStory'>Us Story</Link>
        </ul>

        <div className="flex w-1/4 space-x-4 justify-end items-center">

          <div className="relative">

            {data?.length === 0 ? null :
              <div
                style={{ top: '-10px', right: '-10px' }}
                className="absolute size-4 sm:size-5 text-center flex justify-center rounded-xl bg-red-500">
                <p
                  className="m-0 text-xs sm:text-sm text-white">
                  {data?.length}
                </p>
              </div>
            }

            <Link href="/shoppingCart">
              <FontAwesomeIcon
                className="text-md sm:text-lg"
                icon={faCartShopping}
              />
            </Link>

          </div>

          <Link href="/settings">

            {user?.image ? <img className="size-7 rounded-full" height={80} width={80} alt={`${user?.id}`}
              src={`${imagePath}`}></img>
              :
              <FontAwesomeIcon className="text-md sm:text-lg px-1" icon={faUser}
              />
            }
          </Link>

        </div>
      </section>

    </header>

  )
}