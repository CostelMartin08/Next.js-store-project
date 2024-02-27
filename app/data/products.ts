import { db } from "@/app/lib//db";
import { Products } from "@prisma/client";


export const getAllProducts = async () => {

    try {

        return await db.products.findMany();

    } catch {
        return null;
    }
}

export const getProductByName = async (nameProduct: string) => {
    try {
        return await db.products.findFirst({
            where: { nameProduct },
        });
    } catch (error) {
        console.error('Error fetching product by name:', error);
        throw error;
    }
}

export const addProduct = async (
    nameProduct: string,
    photoProduct: string,
    productStock: number,
    priceProduct: number,
    productDiscount: boolean,
    discountPrice: number
):
    Promise<Products> => {

    try {

        return await db.products.create({
            data: {
                nameProduct,
                photoProduct,
                productStock,
                priceProduct,
                productDiscount,
                discountPrice,
            }
        });
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}