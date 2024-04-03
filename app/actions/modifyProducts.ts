'use server'

import { getProductsByIdAndChangeStatus } from "../data/products"
import { ProductsStock } from "../types"



export const modifyStatus = async (products: ProductsStock, state: boolean) => {


    const updateStatus = await getProductsByIdAndChangeStatus(products.category, products.id, state)


    if(!updateStatus){
        return {error:"Error!"}
    }

    return {success: "State of product has been modify!"}


}