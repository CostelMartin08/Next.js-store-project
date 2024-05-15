'use server'

import { modifyNameAndPhotoById } from "@/app/data/products";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import fs from 'fs/promises';
import { PathLike } from "fs";


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

    const fileObjects = files.filter(element => element);

    await Promise.all(fileObjects.map(async (element) => {

        if (typeof element !== 'string') {

            const bytes = await element.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const path = join(process.cwd(), 'public', 'products', category, id,);
            const imageFilePath = join(path, element.name);

                await fs.mkdir(path, { recursive: true });

            await fs.writeFile(imageFilePath, buffer);
        }
    }));

    return NextResponse.json({ success: 'The changes were successful!' });


}

async function directoryExists(path: PathLike) {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        return false;
    }
}

async function emptyDirectory(path: any) {
    const files = await fs.readdir(path);
    for (const file of files) {
        const filePath = join(path, file);
        await fs.rm(filePath, { force: true, recursive: true });
    }
}

