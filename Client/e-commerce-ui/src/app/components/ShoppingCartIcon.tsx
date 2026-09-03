"use client"
import useCartStore from '@/Store/cartStore'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'

function ShoppingCartIcon() {

  const { cart, fetchCart } = useCartStore();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user?.id) {
      fetchCart(session.data.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data?.user?.id]);

  const cartCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <Link href={'/Cart'} className='relative'>
      <ShoppingCart className='w-4 h-4 text-gray-600' />
      {cartCount > 0 && (
        <span className='absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium'>
          {cartCount}
        </span>
      )}
    </Link>
  )
}

export default ShoppingCartIcon