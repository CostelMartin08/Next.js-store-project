'use server'

import { getProductsByIdAndChangeStatus, getProductsByIdAndChangeStock, createDiscountById, modifyNameAndPhotoById } from "../data/products"
import { ProductsStock } from "../types"


export const modifyStatus = async (products: ProductsStock, state: boolean) => {


    const updateStatus = await getProductsByIdAndChangeStatus(products.category, products.id, state)


    if (!updateStatus) {
        return { error: "Error!" }
    }

    return { success: "State of product has been modify!" }


}

export const modifyStock = async (products: ProductsStock, stock: number) => {


    const updateStatus = await getProductsByIdAndChangeStock(products.category, products.id, stock)

    if (!updateStatus) {

        return { error: false }
    }

    return { success: true }


}

export const createDiscount = async (products: ProductsStock, price: number, discountPrice: number) => {


    const difference = Math.abs(discountPrice - price);

    const percentageDifference = (difference / price) * 100;


    const newDiscountPrice = await createDiscountById(products.category, products.id, discountPrice, percentageDifference);


    if (!newDiscountPrice) {
        return { error: 'Error!' }
    }

    return { success: true };

}
