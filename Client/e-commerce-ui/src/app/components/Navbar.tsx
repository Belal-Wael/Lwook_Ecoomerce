import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'
import { Bell, Home } from 'lucide-react'
import ShoppingCartIcon from './ShoppingCartIcon'
import { CircleUserRound } from 'lucide-react';
import { auth } from '@/lib/auth'

async function Navbar() {

  const session = await auth();

  return (
    <nav className='w-full flex items-center justify-between border-b border-gray-200 pb-4'>
      {/* Left */}
      <Link href={'/'} className='flex items-center'>
        <Image src="/logo.png" alt="TrendLama" width={36} height={36} className='w-6 h-6 md:w-9 md:h-9' />
        <h2 className='text-lg font-bold tracking-wider  block'>Lwook</h2>
      </Link>
      {/* Right */}
      <div className="flex items-center gap-4">
        <SearchBar />
        <Link href={'/'} >
          <Home className='w-4 h-4 text-gray-600' />
        </Link>
        <Bell className='w-4 h-4 text-gray-600' />
        <ShoppingCartIcon />
        <Link href={'/login'}>{session ? session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            fill
            className='object-cover w-5 h-5 rounded-full'
          />
        ) : (
          <CircleUserRound className='w-5 h-5 text-gray-600' />
        ) : "Sign in"}</Link>
      </div>
    </nav>
  )
}

export default Navbar