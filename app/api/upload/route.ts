'use server'

import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path';
import { currentUser } from '@/app/lib/auth';
import { updateUserImage } from '@/app/data/user';
import fs from 'fs/promises';
import { PathLike } from 'node:fs';


export async function POST(req: NextRequest) {

    const user = await currentUser();
    const data = await req.formData();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized!" });
    }

    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({ error: 'You must upload a photo to continue!' })
    }

    const userImage = await updateUserImage(user?.id as string, file.name);

    if (!userImage) {
        return { error: 'Process failed!' }
    }

    saveFile(file, user.id as string);

    return NextResponse.json({ success: 'Profile photo successfully changed!' });
}


async function saveFile(file: { arrayBuffer: () => any; name: string; }, user: string) {

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join(process.cwd(), 'public', 'photo', 'profilePhoto', user,);
        const imageFilePath = join(path, file.name);

        if (await directoryExists(path)) {

            await emptyDirectory(path);

        } else {

            await fs.mkdir(path, { recursive: true });
        }

        await fs.writeFile(imageFilePath, buffer);

    } catch (error) {

        console.error('Error:', error);
    }
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
