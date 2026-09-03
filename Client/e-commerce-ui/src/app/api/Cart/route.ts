import { withCors } from "@/lib/cors";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { userId, id, quantity, selectedSize, selectedColor, price } = body;

    try {
        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: true }
        })
  if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: { items: true }
            })
        }
        console.log(cart)
        const existingItem = cart.items.find((item) =>
            item.productId === id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
        )

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + (quantity || 1) }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    quantity: quantity || 1,
                    selectedColor: selectedColor,
                    selectedSize: selectedSize,
                    priceAdd: price,
                    productId: id,
                    cartId: cart.id
                }
            })
        }

        const updatedCart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: { include: { productColors: true } } } } }
        })

        const response = NextResponse.json(updatedCart?.items || [], { status: 201 })
        return withCors(response, req)
    } catch (error) {
        const response = NextResponse.json({ error: "Failed" }, { status: 500 })
        return withCors(response, req)
    }
}