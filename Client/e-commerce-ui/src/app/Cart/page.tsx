"use client"
import { shippingInputsType } from '@/utils/types'
import { ArrowRight, Trash2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, Suspense } from 'react'
import ShippingForm from '../components/ShippingForm'
import PaymentForm from '../components/PaymentForm'
import Image from 'next/image'
import useCartStore from '@/Store/cartStore'
import { useSession } from 'next-auth/react'

const steps = [
  {
    id: 1,
    title: 'Shipping Cart',
  },
  {
    id: 2,
    title: 'Shipping Address',
  },
  {
    id: 3,
    title: 'Payment',
  }
]

// 1. فصل الكود الرئيسي إلى Component فرعي
function CartContent() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const activeStep = parseInt(searchParam.get('step') || '1');
  const { cart, fetchCart, removeFromCart } = useCartStore();

  const session = useSession();
  const [shippingForm, setShippingForm] = useState<shippingInputsType | null>(null);

  const handleStep = (step: number) => {
    router.push(`/Cart?step=${step}`);
  }

  useEffect(() => {
    if (session.data?.user.id) {
      fetchCart(session.data.user.id)
    }
  }, [fetchCart, session?.data?.user.id])

  return (
    <div className='flex flex-col gap-8 items-center justify-center mt-12'>
      {/* Title */}
      <h1 className='font-medium text-2xl'>Your Shipping Cart</h1>
      <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-16'>
        {
          steps.map((step) => <div key={step.id} className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800" : "border-gray-400"} cursor-pointer`} onClick={() => handleStep(step.id)}>
            <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center p-4 ${step.id === activeStep ? "bg-gray-800" : "bg-gray-400"}`}>{step.id}</div>
            <p className={`text-sm font-medium  ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>{step.title}</p>
          </div>)
        }
      </div>
      {/*Steps & Details */}
      <div className='w-full flex flex-col lg:flex-row gap-16'>
        <div className='w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
          {
            activeStep == 1 ? (
              cart.map((item) => <div key={item.id + item.selectedColor + item.selectedSize} className='flex items-center justify-between'>
                {/* images And Details */}
                <div className='flex gap-8'>
                  <div className='relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden'>
                    {item.productColors.find(color => color.name === item.selectedColor)?.imgURL && (
                      <Image
                        src={item.productColors.find(color => color.name === item.selectedColor)!.imgURL}
                        alt={item.name}
                        fill
                        className='object-contain'
                      />
                    )}
                  </div>
                  <div className='flex flex-col justify-between'>
                    <div className='flex flex-col gap-1'>
                      <h3 className='font-medium text-sm'>{item.name}</h3>
                      <p className='text-gray-500 font-medium text-xs'>Quantity:{" "}{item.quantity}</p>
                      <p className='text-gray-500 font-medium text-xs'>Size:{" "}{item.selectedSize}</p>
                      <p className='text-gray-500 font-medium text-xs'>Color:{" "}{item.selectedColor}</p>
                    </div>
                    <p className='font-medium'>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* Delete Button */}
                <button className='w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all  text-red-400 flex items-center justify-center cursor-pointer'
                  onClick={async () => { await removeFromCart(item) }}
                > <Trash2 className='w-3 h-3' /> </button>
              </div>)
            ) : activeStep == 2 ? (
              <ShippingForm setShippingForm={setShippingForm} />
            ) : activeStep == 3 && shippingForm ? (
              <PaymentForm />
            ) : (<p className='text-sm text-gray-500'>please fill in the shipping form to continue.</p>)
          }
        </div>
        <div className='w-full lg:w-5/12 shadow-lg border border--100 p-8 rounded-lg flex flex-col gap-8 h-max'>
          <h2 className='font-semibold'>Cart Details</h2>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <p className='text-gray-500'>Subtotal</p>
              <p className='font-medium'>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-500'>Discount ($10)</p>
              <p className='font-medium'>$ 10</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-500'>Shipping fee</p>
              <p className='font-medium'>$10</p>
            </div>
            <hr className='border-gray-200' />
            <div className='flex justify-between'>
              <p className='text-gray-800 font-semibold'>Total</p>
              <p className='font-medium'>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
          </div>
          {activeStep == 1 && <button className='w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-2'
            onClick={() => router.push('/Cart?step=2', { scroll: false })}
          >
            Continue
            <ArrowRight className='w-3 h-3' />
          </button>}
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="text-center mt-12">Loading...</div>}>
      <CartContent />
    </Suspense>
  )
}