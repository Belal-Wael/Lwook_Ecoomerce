"use client"
import React, { useEffect } from 'react'
import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves",
  },
];

function Categories() {

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const router = useRouter()
  const pathName = usePathname();

  useEffect(() => {
    if (selectedCategory) return;
    const params = new URLSearchParams(searchParams);
    params.set("category", "all");
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, [pathName, router, searchParams, selectedCategory]);

  const handleCategoryClick = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all"); // to only update category param not another params
    router.push(`${pathName}?${params.toString()}`, { scroll: false }) // to prevent scroll to top
    //router.push(`${pathName}?category=${value}`)
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 bg-gray-100 gap-2 p-2 rounded-lg mb-4 text-sm '>
      {
        categories.map(category => <div key={category.name} className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${category.slug === selectedCategory ? 'bg-white' : "text-gray-500"}`}
          onClick={() => handleCategoryClick(category.slug)}
        >
          {category.icon}{category.name}
        </div>)
      }
    </div>
  )
}

export default Categories