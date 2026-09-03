"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerInputsType, registerSchema } from '@/utils/types'
import { registerAction } from '@/actions/Auth.actions'
import { PropagateLoader } from 'react-spinners'
import LoginAndRegisterProviders from './LoginAndRegisterProviders'

function RegisterForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<registerInputsType>({
        resolver: zodResolver(registerSchema),
    })

    const handelRegisterForm: SubmitHandler<registerInputsType> = async (formData: registerInputsType) => {
        console.log(formData);
        try {
            await registerAction(formData).then((res) => {
                if (res.success) {
                    toast.info(res.message)
                } else {
                    toast.error(res.message)
                }
            })
        }
        catch (error) {
            toast.error("Sign Up failed. Please try again.")
        }
    }




    return (
        <form onSubmit={handleSubmit(handelRegisterForm)} className='w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-2 h-max'>
            <h1 className='text-lg md:text-2xl font-bold text-yellow-500'>Register</h1>
            <div>
                <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Name</label>
                <input type="text" id="name"  {...register("name")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="joe@gmail.com" required />
                {errors.name && <p className='text-red-500 text-xs py-1'>{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                <input type="text" id="email"  {...register("email")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="joe@gmail.com" required />
                {errors.email && <p className='text-red-500 text-xs py-1'>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Password</label>
                <input type="password" id="password" {...register("password")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="*******" required />
                {errors.password && <p className='text-red-500 text-xs py-1'>{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="rePassword" className="block mb-2.5 text-sm font-medium text-heading">rePassword</label>
                <input type="password" id="rePassword" {...register("rePassword")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="*******" required />
                {errors.rePassword && <p className='text-red-500 text-xs py-1'>{errors.rePassword.message}</p>}
            </div>
            <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-2">
                {
                    isSubmitting ? <PropagateLoader color='white' className='py-2.5' /> : "Sign Up"
                }
            </button>
            <LoginAndRegisterProviders />

            <p className='text-center py-2 text-sm font-medium'>Already have an account? <Link className='text-amber-500' href={'/login'}>Sign In</Link> </p>
        </form>
    )
}

export default RegisterForm