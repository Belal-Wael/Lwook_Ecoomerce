"use client"
import { ProductType } from '@/utils/types'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import useCartStore from '@/Store/cartStore';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function ProductCard({ product }: { product: ProductType }) {

  const session = useSession();
  const route = useRouter()
  const [productTypes, setProductTypes] = useState({ // default values , and then user select 
    color: product.productColors[0]?.name || "",
    size: product.productSizes[0]?.size || ""
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({ type, value }: { type: "size" | "color", value: string }) => {
    setProductTypes(prev => ({
      ...prev,
      [type]: value
      /*
        use prev because if change size and don't touch color make sure color stay the same.
      */
    }))
  }

  const handleAddToCart = async () => {
    if (!session.data?.user) {
      route.push('/login')
      return
    }
    const res = await addToCart({
      ...product,
      quantity: 1,
      selectedColor: productTypes.color,
      selectedSize: productTypes.size,
      userId: session.data?.user.id || ""
    });

    console.log("GGF:", res)

    toast.success('Product added to cart successfully!');
  }

  const selectedColorImage =
    product.productColors.find(
      (c) => c.name === productTypes.color
    )?.imgURL || product.productColors[0]?.imgURL;


  return (
    <div className='shadow-lg rounded-lg overflow-hidden'>
      <Link href={`/products/${product.id}?color=${productTypes.color}&size=${productTypes.size}`}>
        <div className='relative aspect-[2/3]'>
          <Image src={selectedColorImage} alt={product.name} fill className='object-cover hover:scale-105 translate-all duration-300' />
        </div>
      </Link>
      {/* product Details */}
      <div className='flex flex-col gap-4 p-4'>
        <h1 className='font-medium'>{product.name}</h1>
        <p className='text-sm text-gray-500'>{product.shortDescription}</p>
        {/* product types */}
        <div className='flex items-center gap-4 text-x5'>
          {/* SIZES */}
          <div className='flex flex-col gap-1'>
            <span className='text-gray-500'>Size</span>
            <select name="size" id="" className='ring ring-gray-300 cursor-pointer rounded-md px-2 py-1 text-sm'
              value={productTypes.size}
              onChange={(e) => handleProductType({ type: 'size', value: e.target.value })}
            >
              {
                product.productSizes.map(psize => <option key={psize.id} value={psize.size}>{psize.size.toUpperCase()}</option>)
              }
            </select>
          </div>
          {/* COLORS */}
          <div className='flex flex-col gap-1'>
            <span className='text-gray-500'>Color</span>
            <div className='flex items-center gap-2'>
              {
                product.productColors.map(pColor =>
                  <div key={pColor.id} className={`border-1 rounded-full ${productTypes.color === pColor.name ? 'border-gray-400' : 'border-gray-200'} p-[1.2px] cursor-pointer`}
                    onClick={() => handleProductType({ type: "color", value: pColor.name })}
                  >
                    <div className={`w-[14px] h-[14px] rounded-full`} style={{ background: pColor.name }} />
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {/* price and add to cart */}
        <div className='flex items-center justify-between'>
          <p className='font-medium'>${product.price.toFixed(2)}</p>
          <button className='flex items-center gap-2 ring-1 ring-gray-100 px-2 py-1 text-sm cursor-pointer hover:text-white shadow-lg rounded-md hover:bg-black transition-all duration-300'
            onClick={handleAddToCart}
          >
            <ShoppingCart className='w-4 h-4' />
            Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard