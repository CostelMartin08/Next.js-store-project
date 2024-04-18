'use server'

import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path';
import { writeFile } from 'fs/promises'
import { currentRole } from '@/app/lib/auth';
import { addProduct, getProductById } from '@/app/data/products';
import { addProductsStock, allValues } from '@/app/types';
import fs from 'fs';

export async function POST(req: NextRequest) {

    const userADMIN = await currentRole();

    if (!userADMIN) {
        return NextResponse.json({ error: "Access allowed only to the administrator!" });
    }

    const formData = await req.formData();

    const productFormData: allValues = {

        collection: formData.get('collection') as string,
        productName: formData.get('productName') as string,
        price: parseInt(formData.get('price') as string),
        stock: parseInt(formData.get('stock') as string),
        description: formData.get('description') as string,
        discount: 0,
        discountPrice: parseInt(formData.get('discountPrice') as string),
        files: Array.from(formData.getAll('file') as unknown as FileList),
        unitsSold: 0,
        status: true,
        date: new Date(),

    }

    if (!productFormData.collection || !productFormData.productName || !productFormData.price || !productFormData.stock || !productFormData.description) {

        return NextResponse.json({ error: 'All fields must be filled in!' })

    }

    const products = await addProduct(productFormData);

    if (!products) {
        return NextResponse.json({ error: 'Adding products to the database failed!' });
    }

    const addedProduct = await getProductById(productFormData.collection, products.id)

    await saveImage(productFormData, addedProduct?.id as string);

    return NextResponse.json({ success: "The product has been added to the database!!" });
}

async function saveImage(productFormData: addProductsStock, idProduct: string) {


    const path = join(process.cwd(), 'public', 'products', productFormData.collection, idProduct);


    if (!fs.existsSync(path)) {

        fs.mkdirSync(path, { recursive: true });

    } else {

        return NextResponse.json({ error: "Process failed!" });
    }


    for (const file of productFormData.files) {

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const imageFilePath = join(path, file.name);

        try {

            await  writeFile(imageFilePath, buffer);

            console.log(`File ${file.name} has been saved successfully.`);
        } catch (error) {
            console.error(`Error saving file ${file.name}: ${error}`);
    }

}}