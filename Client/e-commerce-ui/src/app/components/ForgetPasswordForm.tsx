"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { forgetPasswordInputsType, forgetPasswordSchema, loginInputsType, loginSchema } from '@/utils/types'
import { PropagateLoader } from 'react-spinners'
import LoginAndRegisterProviders from './LoginAndRegisterProviders'
import { CiMail } from "react-icons/ci"
import { ForgetPasswordAction } from '@/actions/password.actions'


function ForgetPasswordForm() {


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<forgetPasswordInputsType>({
        resolver: zodResolver(forgetPasswordSchema),
    })

    const handelForgetPasswordForm = async (formData: forgetPasswordInputsType) => {
        try {
            await ForgetPasswordAction(formData).then((res) => {
                if (res.success) {
                    toast.success(res.message || "Password reset email sent successfully.")
                } else {
                    toast.error(res.message || "Something went wrong. Please try again later.")
                }
                console.log(res);
            })
        } catch (err) {
            toast.error("Something went wrong. Please try again later.")
        }

    }


    return (
        <form onSubmit={handleSubmit(handelForgetPasswordForm)} className='w-full md:w-1/2 mx-auto space-y-4 bg-white p-6 rounded-xl shadow-md shadow-amber-200/50'>
            <h1 className='text-lg md:text-2xl font-bold text-yellow-500'>Forget Password</h1>
            <div>
                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                <input type="email" id="email"  {...register("email")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="joe@gmail.com" required />
                {errors.email && <p className='text-red-500 text-xs py-1'>{errors.email.message}</p>}
            </div>
            <button type="submit" className="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-400 font-medium rounded-md text-sm px-5 py-2.5 text-center cursor-pointer flex justify-center items-center">
                {
                    isSubmitting ? <PropagateLoader color='white' className='py-2.5' /> : <><CiMail className="me-1 text-2xl" />Submit</>
                }
            </button>
            <p className='text-center py-2 text-sm font-medium'>Back to Login <Link className='text-amber-500' href={'/login'}>Login</Link> </p>
        </form>
    )
}

export default ForgetPasswordForm