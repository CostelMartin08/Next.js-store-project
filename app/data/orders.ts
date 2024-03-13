import { CartProduct } from "../(products)/products/[name]/page"

import { FormData } from "../(products)/shoppingCart/page";
import { db } from "../lib/db";

export interface Order extends FormData {
    products?: CartProduct[];

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
                products: {
                    create: order.products?.map((product) => {
                        return {
                            name: product.name,
                            photo:product.photo,
                            price: product.price,
                            count: product.count,
                            discount: product.discount,
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
