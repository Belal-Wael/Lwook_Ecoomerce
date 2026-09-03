import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { handleCors, withCors } from "@/lib/cors";


export async function OPTIONS(request: NextRequest) {
    return handleCors(request);
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            productSizes: true,
            productColors: true,
        },
    })

    if (!product) {
        const response = NextResponse.json({ error: "Product Not Found" }, { status: 404 });
        return withCors(response, req);
    }

    const response = NextResponse.json(product, { status: 200 });
    return withCors(response, req);
}