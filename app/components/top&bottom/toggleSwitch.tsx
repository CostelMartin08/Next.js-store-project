'use client'

import { useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

import "./toggleSwitch.css";

const ToggleSwitch = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {

        setMenuOpen(!menuOpen);

    }

    return (
        <section className="text-sm md:text-md flex items-center">

            <div id="menuToggle">


                <FontAwesomeIcon className="text-xl xl:text-2xl m-0" onClick={() => toggleMenu()} icon={faBars} />

            </div>

            {menuOpen && (

                <div className="menu bg-gray-700 px-10 py-10">

                    <div className="button-x">

                        <FontAwesomeIcon className="text-[20px]" onClick={() => toggleMenu()} icon={faXmark} />

                    </div>

                    <ul className="text-xl xl:text-2xl space-y-5">
                        <li><Link onClick={() => toggleMenu()} href='/collections/category?category=laptops'>Laptop</Link></li>
                        <li> <Link onClick={() => toggleMenu()} href='/collections/category?category=tablets'>Tablet</Link></li>
                        <li> <Link onClick={() => toggleMenu()} href='/collections/category?category=smartphones'>Smartphone</Link></li>
                        <li> <Link onClick={() => toggleMenu()} href='/collections/category?category=tv'>TV</Link></li>
                        <li> <Link onClick={() => toggleMenu()} href='/collections/category?category=contact'>Contact</Link></li>
                        <li> <Link onClick={() => toggleMenu()} href='/collections/category?category=story'>Us Story</Link></li>
                    </ul>

                    <div className="text-[25px] space-x-5 py-5">

                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faXTwitter} />
                        <FontAwesomeIcon icon={faEnvelope} />


                    </div>

                </div>
            )}


        </section>
    )
}

export default ToggleSwitch;