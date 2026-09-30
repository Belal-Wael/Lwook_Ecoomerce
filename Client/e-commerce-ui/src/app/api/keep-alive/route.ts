import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({ message: 'Database is awake!' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to wake database' },
            { status: 500 }
        );
    }
}