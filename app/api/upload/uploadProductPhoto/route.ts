'use server'

import { modifyNameAndPhotoById } from "@/app/data/products";
import { mkdir, writeFile } from "fs/promises";

import { NextRequest, NextResponse } from "next/server";
import { join } from "path";



export async function POST(req: NextRequest) {

    const formData = await req.formData();

    let id = formData.get('id') as string;
    let category = formData.get('category') as string;
    let name = formData.get('name') as string;

    let files = [];

    for (let i = 0; i < 5; i++) {
        files.push(...formData.getAll(`file[${i}]`));
    }

    const addModify = await modifyNameAndPhotoById(category, id, files, name);

    if (!addModify) {

        return NextResponse.json({ error: 'Try again later!' });

    }

    const fileObjects = files.filter(element => element instanceof File);

    await Promise.all(fileObjects.map(async (element) => {
        if (element instanceof File) {
            const bytes = await element.arrayBuffer();
            const buffer = Buffer.from(bytes);
    
            const path = join(process.cwd(), 'public', 'products', category, id);
    
            await mkdir(path, { recursive: true });
    
            const imageFilePath = join(path, element.name);
    
            await writeFile(imageFilePath, buffer);
        }
    }));

    return NextResponse.json({ success: 'The changes were successful!' });


}