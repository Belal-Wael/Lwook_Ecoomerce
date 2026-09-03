"use client"
import { ProductsType } from '@/utils/types';
import React, { useEffect, useState } from 'react'
import Categories from './Categories';
import ProductCard from './ProductCard';
import Link from 'next/link';
import FilterProducts from './FilterProducts';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';



// Temporary data
// const products: ProductsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//   },
//   {
//     id: 4,
//     name: "Nike Dri Flex T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 29.9,
//     sizes: ["s", "m", "l"],
//     colors: ["white", "pink"],
//     images: { white: "/products/4w.png", pink: "/products/4p.png" },
//   },
//   {
//     id: 5,
//     name: "Under Armour StormFleece",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 49.9,
//     sizes: ["s", "m", "l"],
//     colors: ["red", "orange", "black"],
//     images: {
//       red: "/products/5r.png",
//       orange: "/products/5o.png",
//       black: "/products/5bl.png",
//     },
//   },
//   {
//     id: 6,
//     name: "Nike Air Max 270",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["40", "42", "43", "44"],
//     colors: ["gray", "white"],
//     images: { gray: "/products/6g.png", white: "/products/6w.png" },
//   },
//   {
//     id: 7,
//     name: "Nike Ultraboost Pulse ",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["40", "42", "43"],
//     colors: ["gray", "pink"],
//     images: { gray: "/products/7g.png", pink: "/products/7p.png" },
//   },
//   {
//     id: 8,
//     name: "Levi’s Classic Denim",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l"],
//     colors: ["blue", "green"],
//     images: { blue: "/products/8b.png", green: "/products/8gr.png" },
//   },
// ];




function ProductList({ category, params }: { category: string, params: "HomePage" | "ProductPage" }) {

  const [products, setProducts] = useState<ProductsType>([]);
  const [page, setPage] = useState(1);
  const limit = params === "HomePage" ? 8 : 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const effectiveCategory = category && category !== "all" ? category : "";

  async function getProducts(currentPage = 1) {
    try {
      setLoading(true)
      const categoryQuery = effectiveCategory ? `&category=${encodeURIComponent(effectiveCategory)}` : "";
      const response = await fetch(`http://localhost:3000/api/productManagment?page=${currentPage}&limit=${limit}${categoryQuery}`);
      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getProducts(page)
  }, [page, category])

  if (loading) {
    return (
      <div className="w-full">
        <Categories />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="w-full text-center">
        <Categories />
        <p className="text-gray-500  py-20">No products available</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => getProducts(page)}
          className="mt-4 underline text-sm text-gray-500"
        >
          Try again
        </button>
      </div>
    );
  }


  return (
    <div className='w-full'>
      <Categories />
      {
        params === "ProductPage" && <FilterProducts />
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12'>

        {
          products.map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>
      {params === "HomePage" && <Link href={category ? `/products/?category=${category}&page=1` : '/products?&page=1'} className='flex justify-end mt-4 text-sm underline text-gray-500'>View More Products</Link>}
      {params === "ProductPage" &&
        <div className='flex items-center justify-center gap-3 my-2'>
          <button disabled={loading || page === 1} className=' font-medium cursor-pointer mt-4 text-sm underline hover:scale-105 transition-all text-gray-500' onClick={() => setPage(prev => Math.max(1, prev - 1))}>
            {loading ? "Loading..." : <CircleArrowLeft />}
          </button>
          <span className="text-sm text-gray-600">
            Page {page}
          </span>
          <button disabled={loading} className=' font-medium cursor-pointer mt-4 text-sm underline hover:scale-105 transition-all text-gray-500' onClick={() => setPage(prev => prev + 1)}>
            {loading ? "Loading..." : <CircleArrowRight />}
          </button>
        </div>
      }
    </div>
  )
}

export default ProductList