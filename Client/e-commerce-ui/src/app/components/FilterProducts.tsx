"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

function FilterProducts() {
    const searchParams= useSearchParams();
    const router=useRouter();
    const pathName=usePathname();
    
    const handleFilter=(value:string)=>{
        const params=new URLSearchParams(searchParams);
        params.set('sort',value);
        router.push(`${pathName}?${params.toString()}`,{scroll:false}) // to only update category param not another params
    }
  return (
    <div className='flex justify-end items-center gap-2 text-sm text-gray-500 my-6'>
        <span>Sort by:</span>
        <select name='sort' id='sort' className='ring-1 ring-gray-500 shadow-md p-1 rounded-sm' onChange={(e)=>handleFilter(e.target.value)}>
         <option value="newest">Newest</option>
         <option value="oldest">Oldest</option>
         <option value="asc">Price: Low to High</option>
         <option value="desc">Price: Hight to low</option>
        </select>
    </div>
  )
}

export default FilterProducts