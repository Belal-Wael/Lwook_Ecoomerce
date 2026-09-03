import { paymentFormSchema, paymentInputsType, shippingFormSchema, shippingInputsType } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function PaymentForm() {

  const Router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<paymentInputsType>({
    resolver: zodResolver(paymentFormSchema),
  })

  const handelPaymentForm: SubmitHandler<paymentInputsType> = (formData) => {
    Router.push('/Cart?step=3', { scroll: false });
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(handelPaymentForm)}>
      <div className='flex flex-col gap-1'>
        <label htmlFor="cardHolder" className='text-xs font-medium text-gray-500'>Name Of Card</label>
        <input type="text" id='cardHolder' placeholder='Belal Wael' {...register('nameOfCard')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.nameOfCard && <p className='text-red-500 text-xs'>{errors.nameOfCard.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="cardNumber" className='text-xs font-medium text-gray-500'>Card Number</label>
        <input type="text" id='cardNumber' placeholder='123456123' {...register('cardNumber')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.cardNumber && <p className='text-red-500 text-xs'>{errors.cardNumber.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="expirationDate" className='text-xs font-medium text-gray-500'>Expiration Date</label>
        <input type="text" id='expirationDate' placeholder='01/25' {...register('expirationDate')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.expirationDate && <p className='text-red-500 text-xs'>{errors.expirationDate.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="cvv" className='text-xs font-medium text-gray-500'>CVV</label>
        <input type="text" id='cvv' placeholder='122 St' {...register('cvv')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.cvv && <p className='text-red-500 text-xs'>{errors.cvv.message}</p>}
      </div>
      <div className='flex  items-center gap-2 mt-4'>
        <Image src="/klarna.png" alt="Klarna" width={50} height={25} className='rounded-md' />
        <Image src="/cards.png" alt="cards" width={50} height={25} className='rounded-md' />
        <Image src="/stripe.png" alt="stripe" width={50} height={25} className='rounded-md' />
      </div>
      <button type='submit' className='w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-2'
        onClick={() => handleSubmit}
      >
        CheckOut
        <ShoppingCartIcon className='w-3 h-3' />
      </button>
    </form>
  )
}

export default PaymentForm