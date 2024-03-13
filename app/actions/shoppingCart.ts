'use server'

import { currentUser } from "../lib/auth";
import { getUserById } from "../data/user";
import { decrementStockById } from "../data/products";
import { CartProduct } from "../(products)/products/[name]/page";
import { FormData } from "../(products)/shoppingCart/page";
import { addOrder } from "../data/orders";


export const identifyProductsCart = async (formData: FormData, data: CartProduct[]) => {

    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized!" };
        }

        const dbUser = await getUserById(user.id as string);

        if (!dbUser) {
            return { error: "Unauthorized!" };
        }

        const decrementAllStocks = async () => {
            try {
                for (let i = 0; i < data.length; i++) {

                    await decrementStockById(data[i].category, data[i].id, data[i].count, data[i].stock);
                    formData.products = data;
                    await addOrder(formData, user.id as string)
                }
                return { success: 'The stock has been successfully updated!' };

            } catch (error) {

                return { error: `Error: ${error}` };
            }
        };

        const result = await decrementAllStocks();

        return result;


    }
    catch (error) {
        return { error: `Error: ${error}` }; 
    }

}

