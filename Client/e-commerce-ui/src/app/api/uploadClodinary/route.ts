import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { handleCors, withCors } from "@/lib/cors";

// Handle OPTIONS preflight requests
export async function OPTIONS(request: NextRequest) {
    return handleCors(request);
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            const response = NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
            return withCors(response, req);
        }
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;
        const result = await cloudinary.uploader.upload(
            dataUri,
            {
                folder: "products",
            }
        );

        const response = NextResponse.json({ url: result.secure_url }, { status: 201 });
        return withCors(response, req);
    } catch (error) {
        console.log(error);
        const response = NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
        return withCors(response, req);
    }
}
