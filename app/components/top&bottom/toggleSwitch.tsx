'use client'
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import "./toggleSwitch.css";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

const ToggleSwitch = () => {

    const [menuOpen, setMenuOpen] = useState(false);


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


                    <ul className="h-80 font-lg space-y-4">
                        <li>Laptop</li>
                        <li>Tablet</li>
                        <li>Smartphone</li>
                        <li>TV</li>
                        <li>Contact</li>
                        <li>Us Story</li>
                    </ul>

                    <div className="text-[25px] space-x-5">

                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faXTwitter} />
                        <FontAwesomeIcon icon={faEnvelope} />


                    </div>

                </div>
            )}


        </>
    )
}

export default ToggleSwitch;