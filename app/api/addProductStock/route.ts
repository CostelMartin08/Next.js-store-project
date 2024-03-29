'use server'

import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path';
import { writeFile } from 'fs/promises'
import { currentRole } from '@/app/lib/auth';
import { addProduct } from '@/app/data/products';
import { addProductsStock } from '@/app/types';
import fs from 'fs';

export async function POST(req: NextRequest) {

    const userADMIN = await currentRole();

    if (!userADMIN) {
        return NextResponse.json({ error: "Unauthorized!" });
    }

    const formData = await req.formData();

    const productFormData: addProductsStock = {

        collection: formData.get('collection') as string,
        productName: formData.get('productName') as string,
        price: parseInt(formData.get('price') as string),
        stock: parseInt(formData.get('stock') as string),
        description: formData.get('description') as string,
        discountPrice: parseInt(formData.get('discountPrice') as string),
        files: Array.from(formData.getAll('file') as unknown as FileList)
    }

    if (!productFormData.collection || !productFormData.productName || !productFormData.price || !productFormData.stock || !productFormData.description) {
        throw new Error('Incomplete product information');
    }

    const products = await addProduct(productFormData);


    if (!products) {
        return NextResponse.json({ error: 'Process failed!' })
    }


    await saveImage(productFormData);


    return NextResponse.json({ succes: "Succes!" });
}

async function saveImage(productFormData: addProductsStock) {

    const productName = productFormData.productName;

    const path = join(process.cwd(), 'public', 'products', productFormData.collection, productName);


    if (!fs.existsSync(path)) {

        fs.mkdirSync(path, { recursive: true });

    } else {

        return NextResponse.json({ errorr: "This product exists in the database" });
    }


    for (const file of productFormData.files) {

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const imageFilePath = join(path, file.name);

        try {

            await writeFile(imageFilePath, buffer);

        } catch (error) {

            return error;
        }
    }


}