import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 items-start bg-gray-800 p-8 rounded-lg'>
      <div className='flex flex-col gap-2 items-center md:items-start'>
        <Link href={'/'} className='flex items-center'>
          <Image src="/logo.png" alt="TrendLama" width={36} height={36} />
          <h2 className='text-lg font-medium text-white tracking-wider  block'>Lwook</h2>
        </Link>
        <p className='text-gray-400 text-sm'>&copy; 2025 Lwook</p>
        <p className='text-gray-400 text-sm'>All rights reserved.</p>
      </div>
      <div className='flex flex-col gap-2 text-sm items-center text-gray-400 md:items-start'>
        <p className='text-amber-50'>Links</p>
        <Link href={'/'}>HomePage</Link>
        <Link href={'/'}>Contact</Link>
        <Link href={'/'}>Terms of Services</Link>
        <Link href={'/'}>Privacy Policy</Link>
      </div>
      <div className='flex flex-col gap-2 text-sm items-center text-gray-400 md:items-start'>
        <p className='text-amber-50'>Links</p>
        <Link href={'/'}>All Products</Link>
        <Link href={'/'}>New Arrivals</Link>
        <Link href={'/'}>Best Sellers</Link>
        <Link href={'/'}>Sale</Link>
      </div>
      <div className='flex flex-col gap-2 text-sm items-center text-gray-400 md:items-start'>
        <p className='text-amber-50'>Links</p>
        <Link href={'/'}>About</Link>
        <Link href={'/'}>Contact</Link>
        <Link href={'/'}>Blog</Link>
        <Link href={'/'}>Affiliate program</Link>
      </div>
    </div>
  )
}

export default Footer