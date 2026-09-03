import { handleCors, withCors } from "@/lib/cors";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function OPTIONS(request: NextRequest) {
    return handleCors(request);
}


export async function GET(request: NextRequest) {
    try {
        const categories = await prisma.category.findMany();
        const response = NextResponse.json(
            categories,
            { status: 200 }
        );
        return withCors(response, request);
    } catch (error) {
        console.error("Error creating product:", error);
        const response = NextResponse.json({ message: error }, { status: 500 });
        return withCors(response, request);
    }

}

export async function POST(req: NextRequest) {
    const { name } = await req.json()
    try {
        const isExist = await prisma.category.findUnique({
            where: {
                name
            }
        })
        if (isExist) {
            const response = NextResponse.json({ message: "Category Already exist" }, { status: 409 });
            return withCors(response, req);
        }
        await prisma.category.create({
            data: {
                name
            }
        })
        const response = NextResponse.json(
            { message: "Category created successfully" },
            { status: 201 }
        );
        return withCors(response, req);
    } catch (error) {
        console.error("Error creating product:", error);
        const response = NextResponse.json({ message: error }, { status: 500 });
        return withCors(response, req);
    }
}