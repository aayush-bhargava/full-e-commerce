import { NextResponse } from 'next/server';
import { addCollection } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const file = formData.get('image') as File;
        const description = formData.get('description') as string || "";

        if (!file || file.size === 0) {
            return new NextResponse("Image is required", { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `col-${Date.now()}-${file.name.replace(/\s/g, "_")}`;

        // Save to admin public/uploads
        const adminUploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(adminUploadDir, { recursive: true });
        await writeFile(path.join(adminUploadDir, fileName), buffer);

        // Sync to web public/uploads
        const webUploadDir = path.join(process.cwd(), '..', 'web', 'public', 'uploads');
        await mkdir(webUploadDir, { recursive: true });
        await writeFile(path.join(webUploadDir, fileName), buffer);

        const imageUrl = `/uploads/${fileName}`;

        await addCollection({
            name,
            description,
            image: imageUrl
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Collection creation error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
