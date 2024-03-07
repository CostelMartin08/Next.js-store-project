'use client'

import ToggleSwitch from "./toggleSwitchSet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";

import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import Link from "next/link";


import "./components.css";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";

export const Navbar = () => {

    const user = useCurrentUser();
    const handleSubmit = () => {
        signOut();
    }


    return (

        <header className='container mx-auto lg:py-8'>

            <div className="flex w-full p-5 md:p-3 lg:p-6">

                <div className="w-1/4 lg:hidden flex justify-start ">


                    <ToggleSwitch />

                </div>

                <div className="w-2/4  lg:w-1/4 flex justify-center items-center lg:justify-start ">

                    <Link href="/">
                        <h1 className="sm:text-[23px] md:text-[25px] font-bold">GandgetGrid</h1>
                    </Link>

                </div>

                <ul className="w-2/4 hidden lg:flex space-x-10 justify-center items-center lg:text-[18px] xl:text-[20px] clr-gray">


                    <li><Link href="/settings">Settings</Link></li>

                    {user?.role === "ADMIN" && <li><Link href="/admin">Admin Mode</Link></li>}
                </ul>


                <div className="flex w-1/4 space-x-6  justify-end items-center">

                    <button className="cursor-pointer" onClick={handleSubmit}>
                        <FontAwesomeIcon className="text-[14px] sm:text-[23px] md:text-[25px]" icon={faArrowRightFromBracket} />
                    </button>

                    <div className="hover-element cursor-pointer w-8">
                        <div id='id1'>
                            {user?.image ? <img className="w-5 sm:w-6 md:w-8 rounded-full" src={user?.image}></img> : <FontAwesomeIcon className="text-[14px] sm:text-[23px] md:text-[25px]" icon={faUser} />}
                        </div>
                        <div className="cursor-pointer" id='id2'>
                            <input className="input-add-photo"  type="file"></input>
                            <FontAwesomeIcon className="text-[14px] sm:text-[23px] md:text-[25px]" icon={faCirclePlus} />
                        </div>
                    </div>
                </div>

            </div>



        </header>


    )
}