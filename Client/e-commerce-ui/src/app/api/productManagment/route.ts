import prisma from "@/lib/prisma";
import { productSchema } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { handleCors, withCors } from "@/lib/cors";
import { Prisma } from "@/generated/prisma/client";


export async function OPTIONS(request: NextRequest) {
    return handleCors(request);
}


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 8);
    const category = searchParams.get("category")?.toUpperCase();
    const where: Prisma.ProductWhereInput = {};
    if (category) {
        where.category = {
            name: category
        }
    }

    const products = await prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
            category: true,
            productColors: true,
            productSizes: true
        }
    });
    const response = NextResponse.json(products, { status: 200 });
    return withCors(response, request);
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = productSchema.safeParse(body)
        if (!validation.success) {
            const response = NextResponse.json(validation.error.message, { status: 400 });
            return withCors(response, request);
        }
        const isExisting = await prisma.product.findUnique({
            where: { name: body.name }
        })
        if (isExisting) {
            const response = NextResponse.json({ message: "Product Already exist, Update the quantity" }, { status: 409 });
            return withCors(response, request);
        }
        const category = await prisma.category.findUnique({
            where: { id: body.categoryId }
        })

        if (!category) {
            const response = NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            )
            return withCors(response, request);
        }

        const product = await prisma.product.create({
            data: {
                name: body.name,
                shortDescription: body.shortDescription,
                description: body.description,
                price: body.price,
                productSizes: {
                    create: body.sizes.map((size: string) => ({ size }))
                },
                productColors: {
                    create: body.colors.map(({ name, imgURL }: { name: string; imgURL: string }) => ({ name, imgURL }))
                },
                category: {
                    connect: {
                        id: body.categoryId
                    }
                }
            },
            include: {
                productColors: true,
                productSizes: true,
            },
        })
        const response = NextResponse.json(product, { status: 201 });
        return withCors(response, request);
    } catch (error) {
        console.error("Error creating product:", error);
        const response = NextResponse.json({ message: error }, { status: 500 });
        return withCors(response, request);
    }

}