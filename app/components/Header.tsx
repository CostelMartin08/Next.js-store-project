'use client'
import React from "react";
import '../components/components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

import ToggleSwitch from "./toggleSwitch";
import Link from "next/link";


type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined

type Props = {
  user?: User,
  pagetype?: string,
}

export default function Header({ user, pagetype }: Props) {




  return (
    <>

      <div className="bg-gray-700 text-center py-4 font-sm text-white">

        <h4>Informează clienții de posibile reduceri sau sesizează probleme de logistică</h4>

      </div>

      <header className='container mx-auto lg:py-8'>

        <div className="flex w-full p-5 md:p-8 lg:p-10">

          <div className="w-1/4 lg:hidden flex justify-start ">

            <ToggleSwitch />


          </div>

          <div className="w-2/4  lg:w-1/4 flex justify-center items-center lg:justify-start ">

            <h1 className="font-lg">LOGO</h1>

          </div>

          <ul className="w-2/4 hidden lg:flex space-x-10 justify-center items-center font-md clr-gray">
            <li><Link href="/api/auth/signin">Sign In</Link></li>
            <li><Link href="/api/auth/signout">Sign Out</Link></li>
            <li>Pachete</li>
            <li>Contact</li>
          </ul>


          <div className="flex w-1/4 space-x-6  justify-end items-center">

            <FontAwesomeIcon className="text-lg" icon={faCartShopping} />

            {user?.image ? <Image width={200} height={200} className="w-6 sm:w-8 lg:w-11 rounded-full " src={user?.image} alt={"userPhoto"} /> : null}

          </div>

        </div>

        <div className="p-5 md:p-8 lg:p-10 pb-0">

          {user?.name ? <p>Bună {user?.name}</p> : null}

        </div>
      </header>


    </>

  )
}