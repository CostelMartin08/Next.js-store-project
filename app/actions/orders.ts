'use server'

import { getOrders, getOrdersProduct } from "../data/orders"



export const getsAllOrders = async (id: string) => {

    try {

        const orders = await getOrders(id);

        if (!orders) {

            return { error: 'There are no orders yet!' };

        }

        const dataArray = await Promise.all(orders.map(order => getOrdersProduct(order.id)));

        const flatDataArray = dataArray.flat();

        const ordersWithProducts = orders.map(order => {
            const productsForOrder = flatDataArray.filter(product => product?.ordersId === order.id);
            return {
                ...order,
                products: productsForOrder
            };
        });

        return {success: ordersWithProducts};


    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }

}



