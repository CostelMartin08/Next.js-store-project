"use client"

import { RoleGate } from "@/app/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { AddProduct } from "../components/addProduct";
import { ProductsTable } from "../components/productsTable";
import { useState } from "react";

const AdminPage = () => {

    const [viewFirstSection, setViewFirstSection] = useState(true);
    const [viewSecondSection, setViewSecondSection] = useState(false);


    return (

        <section className="container w-100 text-center mt-20">

            <RoleGate allowedRole={UserRole.ADMIN} >

                <div className="p-4 my-6 flex gap-4 font-black ">

                    <span className={`cursor-pointer ${viewFirstSection && 'border-b-2'}`} onClick={() => { setViewFirstSection(true); setViewSecondSection(false); }}>Add Product</span>
                   <span>/</span>
                    <span className={`cursor-pointer ${viewSecondSection && 'border-b-2'}`} onClick={() => { setViewFirstSection(false); setViewSecondSection(true); }}>Products Table</span>

                </div>

                {viewFirstSection && <AddProduct />}

                {viewSecondSection && <ProductsTable />}


            </RoleGate>


        </section>
    )
}

export default AdminPage;