import { CartProduct } from "../types";
import { FormData } from "../types";
import { UserOrder } from "../types";
import { db } from "../lib/db";

export interface Order extends FormData {
    products?: CartProduct[];

}


export const getOrders = async (id: string): Promise<UserOrder[] | null> => {
    try {

        let orders: UserOrder[] | null = null;

        orders = await db.orders.findMany({
            where: {
                userId: id,
            },
        });

        return orders;
    } catch {
        return null;
    }
};

export const getOrdersProduct = async (orderId: string) => {

    try {

        let orders;

        orders = await db.product.findMany({
            where: {
                ordersId: orderId,
            },
        });

        return orders;
    } catch {
        return null;
    }

}


export const addOrder = async (order: Order, user: string) => {


    try {
        let addedOrder;

        addedOrder = await db.orders.create({
            data: {
                userId: user,
                contact: order.contact as string,
                country: order.country as string,
                name: order.name as string,
                address: order.address as string,
                postalCode: order.postalCode as string,
                city: order.city as string,
                state: order.state as string,
                date: new Date(),
                products: {
                    create: order.products?.map((product) => {
                        return {
                            name: product.name,
                            photo: product.photo,
                            category: product.category,
                            price: product.price,
                            count: product.count,
                            discountPrice: product.discountPrice,
                        };
                    })
                }

            }
        });

        return addedOrder;

    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}
