'use client'

import { userCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { ErrorCard } from "./error-card";



interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;

};

export const RoleGate = ({
    children,
    allowedRole
}: RoleGateProps) => {

    const role = userCurrentRole();

    if (role !== allowedRole) {

        return (
            <ErrorCard />
        )
    }


    return (

        <>
            {children}
        </>
    )
};