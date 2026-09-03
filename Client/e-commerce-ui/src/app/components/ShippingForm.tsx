import { shippingFormSchema, shippingInputsType } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

function ShippingForm({ setShippingForm }: { setShippingForm: (data: shippingInputsType | null) => void }) {

  const Router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<shippingInputsType>({
    resolver: zodResolver(shippingFormSchema),
  })

  const handelShippingForm: SubmitHandler<shippingInputsType> = (formData) => {
    setShippingForm(formData);
    Router.push('/Cart?step=3', { scroll: false });
  }


  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(handelShippingForm)}>
      <div className='flex flex-col gap-1'>
        <label htmlFor="name" className='text-xs font-medium text-gray-500'>Name</label>
        <input type="text" id='name' placeholder='Belal Wael' {...register('name')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="email" className='text-xs font-medium text-gray-500'>Email</label>
        <input type="email" id='email' placeholder='Bela122@.com' {...register('email')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="phone" className='text-xs font-medium text-gray-500'>Phone Number</label>
        <input type="number" id='phone' placeholder='0106599945' {...register('phone')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.phone && <p className='text-red-500 text-xs'>{errors.phone.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="address" className='text-xs font-medium text-gray-500'>Address</label>
        <input type="text" id='address' placeholder='122 St' {...register('address')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.address && <p className='text-red-500 text-xs'>{errors.address.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="city" className='text-xs font-medium text-gray-500'>City</label>
        <input type="text" id='city' placeholder='Cairo' {...register('city')}
          className='border-b border-gray-200 py-2 outline-none text-sm'
        />
        {errors.city && <p className='text-red-500 text-xs'>{errors.city.message}</p>}
      </div>
      <button type='submit' className='w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-2'
        onClick={() => handleSubmit}
      >
        Continue
        <ArrowRight className='w-3 h-3' />
      </button>
    </form>
  )
}

export default ShippingForm