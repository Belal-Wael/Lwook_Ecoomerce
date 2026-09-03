"use client"
import useCartStore from '@/Store/cartStore'
import { ProductType } from '@/utils/types'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function ProductDetailsInteractios({ product, selectedSize, selectedColor }: { product: ProductType, selectedSize: string, selectedColor: string }) {

    const router = useRouter();
    const pathName = usePathname();
    const searchParam = useSearchParams();
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();
    const session = useSession();
    const route = useRouter()
    const handleChange = (type: string, value: string) => {
        const Param = new URLSearchParams(searchParam.toString());
        Param.set(type, value);
        router.push(`${(pathName)} ? ${Param.toString()}`, { scroll: false })
    }

    const handleQuanityChange = (type: "inc" | "dec") => {
        if (type === "inc") {
            setQuantity(pre => pre + 1)
        }
        else {
            if (quantity > 1) {
                setQuantity(pre => pre - 1)
            }
        }
    }

    const handelAddToCart = async () => {
        if (!session.data?.user) {
            route.push('/login')
            return
        }
        const res = await addToCart({
            ...product,
            quantity: 1,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
            userId: session.data?.user.id || ""
        });

        console.log("GGF:", res)

        toast.success('Product added to cart successfully!');
    }

    return (
        <div className='flex flex-col gap-4 mt-4'>
            <div className='flex flex-col gap-2 text-sm'>
                <span className='text-gray-500'>Size</span>
                <div className='flex items-center gap-2'>
                    {
                        product.productSizes.map((s) => <div key={s.id} className={`cursor-pointer border-1  ${selectedSize === s.size ? "border-gray-600" : "border-gray-300"} p-[2px]`}
                            onClick={() => handleChange("size", s.size)}
                        >
                            <div className={`w-6 h-6 flex justify-center items-center ${selectedSize === s.size ? "bg-black text-white" : "bg-white text-black"}`}>{s.size.toUpperCase()}</div>
                        </div>)
                    }
                </div>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
                <span className='text-gray-500'>Color</span>
                <div className='flex items-center gap-2'>
                    {
                        product.productColors.map((c) => <div key={c.id} className={`cursor-pointer border-1  ${selectedColor === c.name ? "border-gray-300" : "border-white"} p-[2px]`}
                            onClick={() => handleChange("color", c.name)}
                        >
                            <div className={`w-6 h-6`} style={{ backgroundColor: c.name }} />
                        </div>)
                    }
                </div>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
                <span className='text-gray-500'>Quantity</span>
                <div className='flex  items-center gap-2'>
                    <button className='cursor-pointer border-1 border-gray-300 p-1' onClick={() => handleQuanityChange("dec")}>
                        <Minus className='w-4 h-4' />
                    </button>
                    <span>{quantity}</span>
                    <button className='cursor-pointer border-1 border-gray-300 p-1' onClick={() => handleQuanityChange("inc")}>
                        <Plus className='w-4 h-4' />
                    </button>
                </div>
            </div>
            <button onClick={handelAddToCart} className='bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex  items-center justify-center gap-2 cursor-pointer text-sm font-medium'> <ShoppingCart className='w-4 h-4' /> Add To Cart</button>
            <button className='ring ring-gray-400 shadow-lg px-4 py-2 rounded-md text-gray-800 flex  items-center justify-center gap-2 cursor-pointer text-sm font-medium'> <ShoppingCart className='w-4 h-4' /> But this item</button>
        </div>
    )
}

export default ProductDetailsInteractios