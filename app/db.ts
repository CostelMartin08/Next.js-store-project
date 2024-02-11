import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export class DatabaseService {

    async getAllProducts(): Promise<Todo[]> {
        try {
            return await prisma.todo.findMany();
        } catch (error) {
            console.error('Eroare la obținerea produselor:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getProductById(id: string): Promise<Todo | null> {
        try {
            return await prisma.todo.findUnique({
                where: { id }
            });
        } catch (error) {
            console.error('Eroare la obținerea produsului:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    
}
