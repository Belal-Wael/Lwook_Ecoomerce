"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { loginInputsType, loginSchema } from '@/utils/types'
import { loginAction } from '@/actions/Auth.actions'
import { PropagateLoader } from 'react-spinners'
import LoginAndRegisterProviders from './LoginAndRegisterProviders'


function LoginForm() {


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginInputsType>({
        resolver: zodResolver(loginSchema),
    })
    const [showTwoStep, setShowTwoStep] = useState(false);

    const handelLoginForm = async (formData: loginInputsType) => {

        await loginAction(formData).then((res) => {
            if (!res.success)
                toast.error(res.message);
            if (res.twoStep)
                setShowTwoStep(true);
        })

    }


    return (
        <form onSubmit={handleSubmit(handelLoginForm)} className='w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-2 h-max'>
            <h1 className='text-lg md:text-2xl font-bold text-yellow-500'>Login</h1>
            {
                showTwoStep ?
                    (<>
                        <div>
                            <label htmlFor="code" className="block mb-2.5 text-sm font-medium text-heading">Two Factor Code</label>
                            <input type="text" id="password" {...register("code")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="*******" required />
                            {errors.code && <p className='text-red-500 text-xs py-1'>{errors.code.message}</p>}
                        </div>
                    </>)
                    :
                    (<>
                        <div>
                            <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                            <input type="email" id="email"  {...register("email")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="joe@gmail.com" required />
                            {errors.email && <p className='text-red-500 text-xs py-1'>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Password</label>
                            <input type="password" id="password" {...register("password")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="*******" required />
                            {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                        </div>
                        <Link href={'/forget-password'} className='text-sm text-amber-500 hover:underline font-medium'>Forget Password?</Link>
                    </>)
            }
            <button className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 cursor-pointer rounded-lg ">
                {
                    isSubmitting ? <PropagateLoader color='white' className='py-2.5' /> : <>
                        {showTwoStep ? "Confirm Two Step" : "Login"}
                    </>
                }
            </button>
            <div className="border-b border-gray-300 my-4 relative">
                <span className="bg-white px-4 text-sm font-medium text-heading absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">OR</span>
            </div>
            <LoginAndRegisterProviders />
            <p className='text-center py-2 text-sm font-medium'>Don't have an account? <Link className='text-amber-500' href={'/register'}>Sign Up</Link> </p>
        </form>
    )
}

export default LoginForm