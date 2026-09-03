
import { handleCors } from '@/lib/cors';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { withCors } from '@/lib/cors';


export async function OPTIONS(request: NextRequest) {
    return handleCors(request);
}


export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    try {
        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: { include: { productColors: true } } } } }
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: { items: { include: { product: { include: { productColors: true } } } } }
            })
        }
        const response = NextResponse.json(cart.items, { status: 200 })
        return withCors(response, req)

    } catch (error) {
        const response = NextResponse.json({ error: "Failed" }, { status: 500 })
        return withCors(response, req)
    }
}

export async function DELETE(req:NextRequest,{ params }:{params:Promise<{userId:string}>}) {
try{
    const {userId} =await params;
    const {productId,selectedColor,selectedSize} = await req.json();
    if (!productId || !selectedColor || !selectedSize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

        const cart=await prisma.cart.findUnique({
            where:{
                userId
            }
        })
        if(!cart){
return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
        }
        await prisma.cartItem.delete({
            where:{
                productId_selectedColor_selectedSize_cartId:{
                    productId,
                    selectedColor,
                    selectedSize,
                    cartId:cart?.id || ""
                }    
            }
        })

         const response = NextResponse.json({ success: true })
        return withCors(response, req)

    }catch(error){
        const response=NextResponse.json({ error: "Failed to remove item from cart" },{ status: 500 });
         return withCors(response, req)
    }

    
}