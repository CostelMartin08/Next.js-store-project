import { faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





const Order = () => {

    return (

        <section className="container h-dvh relative">

            <div
                style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}
                className="absolute   text-center space-y-4">

                <div className=" text-[10rem] text-emerald-950 overfloh-hidden">

                    <FontAwesomeIcon icon={faCircleCheck} />

                </div>

                <p className=" font-black text-xl">Your order has been successfully placed! </p>

                <p className="text-stone-600 text-md">A confirmation email was sent to costelmartinescu2000@gmail.com</p>

                <div className="pt-6">
                    <a className="font-black p-3 rounded-lg bg-emerald-950 text-white" href="/">Back to shopping</a>
                </div>
            </div>


        </section>
    )
}

export default Order;