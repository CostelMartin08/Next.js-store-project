'use server'

import { getAllProducts, getProductById, getProductByName } from "../data/products"


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

export const getProductsById = async (category: string, id: string) => {


   const product = await getProductById(category, id);

   if (!product) {
      return { error: 'This product don`t exist!' }
   }

   return product;
}