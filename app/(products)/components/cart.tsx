
import Image from "next/image";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartProduct } from "@/app/types";
import { faCartShopping, faForward } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "@/app/context";

interface Props {
    data: CartProduct[];
    setData: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    setForm: React.Dispatch<React.SetStateAction<boolean>>
}

const Cart = (props: Props) => {

    const { setState } = useAppContext();

    const increment = (stock: number, id: string): void => {

        props.setData(prevData => {

            const updatedData = prevData.map(item => {
                if (item.id === id) {
                    if (item.count < stock) {
                        if (item.discount > 0) {

                            return { ...item, count: item.count + 1, price: item.price + item.discountPrice };
                        } else {

                            return { ...item, count: item.count + 1, price: item.price };
                        }
                    } else {
                        return item;
                    }
                }
                return item;
            });

            sessionStorage.setItem('cart', JSON.stringify(updatedData));

            return updatedData;
        });
    };


    const decrement = (id: string): void => {

        props.setData(prevData => {

            const updatedData = prevData.map(item => {
                if (item.id === id) {
                    if (item.count > 1) {
                        if (item.discount > 0) {

                            return { ...item, count: item.count - 1, price: item.price - item.discountPrice };
                        } else {

                            return { ...item, count: item.count - 1, price: item.price };
                        }
                    } else {
                        return item;
                    }
                }
                return item;
            });

            sessionStorage.setItem('cart', JSON.stringify(updatedData));

            return updatedData;
        });
    };


    const calculateTotal = (): number => {
        let total = 0;

        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].discount > 0) {
                total += props.data[i].discountPrice * props.data[i].count;
            } else {
                total += props.data[i].price * props.data[i].count;
            }
        }

        return total;
    };


    const deleteItem = (id: string) => {
        props.setData(prevData => {
            const updatedData = prevData.filter(item => item.id !== id);
            sessionStorage.setItem('cart', JSON.stringify(updatedData));
            setState(updatedData);
            return updatedData;
        });
    };


    return (
        <>
            {props.data && props.data.length > 0 ?
                <>
                    <h6 className="text-[38px]  py-6 font-bold">Your Cart</h6>

                    <section className="flex flex-col lg:flex-row px-2 sm:px-6 lg:space-x-4">


                        <table className="table-fixed lg:basis-4/6">

                            <thead className="border-b-2">
                                <tr className="w-full  mx-auto flex flex-row p-2  my-4">
                                    <th className="basis-2/4 sm:basis-1/3 my-auto flex items-center">Product</th>
                                    <th className="basis-1/4 sm:basis-1/3 flex justify-center items-center">Quantity</th>
                                    <th className="basis-1/4 sm:basis-1/3 flex items-center justify-end">Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {props.data.map((element, index) => (

                                    <tr className="w-full  mx-auto flex flex-row p-2  my-4"
                                        key={index} >

                                        <td className="basis-2/4 sm:basis-1/3 my-auto flex items-center">

                                            <Image
                                                width={400}
                                                height={400}
                                                className="img w-20"
                                                src={`/products/${element.category}/${element.id}/${element.photo[0]}`}
                                                alt={element.name}>

                                            </Image>

                                            <h3 className="mx-3 text-xs truncate w-16 md:w-28 lg:w-40">{element.name}</h3>
                                        </td>

                                        <td className="basis-1/4 sm:basis-1/3 flex flex-col justify-center items-center">

                                            <div className="bg-slate-100 w-4/6 md:w-3/6 py-2 rounded text-center flex">

                                                <button
                                                    className="w-1/3"
                                                    onClick={() => { decrement(element.id) }}
                                                >
                                                    <FontAwesomeIcon
                                                        className="clr-primary"
                                                        icon={faMinus} />
                                                </button>

                                                <div
                                                    className='w-1/3 select-none'>
                                                    <p>{element.count}</p>
                                                </div>

                                                <button
                                                    className="w-1/3"
                                                    onClick={() => { increment(element.stock, element.id) }}
                                                >
                                                    <FontAwesomeIcon
                                                        className="clr-primary"
                                                        icon={faPlus} />
                                                </button>

                                            </div>
                                            <div>
                                                <button
                                                    className="underline text-[10px] w-max"
                                                    onClick={() => { deleteItem(element.id) }}>
                                                    Discharge
                                                </button>
                                            </div>

                                        </td>

                                        <td className="basis-1/4 sm:basis-1/3 flex items-center justify-end">
                                            {element.discount > 0 ?
                                                <p className="mx-2">{element.discountPrice}$</p>
                                                : <p className="mx-2">{element.price}$</p>
                                            }
                                        </td>
                                    </tr>


                                ))}
                            </tbody>
                        </table >


                        <div className=" lg:basis-2/6 flex flex-col justify-start  lg:p-4">


                            <div className="flex flex-col border rounded-md place-content-around items-center  h-96 ">

                                <div className="w-4/6 space-y-4">
                                    <p className="text-[15px] font-light">Subtotal:{calculateTotal()} </p>
                                    <p className="text-[20px] font-bold">Total price: {calculateTotal()} $</p>
                                </div>
                                <textarea
                                    className="w-4/6 border rounded-md h-32 w-8/9"
                                    placeholder=" If you have comments, leave them here"
                                >

                                </textarea>

                                <button
                                    onClick={() => props.setForm(true)}
                                    className="border p-3 bg-indigo-800 rounded-md text-white w-4/6"
                                >Checkout
                                    <FontAwesomeIcon
                                        className="px-2"
                                        icon={faForward}
                                    />
                                </button>

                            </div>

                        </div>

                    </section >
                </>
                :

                <div className="w-4/5 h-96 sm:w-96 mx-auto flex flex-col space-y-8 justify-center items-center ">

                    <FontAwesomeIcon
                        className="text-[24px] sm:text-[26px] md:text-[30px]"
                        icon={faCartShopping}
                    />

                    <p className="text-[16px] sm:text-[25px] text-center font-bold w-4/6">Your cart is empty!</p>

                    <button className="text-[17px] sm:text-[20px] border p-2 sm:p-3 bg-indigo-800 rounded-md text-white w-4/6">
                        Continue Shopping
                    </button>

                </div>

            }

        </>

    )

}

export default Cart;