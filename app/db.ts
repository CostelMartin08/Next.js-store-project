import { PrismaClient, Products, User } from '@prisma/client'


const prisma = new PrismaClient();

export class DatabaseService {

    async getAllProducts() {

        try {
            return await prisma.products.findMany();


        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
        finally {
            await prisma?.$disconnect();
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
        }finally {
            await prisma?.$disconnect();
        }
    }

    async getUserById(email: string) {
        try {
            return await prisma.user.findUnique({
                where: { email },
            });
        } catch (error) {
            console.error('Error fetching users by id:', error);
            throw error;
        }finally {
            await prisma?.$disconnect();
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
        }finally {
            await prisma?.$disconnect();
        }
    }

    async addUser(name:string, email: string, password: string): Promise<User> {
        try {
            return await prisma.user.create({
                data: {
                    name,
                    email,
                    password,

                }
            });
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }finally {
            await prisma?.$disconnect();
        }

    }


    async disconnect() {
        await prisma.$disconnect();
    }
}


