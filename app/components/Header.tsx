import React from "react";


export default function Header () {


    return (

        <header className=" container mx-auto my-8">
          <div className="flex flex-row justify-between items-center">
            <div className="logo">
              <h1>LOGO</h1>
            </div>

            <ul className="flex gap-5 flex-row">
              <li>Acasa</li>
              <li>Shop</li>
              <li>Pachete</li>
              <li>Contact</li>
            </ul>
          </div>

        </header>

    )
}