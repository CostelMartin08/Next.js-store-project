import { db } from "@/app/lib//db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const addUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    return await db.user.create({
      data: {
        name,
        email,
        password,
      }
    });
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }

};

export const updateUser = async (param: any): Promise<User> => {

  try {
    return await db.user.update({
      where: { id: param.id },

      data: {
        emailVerified: new Date()

      }
    });
  } catch (error) {
    console.error('eroare confirmare utilizator:', error);
    throw error;
  }

};

export const updateUserImage = async (id: string, image: string): Promise<User> => {

  try {
    return await db.user.update({
      where: { id: id },

      data: {
        image: image

      }
    });
  } catch (error) {
    console.error('Error', error);
    throw error;
  }

};