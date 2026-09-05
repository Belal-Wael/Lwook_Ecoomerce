import ProductDetailsInteractios from '@/app/components/ProductDetailsInteractios';
import { ProductType } from '@/utils/types';
import Image from 'next/image';
import React from 'react'


export const generateMetaData = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`https://lwook-ecoomerce.vercel.app/api/productManagment/${params.id}`);
    const product: ProductType = await res.json();
    return {
        title: product.name,
        description: product.description
    }
}


async function page({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ color: string, size: string }> }) {

    const { id } = await params;
    async function getProductbyID(): Promise<ProductType | null> {
        try {
            const response = await fetch(`http://localhost:3000/api/productManagment/${id}`);
            return await response.json();
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    const product = await getProductbyID();
    if (!product) {
        return (
            <div className="w-full text-center">
                <p className="text-gray-500  py-20">No products available</p>
            </div>
        );
    }

    const { color, size } = await searchParams;
    const selectedSize = (size || product.productSizes[0].size as string);
    const selectedColor = (color || product.productColors[0].name as string);
    const selectedImage =
        product.productColors.find(c => c.name === selectedColor)?.imgURL
        ?? product.productColors[0].imgURL;

    console.log(selectedColor)




    return (
        <div className='flex flex-col gap-3.5 lg:flex-row md:gap-12 mt-12 px-4'>
            {/* Product Images */}
            <div className='w-full lg:w-5/12 relative aspect-[2/3]'>
                <Image src={selectedImage} alt={product.name} fill className='object-cover rounded-md' />
            </div>
            {/* Product Details */}
            <div className='flex flex-col w-full lg:w-7/12 gap-4'>
                <h1 className='font-medium text-2xl'>{product.name}</h1>
                <p className='text-sm text-gray-500'>{product.description}</p>
                <h2 className='text-2xl font-semibold'>${product.price.toFixed(2)}</h2>
                {/* interactions */}
                <ProductDetailsInteractios product={product} selectedSize={selectedSize} selectedColor={selectedColor} />
                <div className='flex items-center gap-2 mt-4'>
                    <Image src="/klarna.png" alt="Klarna" width={50} height={25} className='rounded-md' />
                    <Image src="/cards.png" alt="cards" width={50} height={25} className='rounded-md' />
                    <Image src="/stripe.png" alt="stripe" width={50} height={25} className='rounded-md' />
                </div>
                <p className="text-gray-500 text-xs">
                    By clicking Pay Now, you agree to our{" "}
                    <span className="underline hover:text-black">Terms & Conditions</span>{" "}
                    and <span className="underline hover:text-black">Privacy Policy</span>
                    . You authorize us to charge your selected payment method for the
                    total amount shown. All sales are subject to our return and{" "}
                    <span className="underline hover:text-black">Refund Policies</span>.
                </p>
            </div>
        </div>
    )
}

export default page