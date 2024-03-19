import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path';
import { currentUser } from '@/app/lib/auth';
import { updateUserImage } from '@/app/data/user';

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

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)


    const path = join(process.cwd(), 'public/photo', file.name);

    await writeFile(path, buffer)

    return NextResponse.json({ success: 'Profile photo successfully changed!' });
}