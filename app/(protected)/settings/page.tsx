'use client'

import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";




const SettingPage = () => {


    const user = useCurrentUser();

    const onClick = () => {
        signOut();
    };

    return (
        <div className="h-80">

            {JSON.stringify(user)}
            <button>
                <a href="/admin">ADMIN</a>
            </button>

            <button
                type="submit"
                onClick={onClick}>
                Sign Out
            </button>

        </div>
    )
}

export default SettingPage;