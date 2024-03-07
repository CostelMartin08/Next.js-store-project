'use client'

import { RoleGate } from "@/app/components/auth/role-gate"
import { userCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"


const AdminPage = () => {

    const role = userCurrentRole()


    return (

        <div className="w-100 text-center">

            <h3>Admin</h3>

            <RoleGate allowedRole={UserRole.ADMIN} >

                <h4>Tu esti sefu!</h4>

            </RoleGate>


        </div>
    )
}

export default AdminPage;