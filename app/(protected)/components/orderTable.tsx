import React from 'react';
import { getOrder } from "@/app/types";

interface OrderTableProps {
    orders: getOrder[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
    const ordersContent = orders?.map((order, index) => (
        <OrderRow key={index} order={order} index={index} />
    ));

    return (
        <table style={{ tableLayout: 'fixed', width: '90%' }} className="table-auto text-sm md:text-base">

            <caption className="text-3xl text-center font-black py-8">
                Order List
            </caption>

            {ordersContent}

        </table>
    );
}

interface OrderRowProps {
    order: getOrder;
    index: number;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, index }) => (
    <>


        <thead className="border-b-2">

            <tr className="flex flex-col py-6">

                <th className='font-normal text-sm flex md:flex-row flex-col text-left space-x-4 mt-5 py-6'>

                    <span>{index + 1}.<span >Order Id: <span className='font-black'>{order.id}</span></span></span>

                    <span >Ordered on: <span className='font-black'>{order.date.toLocaleString()}</span></span>

                </th>

                <tr className='flex  '>

                    <th className="w-4/12 md:w-5/12 text-left px-2" scope="col">Name</th>
                    <th className=" w-2/12" scope="col">Photo</th>
                    <th className="w-2/12" scope="col">Count</th>
                    <th className="w-2/12" scope="col">Price</th>
                    <th className="w-2/12 md:w-1/12 text-right pe-4" scope="col"></th>
                </tr>
            </tr>
        </thead>

        <tbody className="flex flex-wrap ">

            <tr className="flex border-b-2 w-full">

                <OrderData order={order} index={index} />

            </tr>

        </tbody>
    </>
);

const OrderData: React.FC<OrderRowProps> = ({ order }) => (

    <>
        <th className="w-4/12 md:w-5/12">
            {order.products.map((element, index) => (
                <div key={index} className="h-24 flex items-center px-2 space-x-2">
                    <p>{index + 1}.</p>
                    <a href={`/products/products?q1=${element.category}&q2=${encodeURIComponent(element.name)}`} className="truncate md:text-clip">{element.name}</a>
                </div>
            ))}
        </th>
        <th className=" w-2/12">
            {order.products.map((element, index) => (
                <div className="h-24 p-2" key={index}>
                    <img src={element.photo} alt={element.name} className="size-full object-contain " />
                </div>
            ))}
        </th>
        <th className="w-2/12">
            {order.products.map((element, index) => (
                <div className="h-24 w-full flex items-center justify-center" key={index}>
                    <span>{element.count}</span>
                </div>
            ))}
        </th>
        <th className="w-2/12">
            {order.products.map((element, index) => (
                <div className="h-24 w-full  flex items-center justify-center" key={index}>
                    <span>{element.price}</span>
                </div>
            ))}
        </th>
        <th className="w-2/12 md:w-1/12 flex items-end justify-end">
            <div className="flex justify-end  content-end">
                <p className="">Total: {order.products.reduce((acc, curr) => acc + curr.price, 0)}$</p>
            </div>
        </th>

    </>
);

export default OrderTable;
