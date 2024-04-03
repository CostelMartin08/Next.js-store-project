import { db } from "@/app/lib//db";
import { Product, allValues } from "../types";


export const getAllProductsInAllCategoriesFn = async () => {

    try {
        const laptops = await db.laptops.findMany();
        const tablets = await db.tablets.findMany();
        const smartphones = await db.smartphones.findMany();
        const tV = await db.tV.findMany();

        const allProducts = [
            ...laptops.map(product => ({ ...product, category: 'laptops' })),
            ...tablets.map(product => ({ ...product, category: 'tablets' })),
            ...smartphones.map(product => ({ ...product, category: 'smartphones' })),
            ...tV.map(product => ({ ...product, category: 'tV' })),
        ];

        allProducts.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return allProducts;

    } catch {

        return null;
    }


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

        const availableProducts = products.filter(product => product.status === true);

        return availableProducts;

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

export const getProductsByIdAndChangeStatus = async (category: string, id: string, status: boolean) => {

    try {
        let product;
        switch (category) {
            case 'laptops':
                product = await db.laptops.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.laptops.update({
                        where: { id },
                        data: { status: status },
                    });
                }
                break;
            case 'tablets':
                product = await db.tablets.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.tablets.update({
                        where: { id },
                        data: { status: status },
                    });
                }
                break;
            case 'smartphones':
                product = await db.smartphones.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.smartphones.update({
                        where: { id },
                        data: { status: status },
                    });
                }
                break;
            case 'tV':
                product = await db.tV.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.tV.update({
                        where: { id },
                        data: { status: status },
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

}

export const getProductsByIdAndChangeStock = async (category: string, id: string, stock: number) => {

    try {
        let product;
        switch (category) {
            case 'laptops':
                product = await db.laptops.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.laptops.update({
                        where: { id },
                        data: { stock: stock },
                    });
                }
                break;
            case 'tablets':
                product = await db.tablets.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.tablets.update({
                        where: { id },
                        data: { stock: stock },
                    });
                }
                break;
            case 'smartphones':
                product = await db.smartphones.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.smartphones.update({
                        where: { id },
                        data: { stock: stock },
                    });
                }
                break;
            case 'tV':
                product = await db.tV.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.tV.update({
                        where: { id },
                        data: { stock: stock },
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

}

export const createDiscountById = async (category: string, id: string, discountPrice: number, discount: number) => {

    try {
        let product;
        switch (category) {
            case 'laptops':
                product = await db.laptops.findFirst({
                    where: { id },
                });
                if (product) {
                    await db.laptops.update({
                        where: { id },
                        data: { discountPrice: discountPrice, discount: discount },
                    });
                }
                break;
            case 'tablets':
                product = await db.tablets.findFirst({
                    where: { id },
                });
                if (product) {
                    await db.tablets.update({
                        where: { id },
                        data: { discountPrice: discountPrice, discount: discount },
                    });
                }
                break;
            case 'smartphones':
                product = await db.smartphones.findFirst({
                    where: { id },
                });
                if (product) {
                    await db.smartphones.update({
                        where: { id },
                        data: { discountPrice: discountPrice, discount: discount },
                    });
                }
                break;
            case 'tV':
                product = await db.tV.findFirst({
                    where: { id },
                });
                if (product) {
                    await db.tV.update({
                        where: { id },
                        data: { discountPrice: discountPrice, discount: discount },
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
}

export const decrementStockById = async (category: string, id: string, count: number, stock: number, unitsSold: number) => {


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
                    let sold = unitsSold + count;
                    await db.laptops.update({
                        where: { id },
                        data: { stock: newStock, unitsSold: sold },
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
                    let sold = unitsSold + count;
                    await db.tablets.update({
                        where: { id },
                        data: { stock: newStock, unitsSold: sold },
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
                    let sold = unitsSold + count;
                    await db.smartphones.update({
                        where: { id },
                        data: { stock: newStock, unitsSold: sold },
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
                    let sold = unitsSold + count;
                    await db.tV.update({
                        where: { id },
                        data: { stock: newStock, unitsSold: sold },
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


export const addProduct = async (props: allValues) => {


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
                        photo: props?.files.map((element: File) => element.name),
                        discount: props?.discount,
                        unitsSold: props?.unitsSold,
                        status: props?.status,
                        date: props?.date,
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
                        photo: props?.files.map((element: File) => element.name),
                        discount: props?.discount,
                        unitsSold: props?.unitsSold,
                        status: props?.status,
                        date: props?.date,
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
                        photo: props?.files.map((element: File) => element.name),
                        discount: props?.discount,
                        unitsSold: props?.unitsSold,
                        status: props?.status,
                        date: props?.date,
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
                        photo: props?.files.map((element: File) => element.name),
                        discount: props?.discount,
                        unitsSold: props?.unitsSold,
                        status: props?.status,
                        date: props?.date,
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