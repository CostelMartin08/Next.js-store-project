import { PrismaClient, Products } from '@prisma/client'

const prisma = new PrismaClient()

export class DatabaseService {

    async getAllProducts() {
        try {
            return await prisma.products.findMany();


        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async getProductByName(nameProduct: string) {
        try {
            return await prisma.products.findFirst({
                where: { nameProduct },
            });
        } catch (error) {
            console.error('Error fetching product by name:', error);
            throw error;
        }
    }

    async addProduct(nameProduct: string, photoProduct: string, productStock: number, priceProduct: number, productDiscount: boolean, discountPrice: number): Promise<Products> {
        try {
            return await prisma.products.create({
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


    async disconnect() {
        await prisma.$disconnect();
    }
}
