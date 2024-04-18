'use client'
import React, { useState } from "react";

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentUser } from "@/hooks/use-current-user";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import Link from "next/link";

import "@/app/components/top&bottom/toggleSwitch.css";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";

const ToggleSwitch = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const user = useCurrentUser();

    const toggleMenu = () => {

        setMenuOpen(!menuOpen);

    }

    return (
        <>
            <div id="menuToggle">


                <FontAwesomeIcon className="sm:text-[23px] md:text-[25px]" onClick={() => toggleMenu()} icon={faBars} />

            </div>


            {menuOpen && (

                <div className="menu bg-gray-700  px-10 py-10">


                    <div className="button-x">

                        <FontAwesomeIcon className="text-[20px]" onClick={() => toggleMenu()} icon={faXmark} />

                    </div>

                    <ul className="h-80 font-lg space-y-10 text-2xl md:text-3xl">


                        <li onClick={() => toggleMenu()}><Link href="/settings">Settings</Link></li>
                        <li onClick={() => toggleMenu()}><Link href="/myOrders">My Orders</Link></li>
                        {user?.role === "ADMIN" && <li onClick={() => toggleMenu()}><Link href="/admin">Store Management</Link></li>}
                    </ul>

                    <div className="text-[25px] space-x-5">

                        <a href='https://www.facebook.com/costel.martinescu.7/'> <FontAwesomeIcon icon={faFacebook} /></a>
                        <a href='https://www.instagram.com/costelmartinescu/'> <FontAwesomeIcon icon={faInstagram} /></a>
                        <FontAwesomeIcon icon={faXTwitter} />
                        <FontAwesomeIcon icon={faEnvelope} />

                    </div>

                </div>
            )}


        </>
    )
}

export default ToggleSwitch;