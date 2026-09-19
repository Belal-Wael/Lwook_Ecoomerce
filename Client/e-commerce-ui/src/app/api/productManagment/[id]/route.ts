import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { handleCors, withCors } from "@/lib/cors";


export async function OPTIONS(request: NextRequest) {
    return handleCors(request);
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        console.log("params:", params, id);

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                productSizes: true,
                productColors: true,
            },
        });

        if (!product) {
            return withCors(
                NextResponse.json(
                    { error: "Product Not Found" },
                    { status: 404 }
                ),
                req
            );
        }

        return withCors(
            NextResponse.json(product, { status: 200 }),
            req
        );
    } catch (error) {
        console.log("GET PRODUCT ERROR:", params);
        console.error("GET PRODUCT ERROR:", error);

        return withCors(
            NextResponse.json(
                {
                    error: "Internal Server Error",
                    message: error instanceof Error
                        ? error.message
                        : String(error),
                },
                { status: 500 }
            ),
            req
        );
    }
}