import { auth, signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";


const SettingPage = async () => {


    const session = await auth();


    return (
        <div>

            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut({ 
                    redirectTo: "/auth/signIn" 
                })
            }}>
                <button type="submit">
                    Sign Out
                </button>


            </form>

        </div>
    )
}

export default SettingPage;