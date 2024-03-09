import { db } from "@/app/lib//db";

export interface Product {
    id: string,
    name: string,
    photo: string,
    stock: number,
    price: number,
    discount: boolean,
    discountPrice: number,

}

export const getAllProducts = async (category: string): Promise<Product[]> => {

    try {
        let products: Product[] | null = null;

        switch (category) {
            case 'laptops':
                products = await db.laptops.findMany();
                break;
            case 'tablets':
                products = await db.tablets.findMany();
                break;
            case 'smartphones':
                products = await db.smartphones.findMany();
                break;
            case 'tv':
                products = await db.tV.findMany();
                break;
            default:
                throw new Error(`This ${category} don't exist.`);
        }
        return products;
    } catch (error) {
        console.error("Error:", error);

        throw error;
    }
}


export const getProductByName = async (category: string, name: string) => {


    try {
        let product;

        switch (category) {
            case 'laptops':
                product = db.laptops.findFirst({
                    where: { name },
                });
                break;
            case 'tablets':
                product = db.tablets.findFirst({
                    where: { name },
                });
                break;
            case 'smartphones':
                product = db.smartphones.findFirst({
                    where: { name },
                });
                break;
            case 'tv':
                product = db.tV.findFirst({
                    where: { name },
                });
                break;
            default:
                throw new Error(`This ${name} name don't exist.`);
        }
        return product;

    } catch (error) {
        console.error("Error at interrogation", error);
        return null;
    }

};

export const getProductById = async (category: string, id: string) => {


    try {
        let product;
        switch (category) {
            case 'laptops':
                product = db.laptops.findFirst({
                    where: { id },
                });
                break;
            case 'tablets':
                product = db.tablets.findFirst({
                    where: { id },
                });
                break;
            case 'smartphones':
                product = db.smartphones.findFirst({
                    where: { id },
                });
                break;
            case 'tv':
                product = db.tV.findFirst({
                    where: { id },
                });
                break;
            default:
                throw new Error(`This ${id} name don't exist.`);
        }
        return product;

    } catch (error) {
        console.error("Error at interrogation", error);
        return null;
    }

};

export const getAllProductsCart = async () => {

};

export const addProduct = async (

    name: string,
    photo: string,
    stock: number,
    price: number,
    discount: boolean,
    discountPrice: number,
    category: string,
):
    Promise<Product> => {

    try {
        let add;

        switch (category) {
            case 'laptops':
                add = db.laptops.create({
                    data: {
                        name,
                        photo,
                        stock,
                        price,
                        discount,
                        discountPrice
                    }
                })
                break;
            case 'tablets':
                add = db.tablets.create({
                    data: {
                        name,
                        photo,
                        stock,
                        price,
                        discount,
                        discountPrice
                    }
                })
                break;
            case 'smartphones':
                add = db.smartphones.create({
                    data: {
                        name,
                        photo,
                        stock,
                        price,
                        discount,
                        discountPrice
                    }
                })
                break;
            case 'tv':
                add = db.tV.create({
                    data: {
                        name,
                        photo,
                        stock,
                        price,
                        discount,
                        discountPrice
                    }
                })
                break;
            default:
                throw new Error(`This ${category} category don't exist.`);

        }

        return add;

    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}