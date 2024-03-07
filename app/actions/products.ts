'use server'

import { getAllProducts, getProductByName } from "../data/products"



export const getProducts = async (category: string) => {


   const products = await getAllProducts(category);


   if (!products) {
      return { error: "Category don`t exist!" }

   }

   return products;

}

export const getProductsByName = async (category: string, name: string) => {


   const product = await getProductByName(category, name);

   if (!product) {
      return { error: 'This product don`t exist!' }
   }

   return product;
}