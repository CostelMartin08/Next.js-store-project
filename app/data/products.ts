import { db } from "@/app/lib//db";
import { Product, allValues } from "../types";


export const getAllProductsInAllCategoriesFn = async () => {

    try {
        const laptops = await db.laptops.findMany();
        const tablets = await db.tablets.findMany();
        const smartphones = await db.smartphones.findMany();
        const smartwatches = await db.smartwatches.findMany();

        const allProducts = [
            ...laptops.map(product => ({ ...product, category: 'laptops' })),
            ...tablets.map(product => ({ ...product, category: 'tablets' })),
            ...smartphones.map(product => ({ ...product, category: 'smartphones' })),
            ...smartwatches.map(product => ({ ...product, category: 'smartwatches' })),
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
            case 'smartwatches':
                products = await db.smartwatches.findMany();
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
            case 'smartwatches':
                product = db.smartwatches.findFirst({
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
            case 'smartwatches':
                product = db.smartwatches.findFirst({
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

/* -------------------------------------------------------------------------- */
/*                                   //ADMIN                                  */
/* -------------------------------------------------------------------------- */

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
            case 'smartwatches':
                product = await db.smartwatches.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.smartwatches.update({
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
            case 'smartwatches':
                product = await db.smartwatches.findFirst({
                    where: { id },
                });
                if (product) {

                    await db.smartwatches.update({
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
            case 'smartwatches':
                product = await db.smartwatches.findFirst({
                    where: { id },
                });
                if (product) {
                    await db.smartwatches.update({
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
            case 'smartwatches':
                product = await db.smartwatches.findFirst({
                    where: { id },
                });
                if (product) {
                    let currentStock = stock;
                    let newStock = currentStock - count;
                    let sold = unitsSold + count;
                    await db.smartwatches.update({
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

export const modifyNameAndPhotoById = async (
    category: string,
    id: string,
    photo: (File | string)[],
    name: string,

) => {

    try {

        let photos: string[] = [];

        for (const element of photo) {
            if (typeof element === 'string') {
                photos.push(element);
            } else {
                photos.push(element.name);
            }
        }

        switch (category) {
            case 'laptops':

                await db.laptops.update({
                    where: {
                        id: id,
                    },
                    data: {
                        photo: {
                            set: photos,
                        },
                        name: name,
                    },
                });

                break;
            case 'tablets':

                await db.tablets.update({
                    where: {
                        id: id,
                    },
                    data: {
                        photo: {
                            set: photos,
                        },
                        name: name,
                    },
                });

                break;
            case 'smartphones':

                await db.smartphones.update({
                    where: {
                        id: id,
                    },
                    data: {

                        photo: {
                            set: photos,
                        },
                        name: name,
                    }
                });

                break;
            case 'smartwatches':

                await db.smartwatches.update({
                    where: {
                        id: id,
                    },
                    data: {
                        photo: {
                            set: photos,
                        },
                        name: name,
                    },
                });

                break;
            default:
                throw new Error(`The category ${category} doesn't exist.`);
        }

        return true;

    } catch (error) {

        console.error("Error during interrogation", error);

        return null;
    }
};


export const addProduct = async (props: allValues) => {


    try {

        let add;

        const MAX_PHOTOS = 5;
        let photoArray: string[] = [];

        if (props?.files) {
            photoArray = props.files.map((element: File) => element.name);
        }
        while (photoArray.length < MAX_PHOTOS) {
            photoArray.push("");
        }

        const photo: string[] = photoArray.slice(0, MAX_PHOTOS);

        switch (props.collection) {
            case 'laptops':
                add = db.laptops.create({
                    data: {
                        name: props.productName,
                        stock: props.stock as number,
                        price: props.price as number,
                        discountPrice: props.discountPrice as number,
                        description: props.description as string,
                        photo: photo,
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
                        photo: photo,
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
                        photo: photo,
                        discount: props?.discount,
                        unitsSold: props?.unitsSold,
                        status: props?.status,
                        date: props?.date,
                    }
                })
                break;
            case 'smartwatches':
                add = db.smartwatches.create({
                    data: {
                        name: props.productName,
                        stock: props.stock as number,
                        price: props.price as number,
                        discountPrice: props.discountPrice as number,
                        description: props.description as string,
                        photo: photo,
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