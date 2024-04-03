"use client"

import { RoleGate } from "@/app/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { AddProduct } from "../components/addProduct";
import { ProductsTable } from "../components/productsTable";

const AdminPage = () => {


    return (

        <section className="container w-100 text-center mt-20">

            <RoleGate allowedRole={UserRole.ADMIN} >

                {/*<AddProduct /> */}


                <ProductsTable />


            </RoleGate>


        </section>
    )
}

export default AdminPage;