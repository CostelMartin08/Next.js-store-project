import { db } from "@/app/lib//db";
import { Product, addProductsStock } from "../types";


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

export const decrementStockById = async (category: string, id: string, count: number, stock: number) => {

    try {
        let product;
        switch (category) {
            case 'laptops':
                product = await db.laptops.findFirst({
                    where: { id },
                });
                if (product) {
                    let currentStock = stock;
                    let newStock = currentStock - count;
                    await db.laptops.update({
                        where: { id },
                        data: { stock: newStock },
                    });
                }
                break;
            case 'tablets':
                product = await db.tablets.findFirst({
                    where: { id },
                });
                if (product) {
                    let currentStock = stock;
                    let newStock = currentStock - count;
                    await db.tablets.update({
                        where: { id },
                        data: { stock: newStock },
                    });
                }
                break;
            case 'smartphones':
                product = await db.smartphones.findFirst({
                    where: { id },
                });
                if (product) {
                    let currentStock = stock;
                    let newStock = currentStock - count;
                    await db.smartphones.update({
                        where: { id },
                        data: { stock: newStock },
                    });
                }
                break;
            case 'tv':
                product = await db.tV.findFirst({
                    where: { id },
                });
                if (product) {
                    let currentStock = stock;
                    let newStock = currentStock - count;
                    await db.tV.update({
                        where: { id },
                        data: { stock: newStock },
                    });
                }
                break;
            default:
                throw new Error(`The category ${category} doesn't exist.`);
        }
        return product;
    } catch (error) {
        console.error("Error during interrogation", error);
        return null;
    }
};


export const addProduct = async (props: addProductsStock) => {

    console.log(props.collection)
    
    try {
        let add;

        switch (props.collection) {
            case 'laptops':
                add = db.laptops.create({
                    data: {
                        name: props.productName,
                        stock: props.stock as number,
                        price: props.price as number,
                        discountPrice: props.discountPrice as number,
                        description: props.description as string,
                        photo: props?.files.map((element: File)=> element.name)

                    }
                })
                break;
            case 'tablets':
                add = db.tablets.create({
                    data: {
                        name: props.productName,
                        stock: props.stock as number,
                        price: props.price as number,
                        discountPrice: props.discountPrice as number,
                        description: props.description as string,
                        photo: props?.files.map((element: File)=> element.name)

                    }
                })
                break;
            case 'smartphones':
                add = db.smartphones.create({
                    data: {
                        name: props.productName,
                        stock: props.stock as number,
                        price: props.price as number,
                        discountPrice: props.discountPrice as number,
                        description: props.description as string,
                        photo: props?.files.map((element: File)=> element.name)

                    }
                })
                break;
            case 'tv':
                add = db.tV.create({
                    data: {
                        name: props.productName,
                        stock: props.stock as number,
                        price: props.price as number,
                        discountPrice: props.discountPrice as number,
                        description: props.description as string,
                        photo: props?.files.map((element: File)=> element.name)

                    }
                })
                break;
            default:
                throw new Error(`This category don't exist.`);

        }

        return add;

    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }

}