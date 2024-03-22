'use client';
import { getsAllOrders } from "@/app/actions/orders";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { getOrder } from "@/app/types";
import OrderTable from "../components/orderTable";

export const myOrders = () => {

    const user = useCurrentUser();
    const [orders, setOrders] = useState<getOrder[]>([]);

    useEffect(() => {

        getsAllOrders(user?.id as string)
            .then((data) => {

                if (data.error) {

                    console.log(data.error);
                }

                setOrders(data.success as any);
            })
            .catch(() => console.log("Something went wrong!"));
    }, []);


    return (
        <section className="container flex items-center flex-col">

            <OrderTable orders={orders} />

        </section>
    );
};
