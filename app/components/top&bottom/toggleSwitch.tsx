'use client'
import React, { useState } from "react";
import "./toggleSwitch.css";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";



const ToggleSwitch = () => {

    const [menuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {

        setMenuOpen(!menuOpen);

    }



    return (
        <>
            <div id="menuToggle">


                <FontAwesomeIcon className="font-lg" onClick={() => toggleMenu()} icon={faBars} />

            </div>



            {menuOpen && (

                <div className="menu bg-gray-700 px-10 py-10">


                    <div className="button-x font-lg">

                        <FontAwesomeIcon onClick={() => toggleMenu()} icon={faXmark} />

                    </div>


                    <ul className="h-80 font-lg space-y-6">
                        <li>Acasa</li>
                        <li>Shop</li>
                        <li>Pachete</li>
                        <li>Contact</li>
                    </ul>

                    <div className="font-md">
                        <p>social</p>
                        <p>social</p>
                        <p>social</p>
                        <p>social</p>
                    </div>

                </div>
            )}


        </>
    )
}

export default ToggleSwitch;