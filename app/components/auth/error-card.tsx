import { faChevronRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"


export const ErrorCard = () => {



    return (

        <div className="mx-auto flex flex-col items-center justify-between p-6 bg-white rounded-md h-96 md:w-96">

            <h3 className="text-3xl font-black">Something went wrong</h3>

            <FontAwesomeIcon className="text-red-300/25 text-[10rem]" icon={faCircleXmark} />

            <div className="border-2 rounded-lg px-6 py-3 space-x-2">
                <Link href="/auth/signIn">Back</Link>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>

        </div>

    )
}